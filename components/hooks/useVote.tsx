import { Anonymity, Mood, Poll, PollType } from '@prisma/client';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import Questionbox from '../Question';
import Button from '../shared/buttons/Button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Image from 'next/image';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import MoodDisplay from '../MoodDisplay';
import { Dispatch, SetStateAction } from 'react';
import { Navbar } from '../shared/navbar/Navbar';

interface SideKickProps {
  query: UseQueryResult<AxiosResponse<Poll, any>, unknown>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  register: UseFormRegister<FieldValues>;
  abstain?: boolean;
  anonymWatch?: boolean;
  voteWatch?: boolean;
  mood: string;
  setMood: Dispatch<SetStateAction<string>>;
}

export function superSidekickHoock({
  query,
  step,
  setStep,
  register,
  abstain,
  anonymWatch,
  voteWatch,
  setMood,
  mood,
}: SideKickProps) {
  //this determines the header of the voting page depending on the step
  function headerDisplay(step: number) {
    switch (step) {
      case 1:
        return 'Question';
      case 2:
        return 'Voting Conditions';
      case 3:
        return 'Voting';
      case 4:
        return 'Share Your Feedback';
    }
  }
  const header = headerDisplay(step);

  //this handles the anonymity fieldset depending on the anonymity type, quorum and step
  function handleAnonymous(
    step: number,
    anonymity: Anonymity | undefined,
    quorum: number | undefined | null
  ) {
    switch (anonymity) {
      case 'Anonymous':
        return (
          <fieldset
            className={clsx(step === 2 ? 'visible h-[375px]' : 'hidden')}
          >
            <p className="small">
              <span className="small-bold">Please check</span> you understand
              the poll conditions
            </p>
            <div className="flex flex-row justify-between">
              <label htmlFor="anonymity" className="body-semibold">
                Full anonymity
              </label>
              <input
                type="checkbox"
                {...register('Anonymous', { required: true })}
                className="checkmarkBox"
              />
            </div>
            <p className="description-light">No username will be revealed</p>
          </fieldset>
        );
      case 'NonAnonymous':
        return (
          <fieldset
            className={clsx(step === 2 ? 'visible h-[375px]' : 'hidden')}
          >
            <p className="small">
              <span className="small-bold">Please check</span> you understand
              the poll conditions
            </p>
            <div className="flex flex-row justify-between items-center">
              <label htmlFor={anonymity} className="body-semibold">
                No Anonymity
              </label>
              <input
                type="checkbox"
                {...register('NonAnynymous', { required: true })}
                className="checkmarkBox"
              />
            </div>
            <p className="description-light max-w-[270px]">
              The usernames and their votes will be revealed at the end of the
              voting period.
            </p>
          </fieldset>
        );
      case 'AnonymousUntilQuorum':
        return (
          <fieldset
            className={clsx(step === 2 ? 'visible h-[375px]' : 'hidden')}
          >
            <p className="small">
              <span className="small-bold">Please check</span> you understand
              the poll conditions
            </p>
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="anonymity" className="body-semibold">
                Anonymity until quorum
              </label>
              <input
                type="checkbox"
                {...register('AnonymousUntilQuorum', { required: true })}
                className="checkmarkBox"
              />
            </div>
            <p className="description-light max-w-[270px]">
              The usernames will be revealed when {quorum} participants reached
              a consesus.
            </p>
          </fieldset>
        );
    }
  }

  const anonymity = handleAnonymous(
    step,
    query.data?.data.anonymity,
    query.data?.data.quorum
  );

  //this handles the poll information depending on the poll type and step
  function handlePollInformation(
    type: PollType | undefined,
    options: string[] | undefined
  ) {
    if (type === 'SingleChoice') {
      return (
        <fieldset className={clsx(step === 3 ? 'visible' : 'hidden')}>
          <p className="small mb-2">Single choice, select only one</p>
          <div className="overflow-y-auto w-[19.3rem]  h-[352px] scrollbarteal">
            {options?.map(option => (
              <Questionbox key={option} variant="secondary">
                <input
                  type="radio"
                  {...register('singleChoice')}
                  value={option}
                  className="checkmarkBox"
                />
                <label className="w-[228px]" htmlFor={option}>
                  {option}
                </label>
              </Questionbox>
            ))}
            <Questionbox variant="secondary">
              <input
                type="radio"
                {...register('singleChoice')}
                value="abstain"
                className="checkmarkBox"
              />
              <label className="w-[228px]" htmlFor="abstain">
                Abstain
              </label>
            </Questionbox>
          </div>
        </fieldset>
      );
    } else if (type === 'MultipleChoice') {
      return (
        <fieldset className={clsx(step === 3 ? 'visible' : 'hidden')}>
          <p className="small mb-2"> Multi choice, select many as you want</p>
          <div className="overflow-y-auto  h-[352px] scrollbarteal">
            {options?.map(option => (
              <div
                key={option}
                className={clsx(
                  'bg-peach rounded-round p-2 mr-2 mb-5 border-solid border-black border-2 flex flex-row justify-between items-center ',
                  abstain ? 'opacity-50' : 'visible'
                )}
              >
                <input
                  type="checkbox"
                  {...register(`multipleChoice[${option}]`)}
                  className="checkmarkBox"
                  disabled={abstain}
                />
                <label className="w-[228px]" htmlFor={option}>
                  {option}
                </label>
              </div>
            ))}

            <div className="bg-peach rounded-round p-2 mr-2 mb-5 items-center border-solid border-black border-2 flex flex-row justify-between ">
              <input
                type="checkbox"
                {...register('abstain')}
                className="checkmarkBox"
              />
              <label className="w-[228px]" htmlFor="abstain">
                Abstain
              </label>
            </div>
          </div>
        </fieldset>
      );
    }
  }

  const typeOfPoll = handlePollInformation(
    query.data?.data.type,
    query.data?.data.options
  );

  //this handles the mood depending on the step
  function handleMood(step: number) {
    if (step === 4) {
      return (
        <div className="flex flex-col flex-wrap justify-center items-center gap-3">
          <p className="description text-center">
            How do you feel about the question you answered and/or skipped?
          </p>
          <p className="small text-center">
            Please select the mood that best describes how you felt: interested,
            indifferent, confused, annoyed, etc.
          </p>

          <div className="flex flex-row justify-between gap-4">
            <button
              onClick={() => setMood('Beaming')}
              type="button"
              className={clsx(
                'w-[120px] h-[90px] bg-peach border-brutal rounded-md flex items-center justify-center',
                mood === 'Beaming' ? 'shadow-none' : 'shadow-shadow'
              )}
            >
              <Image
                src="/images/voting/icons8-lol2 1.png"
                width={75}
                height={75}
                alt="Beaming"
              />
            </button>
            <button
              onClick={() => setMood('Happy')}
              type="button"
              className={clsx(
                'w-[120px] h-[90px] bg-peach border-brutal rounded-md flex items-center justify-center',
                mood === 'Happy' ? 'shadow-none' : 'shadow-shadow'
              )}
            >
              <Image
                src="/images/voting/icons8-happy2 1.png"
                width={75}
                height={75}
                alt="Happy"
              />
            </button>
          </div>
          <button
            onClick={() => setMood('Unsure')}
            type="button"
            className={clsx(
              'w-[120px] h-[90px] bg-peach border-brutal rounded-md flex items-center justify-center',
              mood === 'Unsure' ? 'shadow-none' : 'shadow-shadow'
            )}
          >
            <Image
              src="/images/voting/icons8-confused2 1.png"
              width={75}
              height={75}
              alt="Unsure"
            />
          </button>
          <div className="flex flex-row justify-between gap-4">
            <button
              onClick={() => setMood('Unhappy')}
              type="button"
              className={clsx(
                'w-[120px] h-[90px] bg-peach border-brutal rounded-md flex items-center justify-center',
                mood === 'Unhappy' ? 'shadow-none' : 'shadow-shadow'
              )}
            >
              <Image
                src="/images/voting/bad.png"
                width={75}
                height={75}
                alt="Unhappy"
              />
            </button>
            <button
              onClick={() => setMood('Miserable')}
              type="button"
              className={clsx(
                'w-[120px] h-[90px] bg-peach border-brutal rounded-md flex items-center justify-center',
                mood === 'Miserable' ? 'shadow-none' : 'shadow-shadow'
              )}
            >
              <Image
                src="/images/voting/icons8-crying2 1.png"
                width={75}
                height={75}
                alt="Miserable"
              />
            </button>
          </div>
        </div>
      );
    }
  }
  const handleMoods = handleMood(step);

  //this handles the buttons depending on the step
  function handleButtons(steps: number) {
    switch (steps) {
      case 1:
        return (
          <div className="flex flex-row justify-end w-[310px]">
            <Button size="medium" onClick={() => setStep(step + 1)}>
              Next
              <GrFormNext size={24} strokeWidth={2} />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-row justify-between w-[310px]">
            <Button
              size="small"
              variant="secondary"
              onClick={() => setStep(step - 1)}
            >
              <GrFormPrevious size={24} strokeWidth={2} />
              Back
            </Button>
            <Button
              size="medium"
              onClick={() => setStep(step + 1)}
              disabled={!anonymWatch}
            >
              Next
              <GrFormNext size={24} strokeWidth={2} />
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-row justify-between w-[310px]">
            <Button
              size="small"
              variant="secondary"
              onClick={() => setStep(step - 1)}
            >
              <GrFormPrevious size={24} strokeWidth={2} />
              Back
            </Button>
            <Button size="medium" onClick={() => setStep(step + 1)}>
              Next
              <GrFormNext size={24} strokeWidth={2} />
            </Button>
          </div>
        );
    }
  }
  const buttons = handleButtons(step);

  //this handles the footer

  function handleFooter(step: number) {
    if (step !== 4) {
      return (
        <footer className="px-8 w-[375px] container">
          <Navbar variant={'secondary'} />
        </footer>
      );
    }
    return;
  }

  const footer = handleFooter(step);

  //this handles the loading animation
  function handleLoading() {
    if (query.isLoading) {
      return (
        <Image
          src="/images/flame-dreaming-of-unicorns.gif"
          alt="loading "
          width={280}
          height={280}
        ></Image>
      );
    }
  }
  const isLoading = handleLoading();

  return {
    typeOfPoll,
    header,
    buttons,
    anonymity,
    isLoading,
    handleMoods,
    footer,
  };
}
