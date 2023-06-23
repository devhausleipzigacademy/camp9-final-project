
import { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';

export function useMultiStepForm(
  steps: ReactElement[],
  methods: UseFormReturn<CreateNewPoll, any, undefined>
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const router = useRouter();


  async function next() {
    const fields = methods.watch();
    const keys = Object.keys(fields);
    const isStepValid = await methods.trigger(keys as any);
    if (!isStepValid) {
      return;
    }
    setCurrentStepIndex(i => {
      if (i >= steps.length) {
        return i;
      }

      return i + 1;
    });
  }

  async function back() {
    const fields = methods.watch();
    const keys = Object.keys(fields);
    const isStepValid = await methods.trigger(keys as any);
    if (currentStepIndex === 0) {
      router.back();
    }
    if (!isStepValid) {
      return;
    }
    setCurrentStepIndex(currentStepIndex - 1);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    next,
    back,
    isLastStep: currentStepIndex === steps.length - 1,
  };
}
