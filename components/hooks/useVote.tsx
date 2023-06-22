import { Anonymity, Poll, PollType } from '@prisma/client';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import Questionbox from '../Question';
import Button from '../shared/buttons/Button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import Radio from '../Radiobutton';
import { Checkboxinput } from '../CheckboxInput';

interface SideKickProps {
  query: UseQueryResult<AxiosResponse<Poll, any>, unknown>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export function superSidekickHoock({ query, step, setStep }: SideKickProps) {
  function handlePollInformation(
    type: PollType | undefined,
    options: string[] | undefined
  ) {
    if (type === 'SingleChoice') {
      return (
        <fieldset className={clsx(step === 3 ? 'visible' : 'hidden')}>
          {options?.map(option => (
            <Questionbox key={'1'} variant="secondary">
              <Radio
                variant="primary"
                id={option}
                name="option"
                value={option}
              />
              <label className="w-[228px]" htmlFor={option}>
                {option}
              </label>
            </Questionbox>
          ))}
        </fieldset>
      );
    } else if (type === 'MultipleChoice') {
      return (
        <fieldset className={clsx(step === 3 ? 'visible' : 'hidden')}>
          {options?.map(option => (
            <Questionbox key={'2'} variant="secondary">
              <Checkboxinput
                variant="primary"
                id={option}
                name="option"
                value={option}
              />
              <label className="w-[228px]" htmlFor={option}>
                {option}
              </label>
            </Questionbox>
          ))}
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
        return 'Voting conditions';
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
            <div className="flex flex-row justify-between">
              <label htmlFor="anonymity" className="body-semibold">
                {query.data?.data.anonymity}
              </label>
              <input type="checkbox" id="anonymity" className="checkmarkBox" />
            </div>
            <p className="description">No username will be revealed</p>
          </fieldset>
        );
      case 'NonAnonymous':
        return (
          <fieldset className={clsx(step === 2 ? 'visible' : 'hidden')}>
            <div className="flex flex-row justify-between">
              <label htmlFor="anonymity" className="body-semibold">
                {query.data?.data.anonymity}
              </label>
              <input type="checkbox" id="anonymity" className="checkmarkBox" />
            </div>
            <p className="description">
              The usernames and their votes will be revealed at the end of the
              voting period.
            </p>
          </fieldset>
        );
      case 'AnonymousUntilQuorum':
        return (
          <fieldset className={clsx(step === 2 ? 'visible' : 'hidden')}>
            <div className="flex flex-row justify-between">
              <label htmlFor="anonymity" className="body-semibold">
                {query.data?.data.anonymity}
              </label>
              <input type="checkbox" id="anonymity" className="checkmarkBox" />
            </div>
            <p className="description">
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
  return { typeOfPoll, header, buttons, anonymity };
}
