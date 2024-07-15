import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import TButton from './core/TButton';
import { useNavigate } from 'react-router-dom';

function PublicProgramList({program}) {

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    const isLoggedIn = false; // Replace this with your actual login check
    if (!isLoggedIn) {
      const loginUrl = `/login?redirect=/user/programs/public/${program.slug}`;
      navigate(loginUrl);
    } else {
      navigate(`/user/programs/public/${program.slug}`);
    }
  };
  return (
   <div className='flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 mt-3 rounded-lg'>
        <img src={program.image_url} alt={program.title} className='w-full h-80 object-cover' />
        <h4 className='mt-4 text-lg font-bold'>{program.title}</h4>
        <div
        dangerouslySetInnerHTML={{__html: program.description}}
        className='overflow-hidden flex-1'
        >
        </div>
        <div className='flex justify-between items-center mt-3'>
            <TButton onClick={handleRegisterClick}>
                Daftar
            </TButton>
        </div>
    </div>
  );
}

export default PublicProgramList;
