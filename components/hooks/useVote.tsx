import { Anonymity, Poll, PollType } from '@prisma/client';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import Questionbox from '../Question';
import Button from '../shared/buttons/Button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Radio from '../Radiobutton';
import { Checkboxinput } from '../CheckboxInput';
import Image from 'next/image';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface CheckAndRadio extends FieldValues {
  checkbox: string;
  radio: string;
}

interface SideKickProps {
  query: UseQueryResult<AxiosResponse<Poll, any>, unknown>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  register: UseFormRegister<CheckAndRadio>;
}

export function superSidekickHoock({
  query,
  step,
  setStep,
  register,
}: SideKickProps) {
  function handlePollInformation(
    type: PollType | undefined,
    options: string[] | undefined
  ) {
    if (type === 'SingleChoice') {
      return (
        <fieldset className={clsx(step === 3 ? 'visible' : 'hidden')}>
          <p className="small leading-3">Single choice, select only one</p>
          <div className="overflow-y-auto  h-[360px] scrollbarteal">
            {options?.map(option => (
              <Questionbox key={'1'} variant="secondary">
                <Radio
                  variant="primary"
                  id={option}
                  name="option"
                  value={option}
                  type="radio"
                />
                <label className="w-[228px]" htmlFor={option}>
                  {option}
                </label>
              </Questionbox>
            ))}
            <Questionbox variant="secondary">
              <Radio
                variant="secondary"
                id="option"
                name="option"
                value="option"
                type="radio"
              />
              <label className="w-[228px] text-center" htmlFor="abstain">
                Abstain
              </label>
            </Questionbox>
          </div>
        </fieldset>
      );
    } else if (type === 'MultipleChoice') {
      return (
        <fieldset className={clsx(step === 3 ? 'visible' : 'hidden')}>
          <p className="small small leading-10 ml-2">
            {' '}
            Multi choice, select many as you want
          </p>
          <div className="overflow-y-auto  h-[360px] scrollbarteal">
            {options?.map(option => (
              <Questionbox key={option} variant="secondary">
                <Checkboxinput
                  variant="primary"
                  id={option}
                  name="option"
                  value={option}
                  type="checkbox"
                />
                <label className="w-[228px]" htmlFor={option}>
                  {option}
                </label>
              </Questionbox>
            ))}

            <Questionbox variant="secondary" desabled>
              <Checkboxinput
                variant="primary"
                id="abstain"
                name="option"
                value="option"
                type="checkbox"
              />
              <label className="w-[228px] text-center" htmlFor="abstain">
                Abstain
              </label>
            </Questionbox>
          </div>
        </fieldset>
      );
    }
  }
  const typeOfPoll = handlePollInformation(
    query.data?.data.type,
    query.data?.data.options
  );

  function headerDisplay(steps: number) {
    switch (steps) {
      case 1:
        return 'Question';
      case 2:
        return 'Voting Conditions';
      case 3:
        return 'Voting';
      case 4:
        return 'Thanks for voting';
    }
  }
  const header = headerDisplay(step);

  function handleAnonymous(
    step: number,
    anonymity: Anonymity | undefined,
    quorum: number | undefined | null
  ) {
    switch (anonymity) {
      case 'Anonymous':
        return (
          <fieldset className={clsx(step === 2 ? 'visible' : 'hidden')}>
            <p className="small mb-2 mt-4">
              <span className="small-bold">Please check</span> you understand
              the poll conditions
            </p>
            <div className="flex flex-row justify-between">
              <label htmlFor="anonymity" className="body-semibold">
                Full anonymity
              </label>
              <Checkboxinput
                variant="primary"
                id="anonymity"
                value="anonymity"
                type="checkbox"
                {...register('checkbox', {
                  onChange(event) {
                    console.log(event.target.value);
                  },
                })}
              />
            </div>
            <p className="description-light">No username will be revealed</p>
          </fieldset>
        );
      case 'NonAnonymous':
        return (
          <fieldset className={clsx(step === 2 ? 'visible' : 'hidden')}>
            <p className="small mb-2 mt-4">
              <span className="small-bold">Please check</span> you understand
              the poll conditions
            </p>
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="anonymity" className="body-semibold">
                No Anonymity
              </label>
              <Checkboxinput
                type="checkbox"
                variant="primary"
                id="checkbox"
                value="nonanonymity"
                {...register('checkbox', {
                  onChange(event) {
                    console.log(event.target.value);
                  },
                })}
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
          <fieldset className={clsx(step === 2 ? 'visible' : 'hidden')}>
            <p className="small mb-2 mt-4">
              <span className="small-bold">Please check</span> you understand
              the poll conditions
            </p>
            <div className="flex flex-row justify-between items-center">
              <label htmlFor="anonymity" className="body-semibold">
                Anonymity until quorum
              </label>
              <Checkboxinput
                type="checkbox"
                variant="primary"
                id="anonymityuntilquorum"
                value="anonymityuntilquorum"
                {...register('checkbox', {
                  onChange(event) {
                    console.log(event);
                  },
                })}
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

  function handleButtons(steps: number) {
    switch (steps) {
      case 1:
        return (
          <div className="flex flex-row justify-between fixed container bottom-28 w-[310px]">
            <Button size="small" disabled={true} onClick={() => setStep(1)}>
              Back
            </Button>
            <Button size="medium" onClick={() => setStep(step + 1)}>
              Next
              <GrFormNext size={24} strokeWidth={2} />
            </Button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-row justify-between fixed container bottom-28 w-[310px]">
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
      case 3:
        return (
          <div className="flex flex-row justify-between fixed container bottom-28 w-[310px]">
            <Button
              size="small"
              variant="secondary"
              onClick={() => setStep(step - 1)}
            >
              <GrFormPrevious size={24} strokeWidth={2} />
              Back
            </Button>
          </div>
        );
    }
  }
  const buttons = handleButtons(step);

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

  return { typeOfPoll, header, buttons, anonymity, isLoading };
}
