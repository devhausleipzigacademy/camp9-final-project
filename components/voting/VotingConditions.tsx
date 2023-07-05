import React from 'react';
import VotingConditionsAnonymous from './VotingConditionsA';
import VotingConditionsNon from './VotingConditionsNon';
import VotingConditionsQu from './VotingConditionsQu';
import clsx from 'clsx';

type VotingConditionsProps = {
  anonymity: string | undefined;
  quorum: number | undefined | null;
};

function VotingConditions({ anonymity, quorum }: VotingConditionsProps) {
  if (anonymity === 'Anonymous') {
    return (
      <div>
        <h1 className="title-bold text-left pt-4 pb-4">Voting Conditions</h1>
        <VotingConditionsAnonymous anonymity={anonymity} />
      </div>
    );
  }
  if (anonymity === 'NonAnonymous') {
    return (
      <div>
        <h1 className="title-bold text-left pt-4 pb-4">Voting Conditions</h1>
        <VotingConditionsNon anonymity={anonymity} />
      </div>
    );
  }
  return (
    <div>
      <h1 className="title-bold text-left pt-4 pb-4">Voting Conditions</h1>
      <VotingConditionsQu quorum={quorum} anonymity={anonymity} />
    </div>
  );
}

export default VotingConditions;
