import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import TButton from './core/TButton';

function ProgramListItem({program, onDeleteClick}) {
  return (
   <div className='flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]'>
        <img src={program.image_url} alt={program.title} className='w-full h-48 object-cover' />
        <h4 className='mt-4 text-lg font-bold'>{program.title}</h4>
        <div
        dangerouslySetInnerHTML={{__html: program.description}}
        className='overflow-hidden flex-1'
        >
        </div>
        <div className='flex justify-between items-center mt-3'>
            <TButton to={`programs/${program.id}`}>
                <PencilIcon className='w-5 h-5 mr-2' />
                Edit
            </TButton>
            <div className='flex items-center'>
                <TButton href={`/view/program/${program.slug}`} circle link>
                    <ArrowTopRightOnSquareIcon className='w-5 h-5' />
                </TButton>

                {program.id && (
                    <TButton onClick={onDeleteClick} circle link color="red">
                        <TrashIcon className='w-5 h-5' />
                    </TButton>
                )}
            </div>
        </div>
    </div>
  );
}

export default ProgramListItem;
