import { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { Prisma } from '@prisma/client';

export function useMultiStepForm(
  steps: ReactElement[],
  methods: UseFormReturn<
    Omit<Prisma.PollCreateInput, 'creator'>,
    any,
    undefined
  >
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const router = useRouter();

  async function next() {
    const fields = methods.watch();
    const keys = Object.keys(fields);
    const isStepValid = await methods.trigger(keys as any);
    if (!isStepValid) return;
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) {
        return i;
      }

      return i + 1;
    });
  }

  function back() {
    if (currentStepIndex === 0) {
      router.back();
    }
    setCurrentStepIndex(currentStepIndex - 1);
  }

  // function back() {
  //   setCurrentStepIndex(i => {
  //     if (i <= 0) {
  //       return i;
  //     }
  //     return i - 1;
  //   });
  // }

  function goTo(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    goTo,
    next,
    back,
    isFirstStep: currentStepIndex !== 0,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}
function trigger() {
  throw new Error('Function not implemented.');
}
