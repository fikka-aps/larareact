import React, { useEffect, useState } from 'react';
import AnswerTable from '../components/AnswerTable';
import axiosClient from '../axios';
import { useParams } from 'react-router-dom';

function ProgramAnswer() {

    const { id } = useParams();
    const [loading, setLoading] =useState(false);
    const [answers, setAnswers] =useState([]);
    useEffect(() => {
        if (id) {
          setLoading(true);
          axiosClient.get(`/program/answer/${id}`).then(({ data }) => {
            setAnswers(data.data);
            setLoading(false);
          });
        }
    }, []);
    console.log(answers)
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
                        Answer
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Detail
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">
                        Silver
                    </td>
                    <td className="px-6 py-4">
                        Laptop
                    </td>
                    <td className="px-6 py-4">
                        $2999
                    </td>
                </tr>
                {answers.map(answer => (
                    
                    <tr key={answer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {answer.user_id}
                        </th>
                        <td className="px-6 py-4">
                            {answer.program.title}
                        </td>
                        <td className="px-6 py-4">
                            Laptop PC
                        </td>
                        <td className="px-6 py-4">
                            $1999
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

  );
}

export default ProgramAnswer;
