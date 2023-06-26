import create from 'zustand';

type Store = {
  stepIndex: number;
  setStepIndex: (stepIndex: number) => void;
};

const useStepIndexStore = create<Store>(set => ({
  stepIndex: 0,
  setStepIndex: stepIndex => set({ stepIndex }),
}));

export default useStepIndexStore;
