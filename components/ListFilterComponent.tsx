'use client';

import { useState } from 'react';
import { useFilterPollActivity } from './hooks/usePolls';

function ListFilterComponent() {
  const [filter, setFilter] = useState('new');
  const { query } = useFilterPollActivity(filter);
  console.log(query.data);
  return (
    <div>
      <div>
        <button onClick={() => setFilter('new')}>new</button>
        <button onClick={() => setFilter('pending')}>pending</button>
        <button onClick={() => setFilter('closed')}>closed</button>
        <button onClick={() => setFilter('myPolls')}>my polls</button>
      </div>
      <div>
        {query.data?.map(poll => (
          <p>{poll.description}</p>
        ))}
      </div>
    </div>
  );
}

export default ListFilterComponent;
