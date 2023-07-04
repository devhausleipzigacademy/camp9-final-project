import { create } from 'zustand';

type Store = {
  stepIndex: number;
  setStepIndex: (stepIndex: number) => void;
  increaseStepIndex: () => void;
  decreaseStepIndex: () => void;
};

const useStepIndexStore = create<Store>(set => ({
  stepIndex: 0,
  increaseStepIndex: () => set(state => ({ stepIndex: state.stepIndex + 1 })),
  decreaseStepIndex: () => set(state => ({ stepIndex: state.stepIndex - 1 })),
  setStepIndex: stepIndex => set({ stepIndex }),
}));

export default useStepIndexStore;
