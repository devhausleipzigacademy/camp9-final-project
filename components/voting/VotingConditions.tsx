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
        <VotingConditionsAnonymous anonymity={anonymity} />
      </div>
    );
  }
  if (anonymity === 'NonAnonymous') {
    return (
      <div>
        <VotingConditionsNon anonymity={anonymity} />
      </div>
    );
  }
  return (
    <div>
      <VotingConditionsQu quorum={quorum} anonymity={anonymity} />
    </div>
  );
}

export default VotingConditions;
