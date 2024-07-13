import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import TButton from './core/TButton';
import { useStateContext } from '../context/ContextProvider';

function ProgramListItem({program, onDeleteClick}) {
    const {userRole} = useStateContext()
  return (
   <div className='flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[500px]'>
        <img src={program.image_url} alt={program.title} className='w-full h-80 object-cover' />
        <h4 className='mt-4 text-lg font-bold'>{program.title}</h4>
        <div
        dangerouslySetInnerHTML={{__html: program.description}}
        className='overflow-hidden flex-1'
        >
        </div>
        <div >
            {userRole==='admin' ? (
                <div className='flex justify-between items-center'>
                    <TButton to={`/admin/programs/${program.id}`}>
                        <PencilIcon className='w-5 h-5 mr-2' />
                        Edit
                    </TButton>
                    <div className='flex items-center'>
                        <TButton href={`/admin/programs/answer/${program.id}`} circle link>
                            <ArrowTopRightOnSquareIcon className='w-5 h-5' />
                        </TButton>

                        {program.id && (
                            <TButton onClick={ev => onDeleteClick(program.id)} circle link color="red">
                                <TrashIcon className='w-5 h-5' />
                            </TButton>
                        )}
                    </div>
                </div>
            ) : (
                <div className='flex'>
                    {program.id && (
                        <TButton to={`/user/programs/public/${program.slug}`}>
                            Daftar
                        </TButton>
                    )}
                </div>
            )}
            
            
        </div>
    </div>
  );
}

export default ProgramListItem;
