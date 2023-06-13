'use client';

import { useState } from 'react';
import { useFilterPollActivity } from './hooks/usePolls';

function ListFilterComponent() {
  const [useFilter, setUseFilter] = useState('new');
  const { query } = useFilterPollActivity(useFilter);
  return (
    <div>
      <button onClick={() => setUseFilter('new')}>new</button>
      <button onClick={() => setUseFilter('pending')}>pending</button>
      <button onClick={() => setUseFilter('closed')}>closed</button>
      <button onClick={() => setUseFilter('myPolls')}>my polls</button>
    </div>
  );
}

export default ListFilterComponent;
