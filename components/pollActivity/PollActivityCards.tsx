'use client';

import { Poll } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import PollCard from '../PollCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function getNewPolls() {
  const { data } = await axios.get<Poll[]>('/api/getPolls');
  return data;
}

function PollActivityCards({ polls }: { polls: Poll[] }) {
  const { data } = useQuery<Poll[]>({
    queryKey: ['polls', 'new'],
    queryFn: getNewPolls,
    initialData: polls,
    refetchInterval: 10000,
  });
  const [cards, setCards] = useState(<></>);
  function refreshCards() {
    let newCards = <></>;
    if (data) {
      if (data.length === 0) {
        newCards = (
          <div className=" flex flex-col justify-center items-center">
            <img src="/images/flame-288.gif" className="w-[250px]"></img>
            <h1 className="title-bold text-center">No polls to see.</h1>
          </div>
        );
      } else
        newCards = (
          <>
            {data.map(poll => (
              <PollCard
                className="mb-4"
                key={poll.id}
                endDate={poll.endDateTime}
                isVoted={false}
                pollId={poll.id}
              >
                {poll?.question}
              </PollCard>
            ))}
          </>
        );
    }
    // compare cards state with the newCards
    // if different, set cards state to newCards
  }
  useEffect(() => {
    // set an interval that calls refreshCards() each 1 minute
  }, []);
  return cards;
}

export default PollActivityCards;
