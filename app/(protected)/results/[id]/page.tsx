'use client';

import Checkbox from '@/components/Checkbox';
import MoodDisplay from '@/components/MoodDisplay';
import PollProgressBar from '@/components/PollProgressBar';
import PollResultsCard from '@/components/PollResultsCard';
import Button from '@/components/shared/buttons/Button';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function Results() {
  const [cardIndex, setCardIndex] = useState(0);
  const router = useRouter();

  function incrementValue() {
    if (cardIndex < 4) {
      setCardIndex(cardIndex + 1);
    } else router.push('/new');
  }
  function decrementValue() {
    if (cardIndex === 0) {
      router.push('/closed');
    } else {
      setCardIndex(cardIndex - 1);
    }
  }

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
    //0.svg+text
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

    //1.question=description
    <PollResultsCard
      pollQuestion={slicedPollQuestionStart(pollQuestion, 34)}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[260px] overflow-y-auto">
        <p className="body-semibold mb-5">
          ...{slicedPollQuestionEnd(pollQuestion, 34)}
        </p>
        <p className="body-light text-black">{pollDescription}</p>
      </PollResultsCard.Content>
      <div className="text-right mt-3 mr-1">
        <p className="small items-end">
          created on <strong>XX/XX/XXXX</strong>
        </p>
        <p className="small">
          closed on <strong>XX/XX/XXXX</strong>
        </p>
      </div>
    </PollResultsCard>,

    //2.voting conditions
    <PollResultsCard
      pollQuestion={slicedPollQuestionStart(pollQuestion, 34)}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[260px]">
        <p className="body-semibold mb-4">Voting Conditions</p>
        <div className="flex items-center gap-2">
          <Checkbox variant={'secondary'}></Checkbox>
          <p className="body-light text-black">{pollType}</p>
        </div>
        <div className="flex items-center gap-2 my-[20px]">
          <Checkbox variant={'secondary'}></Checkbox>
          <p className="body-light text-black">{numberOfParticipants}</p>
        </div>
        <div className="flex gap-2">
          <Checkbox variant={'secondary'}></Checkbox>
          <p className="body-light text-black">{anonymityLevel}</p>
        </div>
      </PollResultsCard.Content>
      <div className="text-right mt-3 mr-1">
        <p className="small items-end">
          created on <strong>XX/XX/XXXX</strong>
        </p>
        <p className="small">
          closed on <strong>XX/XX/XXXX</strong>
        </p>
      </div>
    </PollResultsCard>,

    //3.answers+percantages
    //sort options by percentages or by appearence in the poll?
    <PollResultsCard
      pollQuestion={slicedPollQuestionStart(pollQuestion, 34)}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[310px] overflow-y-auto">
        <div className="mb-5">
          <p className="body-light text-black mb-3">
            1: Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <div className="w-[250px]">
            <PollProgressBar votes={7} participants={10} />
          </div>
        </div>
        <div>
          <p className="body-light text-black mb-3">
            2: Lorem ipsum dolor sit amet, consectetur adipiscing
          </p>
          <div className="w-[250px]">
            <PollProgressBar votes={3} participants={10} />
          </div>
        </div>
      </PollResultsCard.Content>
    </PollResultsCard>,

    //4.mood
    <PollResultsCard
      pollQuestion={slicedPollQuestionStart(pollQuestion, 34)}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[260px]  ">
        <p className="text-start description">
          The average mood of this poll’s voters is:
        </p>
        <div className="flex flex-col items-center gap-4 mt-9">
          <div className="shadow-brutal border-brutal w-28 h-8 body text-center item-center rounded-sm">
            happy
          </div>
          <MoodDisplay averageMood={4}></MoodDisplay>
        </div>
      </PollResultsCard.Content>
      <div className="text-right mt-3 mr-1">
        <p className="small items-end">
          created on <strong>XX/XX/XXXX</strong>
        </p>
        <p className="small">
          closed on <strong>XX/XX/XXXX</strong>
        </p>
      </div>
    </PollResultsCard>,
  ];

  return (
    <div>
      <main className="container flex flex-col h-screen justify-between bg-peach-light p-8">
        <div className="mb-36 w-full flex flex-col justify-between">
          <h1 className="title-black text-left mt-2 mb-10">Poll Results</h1>
          {cards[cardIndex]}
        </div>
      </main>
      <footer className="flex container px-8 justify-between bottom-28 fixed">
        <Button size="small" variant="secondary" onClick={decrementValue}>
          <GrFormPrevious size={24} strokeWidth={2} />
          <h3>Back</h3>
        </Button>
        <Button size="medium" variant="tertiary" onClick={incrementValue}>
          <h3>Next</h3>
          <GrFormNext size={24} strokeWidth={2} />
        </Button>
      </footer>
    </div>
  );
}
