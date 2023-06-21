'use client';

import { getVotePollQuery } from '@/components/hooks/usePoll';
import { Poll } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { usePathname } from 'next/navigation';

export default function Voting() {
  //extract the arguments from the URL
  const pathname = usePathname();
  const path = pathname.split('/');

  if (path[2] === undefined || path[3] === undefined) {
    return <>Sorry</>;
  }

  const { query } = getVotePollQuery(path[2], path[3]);

  return (
    <>
      <h1 className="title-black">{pathname}</h1>
      <p></p>
    </>
  );
}
