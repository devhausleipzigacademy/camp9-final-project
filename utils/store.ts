import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import { create } from 'zustand';

type StepStore = {
  stepIndex: number;
  setStepIndex: (stepIndex: number) => void;
  increaseStepIndex: () => void;
  decreaseStepIndex: () => void;
};

const useStepIndexStore = create<StepStore>(set => ({
  stepIndex: 0,
  increaseStepIndex: () => set(state => ({ stepIndex: state.stepIndex + 1 })),
  decreaseStepIndex: () => set(state => ({ stepIndex: state.stepIndex - 1 })),
  setStepIndex: stepIndex => set({ stepIndex }),
}));

export default useStepIndexStore;

// type FormStore = {
//   formData: CreateNewPoll;
//   setFormData: (data: CreateNewPoll) => void;
//   clearFormData: () => void;
// };

// const initialState: FormStore = {
//   formData: {
//     question: '',
//     options: [{ option: '' }],
//     type: 'MultipleChoice',
//     endDateTime: new Date(),
//     anonymity: 'AnonymousUntilQuorum',
//     participants: [],
//     description: undefined,
//     quorum: '80',
//   },
//   setFormData: () => {}, // Update the initial state definition
//   clearFormData: () => {},
// };

// const loadLocalStorageData = (): CreateNewPoll | null => {
//   try {
//     const data = localStorage.getItem('formData');
//     if (data) {
//       return JSON.parse(data);
//     }
//   } catch (error) {
//     console.error('Error loading data from local storage:', error);
//   }
//   return null;
// };

// export const useFormDataStore = create<FormStore>(set => ({
//   formData: loadLocalStorageData() || initialState.formData,
//   setFormData: data => {
//     set(state => ({ formData: { ...state.formData, ...data } })); // Update the form data
//     localStorage.setItem('formData', JSON.stringify(data));
//   },
//   clearFormData: () => {
//     set({ formData: initialState.formData });
//     localStorage.removeItem('formData');
//   },
// }));
