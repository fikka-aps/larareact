import React from 'react';
import PageComponent from '../components/PageComponent';
import { useStateContext } from '../context/ContextProvider';
import ProgramListItem from '../components/ProgramListItem';
import TButton from '../components/core/TButton';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

function Programs() {
    const {programs} = useStateContext();
    console.log(programs);

    const onDeleteClick = () => {
        console.log("on delete click");
    }
  return (
    <PageComponent title="Programs"
    buttons={(
        <TButton color='green' to="/programs/create">
            <PlusCircleIcon className='h-6 w-6 mr-2' />
            Create new
        </TButton>
    )}
    >
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3'>
            {programs.map(program => (
                <ProgramListItem program={program} key={program.id} onDeleteClick={onDeleteClick} />
            ))}
        </div>
    </PageComponent>
  );
}

export default Programs;
