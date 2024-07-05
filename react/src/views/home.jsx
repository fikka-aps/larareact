import React, { useEffect, useState } from 'react';
import axiosClient from '../axios';
import ProgramListItem from '../components/ProgramListItem';
import PaginationLinks from '../components/PaginationLinks';

function Home() {

  const [programs, setPrograms] =useState([]);
  const [meta, setMeta] =useState({});
  const [loading, setLoading] =useState(false);

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
    <div>
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
    </div>
  );
}

export default Home;
