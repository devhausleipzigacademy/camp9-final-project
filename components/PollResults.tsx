'use client';

import Checkbox from '@/components/Checkbox';
import MoodDisplay from '@/components/MoodDisplay';
import PollProgressBar from '@/components/PollProgressBar';
import PollResultsCard from '@/components/PollResultsCard';
import Button from '@/components/shared/buttons/Button';
import { Poll, User, Vote, Mood } from '@prisma/client';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import ProgressBar from './shared/ProgressBar';

interface PollResultsProps extends Poll {
  participants: User[];
  votes: Vote[];
}

export default function PollResults({ poll }: { poll: PollResultsProps }) {
  const router = useRouter();
  const [cardIndex, setCardIndex] = useState(0);

  //next&back button functionality
  function incrementValue() {
    if (cardIndex < 4) {
      setCardIndex(cardIndex + 1);
    } else router.push('/');
  }
  function decrementValue() {
    if (cardIndex === 0) {
      router.push('/closed');
    } else {
      setCardIndex(cardIndex - 1);
    }
  }

  //slices the poll question to fit in the card
  function questionFitter(pollQuestion: string, characters: number) {
    if (pollQuestion.length < characters) {
      return { questionStart: pollQuestion };
    } else if (pollQuestion[characters] === ' ') {
      return {
        questionStart: `${pollQuestion.slice(0, characters)}...`,
        questionEnd: `...${pollQuestion.slice(
          characters,
          pollQuestion.length
        )}`,
      };
    } else {
      const brokenSlice = pollQuestion.slice(0, characters);
      const lastSpaceIndex = brokenSlice.lastIndexOf(' ');
      return {
        questionStart: `${pollQuestion.slice(0, lastSpaceIndex)}...`,
        questionEnd: `...${pollQuestion.slice(
          lastSpaceIndex,
          pollQuestion.length
        )}`,
      };
    }
  }

  const allMoods = poll.votes.map(vote => Object.keys(Mood).indexOf(vote.mood));
  const averageMood = (() => {
    let sum = 0;
    for (let i = 0; i < allMoods.length; i++) {
      sum += allMoods[i]!; // <-- excalamation used!
    }
    return sum / allMoods.length;
  })(); // <!-- an IIFE spotted in the wild!

  const averageMoodValues = (() => {
    if (averageMood < 0.5) {
      return { color: 'bg-red', description: 'miserable' };
    } else if (averageMood < 1.5) {
      return { color: 'bg-peach', description: 'unhappy' };
    } else if (averageMood < 2.5) {
      return { color: 'bg-yellow', description: 'unsure' };
    } else if (averageMood < 3.5) {
      return { color: 'bg-green-light', description: 'happy' };
    } else if (averageMood <= 4) {
      return { color: 'bg-green', description: 'beaming' };
    }
  })();

  // collate the voter answers (boolean) arrays to an array of totals
  const answerTotalsArray = function () {
    const answerTotals: Array<number> = [];
    for (let k = 0; k < poll.options.length; k++) {
      answerTotals.push(0);
    }
    for (let i = 0; i < poll.votes.length; i++) {
      for (let j = 0; j < poll.options.length; j++) {
        if (poll.votes[i]?.answer[j] === true) {
          answerTotals.splice(j, 1, answerTotals[j]! + 1);
        }
      }
    }
    return answerTotals;
  }();

  console.log(poll);

  ///////////
  // cards //
  ///////////

  const cards = [
    //0.svg+text
    <PollResultsCard
      pollQuestion={questionFitter(poll.question, 60).questionStart}
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
      pollQuestion={questionFitter(poll.question, 32).questionStart}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[260px] ">
        <div className="overflow-y-auto scrollbar-left-padded scrollbar--results h-[230px]">
          <p className="body-semibold mb-5">
            {questionFitter(poll.question, 32).questionEnd}
          </p>
          <p className="body-light text-black">{poll.description}</p>
        </div>
      </PollResultsCard.Content>
      <div className="text-right mt-3 mr-1">
        <p className="small items-end">
          created on <strong>{poll.createdAt.toDateString()}</strong>
        </p>
        <p className="small">
          closed on <strong>{poll.endDateTime.toDateString()}</strong>
        </p>
      </div>
    </PollResultsCard>,

    //2.voting conditions
    <PollResultsCard
      pollQuestion={questionFitter(poll.question, 32).questionStart}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[260px]">
        <p className="body-semibold mb-4">Voting Conditions</p>
        <div className="flex items-center gap-2">
          <Checkbox
            variant={'secondary'}
            checkProp={true}
            disableProp={true}
          ></Checkbox>
          <p className="body-light text-black">
            {poll.type === 'SingleChoice' ? 'Single Choice' : 'Multiple Choice'}
          </p>
        </div>
        <div className="flex items-center gap-2 my-[20px]">
          <Checkbox
            variant={'secondary'}
            checkProp={true}
            disableProp={true}
          ></Checkbox>
          <p className="body-light text-black">
            {poll.participants.length} participants
          </p>
        </div>
        <div className="flex gap-2">
          <Checkbox
            variant={'secondary'}
            checkProp={true}
            disableProp={true}
          ></Checkbox>
          <p className="body-light text-black">
            {poll.anonymity === 'Anonymous'
              ? 'Anonymous'
              : poll.anonymity === 'NonAnonymous'
              ? 'Non anonymous'
              : `Anonymous until quorum of ${poll.quorum}% is reached`}
          </p>
        </div>
      </PollResultsCard.Content>
      <div className="text-right mt-3 mr-1">
        <p className="small items-end">
          created on <strong>{poll.createdAt.toDateString()}</strong>
        </p>
        <p className="small">
          closed on <strong>{poll.endDateTime.toDateString()}</strong>
        </p>
      </div>
    </PollResultsCard>,

    //3.answers+percantages
    //sort options by percentages or by appearence in the poll?
    <PollResultsCard
      pollQuestion={questionFitter(poll.question, 32).questionStart}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[310px]">
        <div className="overflow-y-auto scrollbar-left-padded scrollbar--results h-[270px]">
          {poll.options.map((option, index) => (
            <div className="mb-5">
              <p className="body-light text-black mb-3">{option}</p>
              <div className="w-[220px]">
                <PollProgressBar
                  votes={answerTotalsArray[index]!}
                  participants={poll.participants.length}
                />
              </div>
              <p>{answerTotalsArray[index]!} {poll.participants.length}</p>
              <button
                type="button"
                className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 flex gap-1 items-center"
              >
                <p className="small-bold">{poll.votes.length} votes</p>
                <Image
                  src="/images/icons/arrowDown.png"
                  width={13}
                  height={16}
                  alt="show participants who voted for this option"
                ></Image>
              </button>
            </div>
          ))}
        </div>
      </PollResultsCard.Content>
    </PollResultsCard>,

    //4.mood
    <PollResultsCard
      pollQuestion={questionFitter(poll.question, 32).questionStart}
      endDate={new Date()}
      startDate={new Date()}
    >
      <PollResultsCard.Content className="h-[260px]">
        <p className="text-start description">
          The average mood of this poll’s voters is:
        </p>
        <div className="flex flex-col items-center gap-4 mt-9">
          <div
            className={
              'shadow-brutal border-brutal w-28 h-8 body text-center item-center rounded-sm ' +
              averageMoodValues?.color
            }
          >
            {averageMoodValues?.description}
          </div>
          <MoodDisplay averageMood={averageMood}></MoodDisplay>
        </div>
      </PollResultsCard.Content>
      <div className="text-right mt-3 mr-1">
        <p className="small items-end">
          created on <strong>{poll.createdAt.toDateString()}</strong>
        </p>
        <p className="small">
          closed on <strong>{poll.endDateTime.toDateString()}</strong>
        </p>
      </div>
    </PollResultsCard>,
  ];

  ////////////////
  // JSX return //
  ////////////////

  return (
    <div>
      <main className="container flex flex-col h-screen w-screen justify-between bg-peach-light p-8">
        <div className="mb-36 w-full flex flex-col justify-between">
          <h1 className="title-black text-left mt-2">Poll Results</h1>
          {cardIndex >= 1 && (
            <ProgressBar currentPage={cardIndex} numberOfPages={4} />
          )}
          <div className="h-5" /> {/* <-- hacky spacing fix */}
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
