import React, { useEffect, useState } from 'react';
import PageComponent from '../components/PageComponent';
import { useStateContext } from '../context/ContextProvider';
import ProgramListItem from '../components/ProgramListItem';
import TButton from '../components/core/TButton';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import axiosClient from '../axios';
import PaginationLinks from '../components/PaginationLinks';

function Programs() {
    const {showToast, showModal} = useStateContext();
    const [programs, setPrograms] =useState([]);
    const [meta, setMeta] =useState({});
    const [loading, setLoading] =useState(false);
    // console.log(programs);

    const handleDelete = (id) => {
        axiosClient.delete(`/program/${id}`).then(() => {
        getPrograms();
        showToast('The program was deleted');
        });
    };

    const handleSuccess = () => {
        console.log('Operation successful!');
        // Add your success logic here
    };

    // const onDeleteClick = (id) => {
    //     if (window.confirm("Are you sure you want to delete this program?")) {
    //         axiosClient.delete(`/program/${id}`).then(() => {
    //         getPrograms();
    //         showToast('The program was deleted');
    //         });
    //     }
    // };

    const onPageClick = (link) => {
        getPrograms(link.url);
    };

    const getPrograms = (url) => {
        url = url || "/program";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
          setPrograms(data.data);
          setMeta(data.meta);
          setLoading(false);
        });
    };

    useEffect(() => {
        getPrograms();
    }, []);
    
    return (
        <PageComponent title="Programs"
        buttons={(
            <TButton color='green' to="/programs/create">
                <PlusCircleIcon className='h-6 w-6 mr-2' />
                Create new
            </TButton>
        )}
        >
            {loading && <div className="text-center text-lg">Loading...</div>}
            {!loading && (
            <div>
                <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
                    {programs.map(program => (
                        <ProgramListItem program={program} key={program.id} onDeleteClick={() => showModal('Are you sure you want to delete this item?', handleDelete, 'danger', program.id)} />
                    ))}
                </div>
                {programs.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}
            </div>
            )}
        </PageComponent>
    );
}

export default Programs;
