'use client';

import Checkbox from '@/components/Checkbox';
import PollResultsCard from '@/components/PollResultsCard';
import Button from '@/components/shared/buttons/Button';
import Image from 'next/legacy/image';
import { useState } from 'react';

export default function Results() {
  const [cardIndex, setCardIndex] = useState(0);

  //the following have to be taken by useContext or else
  const pollQuestion =
    'Is love the antidote to fear, the foundation of genuine connection and liberation?';
  const pollDescription =
    'Love is a transformative force, a radical act of embracing vulnerability, and a commitment to growth, healing, and understanding. It is the power that dismantles walls, nurtures connections, and empowers us to see and cherish the beauty in ourselves and others.';
  const pollType = 'Single Choice';
  const anonymityLevel =
    'Reveal usernames for options with agreement of at least 60%';
  const numberOfParticipants = '3/10 participants voted';

  //slices the poll question to fit in the card
  function slicedPollQuestionStart(pollQuestion: string, characters: number) {
    const slicedSentence = pollQuestion.slice(0, characters);
    const lastSpaceIndex = slicedSentence.lastIndexOf(' ');
    if (lastSpaceIndex === -1) {
      return slicedSentence;
    } else {
      return `${slicedSentence.slice(0, lastSpaceIndex)}...`;
    }
  }
  function slicedPollQuestionEnd(pollQuestion: string, characters: number) {
    const restOfSentence = pollQuestion.slice(characters);
    const firstQuestionMarkIndex = restOfSentence.indexOf('?');
    if (firstQuestionMarkIndex !== -1) {
      return restOfSentence.slice(0, firstQuestionMarkIndex + 1);
    } else {
      return `...${restOfSentence}`;
    }
  }

  const cards = [
    //1.svg+text
    <PollResultsCard
      pollQuestion={slicedPollQuestionStart(pollQuestion, 60)}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[260px] flex flex-col">
        <Image
          width={135}
          height={135}
          src="/images/logos/results.svg"
          alt="icon"
          className="mt-7"
        />
        <p className="body text-center mb-4 mt-2">
          Yay!
          <br />
          Are you ready for your
          <br />
          polls result?
        </p>
      </PollResultsCard.Content>
    </PollResultsCard>,

    //2.question=description
    <PollResultsCard
      pollQuestion={slicedPollQuestionStart(pollQuestion, 34)}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[260px] overflow-y-auto">
        <p className="body-semibold mb-5">
          ...{slicedPollQuestionEnd(pollQuestion, 34)}
        </p>
        <p className="body">{pollDescription}</p>
      </PollResultsCard.Content>
    </PollResultsCard>,

    //3.voting conditions
    <PollResultsCard
      pollQuestion={slicedPollQuestionStart(pollQuestion, 34)}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[260px]">
        <p className="body-semibold mb-4">Voting Conditions</p>
        <div className="flex items-center gap-2">
          {/* <CheckboxWithLabel variant={'primary'} label={''}></CheckboxWithLabel> */}
          <Checkbox variant={'secondary'}></Checkbox>
          <p className="body">{pollType}</p>
        </div>
        <div className="flex items-center gap-2 my-[26px]">
          {/* <CheckboxWithLabel variant={'primary'} label={''}></CheckboxWithLabel> */}
          <Checkbox variant={'secondary'}></Checkbox>
          <p className="body">{numberOfParticipants}</p>
        </div>
        <div className="flex gap-2">
          {/* <CheckboxWithLabel variant={'primary'} label={''}></CheckboxWithLabel> */}
          <Checkbox variant={'secondary'}></Checkbox>
          <p className="body">{anonymityLevel}</p>
        </div>
      </PollResultsCard.Content>
    </PollResultsCard>,

    //4.answers+percantages
    <PollResultsCard
      pollQuestion={slicedPollQuestionStart(pollQuestion, 34)}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[260px]">
        placeholder
      </PollResultsCard.Content>
    </PollResultsCard>,

    //5.mood
    <PollResultsCard
      pollQuestion={slicedPollQuestionStart(pollQuestion, 34)}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[260px] flex flex-col ">
        <p>The average mood of this poll’s voters is:</p>
        {/* <Button className="mt-4 " size="medium">
          mood
        </Button> */}
        <p>mood bar with icons</p>
      </PollResultsCard.Content>
    </PollResultsCard>,
  ];

  return (
    <>
      <h1 className="title-black text-left mt-2 mb-10">Poll Results</h1>
      {cards[3]}
    </>
  );
}
