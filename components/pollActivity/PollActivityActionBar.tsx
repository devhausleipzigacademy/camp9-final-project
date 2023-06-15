import Link from 'next/link';
import React from 'react';

function PollActivityActionBar() {
  return (
    <div className="flex flex-row">
      <Link href={'/new'}>new</Link>
      <Link href={'/pending'}>pending</Link>
      <Link href={'/closed'}>closed</Link>
      <Link href={'/mypolls'}>my polls</Link>
    </div>
  );
}

export default PollActivityActionBar;
