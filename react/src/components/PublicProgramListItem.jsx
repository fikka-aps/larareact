import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import TButton from './core/TButton';

function PublicProgramList({program, onDeleteClick}) {
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
            <TButton to={`/user/programs/public/${program.slug}`}>
                Daftar
            </TButton>
        </div>
    </div>
  );
}

export default PublicProgramList;
