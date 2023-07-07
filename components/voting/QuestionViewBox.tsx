'use client';

import React, { useState } from 'react';
import Questionbox from '../Question';
import Button from '../shared/buttons/Button';
import clsx from 'clsx';

type Props = {
  question: string;
};

function QuestionViewBox({ question }: Props) {
  const [showPopUp, setShowPopUp] = useState(false);

  const initialText =
    question.length >= 50 ? `${question.slice(0, 50)}...` : question;
  return (
    <div className="h-[70px]">
      <div
        className={clsx(
          'bg-peach-light ml-1 mr-[7px] shadow-shadow rounded-round p-2 flex flex-row justify-start items-center border-solid border-black border-2 mb-5',
          showPopUp ? 'h-auto z-50 fixed w-[300px]' : 'h-[70px]'
        )}
        onClick={() => {
          if (question.length <= 50) return;
          setShowPopUp(!showPopUp);
        }}
      >
        {showPopUp ? question : initialText}
      </div>
    </div>
  );
}

export default QuestionViewBox;
