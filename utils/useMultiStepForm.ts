'use client';

import { ReactElement, useState } from 'react';

export function useMultiStepForm(steps: ReactElement[]) {
  const [currentSepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex(i => {
      if (i > steps.length - 1) {
        return i;
      }
      return i + 1;
    });
  }

  function back() {
    setCurrentStepIndex(i => {
      if (i <= 0) {
        return i;
      }
      return i - 1;
    });
  }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentSepIndex,
    step: steps[currentSepIndex],
    goTo,
    next,
    back,
  };
}
