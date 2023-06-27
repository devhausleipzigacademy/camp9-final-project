import { ReactElement, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';
import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import useStore from '@/utils/store';

export function useMultiStepForm(
  steps: ReactElement[],
  methods: UseFormReturn<CreateNewPoll, any, undefined>
) {
  const store = useStore();

  const router = useRouter();

  async function next() {
    const fields = methods.watch();
    const keys = Object.keys(fields);
    const isStepValid = await methods.trigger(keys as any);
    if (!isStepValid) {
      return;
    }
    store.setStepIndex(store.stepIndex + 1);
  }

  async function back() {
    const fields = methods.watch();
    const keys = Object.keys(fields);
    const isStepValid = await methods.trigger(keys as any);
    if (store.stepIndex === 0) {
      router.back();
    }
    if (!isStepValid) {
      return;
    }
    store.setStepIndex(store.stepIndex - 1);
  }

  return {
    currentStepIndex: store.stepIndex,
    step: steps[store.stepIndex],
    steps,
    next,
    back,
    isLastStep: store.stepIndex === steps.length - 1,
  };
}
