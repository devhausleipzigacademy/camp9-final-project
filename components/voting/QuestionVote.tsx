import clsx from 'clsx';
import React from 'react';

interface QuestionVoteProps {
  description: string | undefined | null;
  question: string | undefined;
}

function QuestionVote(props: QuestionVoteProps) {
  return (
    <div>
      <div
        className={clsx(
          props.description && props.question?.length! >= 100
            ? 'max-h-[150px] w-[310px] overflow-y-auto scrollbarteal'
            : 'w-full',
          !props.description && props.question?.length! >= 100
            ? 'max-h-[380px] w-[310px] overflow-y-auto scrollbarteal'
            : 'w-full',
          props.description?.length! >= 373 && props.question?.length! >= 100
            ? 'max-h-[100px] w-[310px] overflow-y-auto scrollbarteal'
            : 'w-full'
        )}
      >
        <div className="questionVote p-2 border-3 border-solid border-black bg-peach rounded-md mr-2">
          <h3>{props.question}</h3>
        </div>
      </div>
      {props.description && (
        <div className="h-[278px] pt-4">
          <h2 className="description-semibold">Description:</h2>
          <div
            className={clsx(
              props.description?.length! >= 373 && props.question?.length! >= 55
                ? 'max-h-[250px] w-[310px] overflow-y-auto scrollbarteal'
                : 'max-h-[280px] w-[310px] overflow-y-auto scrollbarteal'
            )}
          >
            <p className="description-light text-justify mr-4">
              {props.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionVote;
