import clsx from 'clsx';
import TabButton from 'components/shared/buttons/TabButton';
import Link from 'next/link';
import React, { useState } from 'react';

type PollActivityActionBarProps = {
  className?: string;
};

function PollActivityActionBar({ className }: PollActivityActionBarProps) {
  return (
    <div className={clsx('flex flex-col justify-around', className)}>
      <h1 className="title-bold p-8 pb-0 flex justify-center pr-40">
        Poll Activity
      </h1>
      <div className="flex gap-2  flex-row justify-center mb-5">
        <TabButton href="/new">new</TabButton>
        <TabButton href="/pending">pending</TabButton>
        <TabButton href="closed">closed</TabButton>
        <TabButton href="/mypolls">my polls</TabButton>
      </div>
    </div>
  );
}

export default PollActivityActionBar;
