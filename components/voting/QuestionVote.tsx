import React from 'react';

interface QuestionVoteProps {
  description: string | undefined | null;
  question: string | undefined;
}

function QuestionVote(props: QuestionVoteProps) {
  return (
    <div>
      <h1 className="title-bold text-left pt-4 pb-4">Question</h1>
      <div className="questionVote w-full h-auto p-2 border-3 border-solid border-black bg-peach rounded-md">
        <h3>{props.question}</h3>
      </div>
      {props.description && (
        <div className="h-[278px] pt-8">
          <h2 className="description-semibold">Description:</h2>
          <div className="overflow-y-auto h-auto scrollbar">
            <p className="description-light text-justify">
              {props.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionVote;
