import React, { useEffect, useState } from 'react';
import PageComponent from '../components/PageComponent';
import { LinkIcon, PaperAirplaneIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/outline';
import axiosClient from '../axios';
import TButton from '../components/core/TButton';
import { useNavigate, useParams } from 'react-router-dom';
import ProgramQuestions from '../components/ProgramQuestions';
import { useStateContext } from '../context/ContextProvider';

function ProgramCreate() {
    const { showToast } = useStateContext();
    const navigate = useNavigate();
    const { id } = useParams();
    const [program, setProgram] = useState({
        title: "",
        slug: "",
        status: false,
        description: "",
        image: null,
        image_url: null,
        expire_date: "",
        questions: [],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];
    
        const reader = new FileReader();
        reader.onload = () => {
          setProgram({
            ...program,
            image: file,
            image_url: reader.result,
          });
    
          ev.target.value = "";
        };
        reader.readAsDataURL(file);
      };

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = { ...program};
        if (payload.image) {
            payload.image = payload.image_url
        }
        delete payload.image_url;

        let res = null;
        if (id) {
            res = axiosClient.put(`/program/${id}`, payload);
        } else {
            res = axiosClient.post("/program", payload);
        }
        res
        .then((res) => {
            console.log(res);
            navigate("/programs");
            if (id) {
            showToast("The program was updated");
            } else {
            showToast("The program was created");
            }
        })
        .catch((err) => {
            if (err && err.response) {
            setError(err.response.data.message);
            }
            console.log(err, err.response);
        });
    }

    function onQuestionsUpdate(questions) {
        setProgram({
            ...program,
            questions,
        });
    }

    const addQuestion = () => {
        program.questions.push({
          id: uuidv4(),
          type: "text",
          question: "",
          description: "",
          data: {},
        });
        setProgram({ ...program });
    };
    
      const onDelete = () => {
    
    }

    useEffect(() => {
        if (id) {
          setLoading(true);
          axiosClient.get(`/program/${id}`).then(({ data }) => {
            setProgram(data.data);
            setLoading(false);
          });
        }
    }, []);
  return (
    <PageComponent 
        title={!id ? "Create New Program" : "Update Program"}
        buttons={id &&
            <div className='flex gap-2'>
            <TButton color='indigo' href={`/programs/answer/${program.slug}`}>
                <PaperAirplaneIcon className='h-4 w-4 mr-2' />
                Program Answer
            </TButton>
            <TButton color='green' href={`/programs/public/${program.slug}`}>
                <LinkIcon className='h-4 w-4 mr-2' />
                Public Link
            </TButton>
            <TButton color='red' onClick={onDelete}>
                <TrashIcon className='h-4 w-4 mr-2' />
                Delete
            </TButton>
            </div>
        }
        
        >
        {loading && <div className='text-lg text-center'>Loading...</div>}
        {!loading &&
        <form action="#" method="POST" onSubmit={onSubmit}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    {error && (<div className="bg-red-500 text-white py-3 px-3">{error}</div>)}

                    {/*Image*/}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Photo
                        </label>
                        <div className="mt-1 flex items-center">
                        {program.image_url && (
                            <img
                            src={program.image_url}
                            alt=""
                            className="w-32 h-32 object-cover"
                            />
                        )}
                        {!program.image_url && (
                            <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                            <PhotoIcon className="w-8 h-8" />
                            </span>
                        )}
                        <button
                            type="button"
                            className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <input
                            type="file"
                            className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                            onChange={onImageChoose}
                            />
                            Change
                        </button>
                        </div>
                    </div>
                    {/*Image*/}

                    {/*Title*/}
                    <div className="col-span-6 sm:col-span-3">
                        <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Program Title
                        </label>
                        <input
                        type="text"
                        name="title"
                        id="title"
                        value={program.title}
                        onChange={(ev) =>
                            setProgram({ ...program, title: ev.target.value })
                        }
                        placeholder="Program Title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/*Title*/}

                    {/*Description*/}
                    <div className="col-span-6 sm:col-span-3">
                        <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Description
                        </label>
                        {/* <pre>{ JSON.stringify(program, undefined, 2) }</pre> */}
                        <textarea
                        name="description"
                        id="description"
                        value={program.description || ""}
                        onChange={(ev) =>
                            setProgram({ ...program, description: ev.target.value })
                        }
                        placeholder="Describe your program"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>
                    {/*Description*/}

                    {/*Expire Date*/}
                    <div className="col-span-6 sm:col-span-3">
                        <label
                        htmlFor="expire_date"
                        className="block text-sm font-medium text-gray-700"
                        >
                        Expire Date
                        </label>
                        <input
                        type="date"
                        name="expire_date"
                        id="expire_date"
                        value={program.expire_date}
                        onChange={(ev) =>
                            setProgram({ ...program, expire_date: ev.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/*Expire Date*/}

                    {/*Active*/}
                    <div className="flex items-start">
                        <div className="flex h-5 items-center">
                        <input
                            id="status"
                            name="status"
                            type="checkbox"
                            checked={program.status}
                            onChange={(ev) =>
                            setProgram({ ...program, status: ev.target.checked })
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        </div>
                        <div className="ml-3 text-sm">
                        <label
                            htmlFor="comments"
                            className="font-medium text-gray-700"
                        >
                            Active
                        </label>
                        <p className="text-gray-500">
                            Whether to make program publicly available
                        </p>
                        </div>
                    </div>
                    {/*Active*/}
                    <button type="button" onClick={addQuestion}>
                        Add question
                    </button>
                    <ProgramQuestions
                        questions={program.questions}
                        onQuestionsUpdate={onQuestionsUpdate}
                    />
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <TButton>Save</TButton>
                    </div>
                </div>
        </form>
        }
    </PageComponent>
  );
}

export default ProgramCreate;
