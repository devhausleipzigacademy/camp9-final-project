'use client';

import { Poll } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import PollCard from '../PollCard';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import _ from 'lodash';
import { ExtendedPoll } from '@/types/pollActivity';

// axios get new polls function
async function getNewPollsAxios() {
  const { data } = await axios.get<Poll[]>('/api/getPolls/new');
  return data;
}
// axios get pending polls function
async function getPendingPollsAxios() {
  const { data } = await axios.get<ExtendedPoll[]>('/api/getPolls/pending');
  return data;
}
// axios get closed polls function
async function getClosedPollsAxios() {
  const { data } = await axios.get<ExtendedPoll[]>('/api/getPolls/closed');
  return data;
}
// axios get my polls function
async function getMyPollsAxios() {
  const { data } = await axios.get<ExtendedPoll[]>('/api/getPolls/myPolls');
  return data;
}

function PollActivityCards({
  polls,
  type,
}: {
  polls: Poll[] | ExtendedPoll[];
  type: 'new' | 'pending' | 'closed' | 'myPolls';
}) {
  let queryFn;
  let queryKey;
  switch (type) {
    case 'new':
      queryFn = getNewPollsAxios;
      queryKey = ['polls', 'new'];
      break;
    case 'pending':
      queryFn = getPendingPollsAxios;
      queryKey = ['polls', 'pending'];
      break;
    case 'closed':
      queryFn = getClosedPollsAxios;
      queryKey = ['polls', 'closed'];
      break;
    case 'myPolls':
      queryFn = getMyPollsAxios;
      queryKey = ['polls', 'myPolls'];
      break;
  }
  const { data } = useQuery<Poll[] | ExtendedPoll[]>({
    queryKey: queryKey,
    queryFn: queryFn,
    initialData: polls,
    refetchInterval: 60000,
  });
  const [cards, setCards] = useState(renderCards());
  // function that recreates cards
  function renderCards() {
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
            {data.map(poll => {
              let hasVoted = false;
              if ('votes' in poll) {
                hasVoted = !!poll.votes.filter(
                  vote => vote.userId === poll.creatorId
                ).length;
              }

              return (
                <PollCard
                  className="mb-4"
                  key={poll.id}
                  endDate={poll.endDateTime}
                  isVoted={hasVoted}
                  pollId={poll.id}
                >
                  {poll?.question}
                </PollCard>
              );
            })}
          </>
        );
    }
    return newCards;
  }
  useEffect(() => {
    // sets an interval that calls refreshCards() each 30 seconds
    // if the newly created cards look different than the old ones, the state gets updated, triggering a re-render
    const interval = setInterval(() => {
      const newCards = renderCards();
      if (!_.isEqual(newCards, cards)) {
        setCards(newCards);
      }
    }, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return cards;
}

export default PollActivityCards;
