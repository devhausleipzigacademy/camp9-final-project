import React from 'react';
import VotingConditionsAnonymous from './VotingConditionsA';
import VotingConditionsNon from './VotingConditionsNon';
import VotingConditionsQu from './VotingConditionsQu';
import clsx from 'clsx';

function VotingConditions(
  step: number,
  anonymity: string | undefined,
  quorum: number | undefined | null
) {
  switch (anonymity) {
    case 'Anonymous':
      return (
        <div className={clsx(step === 2 ? 'visible h-[375px]' : 'hidden')}>
          <VotingConditionsAnonymous anonymity={anonymity} />
        </div>
      );
    case 'NonAnonymous':
      return (
        <div className={clsx(step === 2 ? 'visible h-[375px]' : 'hidden')}>
          <VotingConditionsNon anonymity={anonymity} />
        </div>
      );
    case 'AnonymousUntilQuorum':
      return (
        <div className={clsx(step === 2 ? 'visible h-[375px]' : 'hidden')}>
          <VotingConditionsQu quorum={quorum} anonymity={anonymity} />
        </div>
      );
  }
}

export default VotingConditions;
