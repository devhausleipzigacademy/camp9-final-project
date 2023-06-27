import { Dialog, Transition } from '@headlessui/react';
import { useState } from 'react';
import Image from 'next/image';
import PollDetailsCard from './shared/PollDetailsCard';
import Button from './shared/buttons/Button';

type ModalProps = {
  children: React.ReactNode | React.ReactNode[];
  className: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalResults({
  children,
  className,
  isOpen,
  setIsOpen,
}: ModalProps) {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeModal}
        open={isOpen}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className={className}>
              {children}
              <Button
                type="button"
                className='mt-4 self-center'
                // className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
                variant="secondary"
                size='medium'
              >
                Back
              </Button>
              {/* <button>Back</button> */}
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
