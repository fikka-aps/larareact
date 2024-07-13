import React, { useEffect, useState } from 'react';
import AnswerTable from '../components/AnswerTable';
import axiosClient from '../axios';
import { useParams } from 'react-router-dom';
import TButton from '../components/core/TButton';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useStateContext } from '../context/ContextProvider';
import Modal from '../components/ModalDialog';
import AnswerModal from '../components/AnswerModal';

function ProgramAnswer() {

    const { id } = useParams();
    const [loading, setLoading] =useState(false);
    const [answers, setAnswers] =useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [data, setData] = useState(null);

    const handleItemClick = async (answer) => {
        
        setData(answer);
        setModalOpen(true);
        // console.log(answer)
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        setData(null);
      };
    useEffect(() => {
        if (id) {
          setLoading(true);
          axiosClient.get(`/program/answer/${id}`).then(({ data }) => {
            setAnswers(data.data);
            // console.log(data.data)
            setLoading(false);
          });
        }
    }, []);
    // console.log(answers)

  return (
    <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        User
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Created at
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {answers.map(answer => (
                    
                    <tr key={answer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {answer.user.name}
                        </th>
                        <td className="px-6 py-4">
                            {answer.created_at}
                        </td>
                        <td className="px-6 py-4">
                            {answer.status}
                        </td>
                        <td className="px-6 py-4">
                            <div className='flex gap-2'>
                                {answer.program.id && (
                                    <TButton onClick={() => handleItemClick(answer.question_answers)} >
                                        <MagnifyingGlassIcon className='w-5 h-5 mr-2' />
                                        Detail
                                    </TButton>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <AnswerModal isOpen={modalOpen} onClose={handleCloseModal} data={data} />
    </div>

  );
}

export default ProgramAnswer;
