'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { VotePoll } from '@/types/voting/VotingSchema';

function VotingFeedback() {
  //this needs to be changed to a ref or Zustand
  const [mood, setMood] = useState<string>('');
  const { register } = useFormContext<VotePoll>();

  return (
    <div className="flex flex-col flex-wrap justify-center items-center gap-3">
      <h2 className="title-bold text-center">Give us your Feedback</h2>
      <p className="description text-center">
        How do you feel about the question you answered and/or skipped?
      </p>
      <p className="small text-center">
        Please select the mood that best describes how you felt: interested,
        indifferent, confused, annoyed, etc.
      </p>

      <div className="flex flex-row justify-between gap-4">
        <button
          {...register('mood')}
          onClick={() => setMood('Beaming')}
          value="Beaming"
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
          {...register('mood')}
          onClick={() => setMood('Happy')}
          value="Happy"
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
        {...register('mood')}
        onClick={() => setMood('Unsure')}
        value="Unsure"
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
          {...register('mood')}
          onClick={() => setMood('Unhappy')}
          value="Unhappy"
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
          {...register('mood')}
          onClick={() => setMood('Miserable')}
          value="Miserable"
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

export default VotingFeedback;
