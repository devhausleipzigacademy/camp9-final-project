'use client';

function ListFilterComponent() {
  function handleFilter(filterOption: string) {
    const userId = 'Hello'; //session?.user?.name as string;
    const pollRequest = { userId, filter: filterOption };
    getPolls(pollRequest);
  }
  return (
    <div>
      <button onClick={() => handleFilter('new')}>new</button>
      <button onClick={() => handleFilter('pending')}>pending</button>
      <button onClick={() => handleFilter('closed')}>closed</button>
      <button onClick={() => handleFilter('myPolls')}>my polls</button>
    </div>
  );
}

export default ListFilterComponent;
