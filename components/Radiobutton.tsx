'use client';

import { useState } from 'react';
import { BoxCheckedProps } from './Question';
import { cva } from 'class-variance-authority';
//-translate-y-1 translate-x-1

export const Radiobutton = ({ variant }: BoxCheckedProps) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (event: {
    currentTarget: any;
    target: {
      classList: {
        toggle: any;
        remove: (arg0: string) => void;
      };
    };
  }) => {
    event.currentTarget.classList.toggle('shadow-shadow');
    setChecked(!checked);
    if(checked) {event.currentTarget.classList.remove('translate-y-1', '-translate-x-1')} else {event.currentTarget.classList.add('translate-y-1', '-translate-x-1');}
  };
  const boxclass = cva(
    [
      'w-[34px] h-[34px] flex justify-center items-center shadow-shadow rounded-round border-solid border-black border-2',
    ],
    {
      variants: {
        variant: {
          primary: 'bg-teal',
          secondary: 'bg-peach',
          tertiary: 'bg-green',
        },
      },
    }
  );

  return (
    <div type='radio' className={boxclass({ variant })} onClick={handleChange}>
      {checked ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="6" fill="#FEBF10" />
          <path
            d="M2.72626 22.4717C2.17838 22.329 1.71811 21.9018 1.53148 21.3247C1.53044 21.3078 1.52926 21.286 1.52806 21.2585C1.52014 21.077 1.51382 20.7468 1.50944 20.1141C1.50074 18.8595 1.5 16.5069 1.5 11.9962C1.5 7.48545 1.50074 5.13284 1.50944 3.87818C1.51382 3.2455 1.52014 2.9153 1.52806 2.73381C1.52915 2.70885 1.53022 2.68855 1.53119 2.67238C1.59659 2.48744 1.73908 2.21511 1.83781 2.08978C2.00758 1.87429 2.34085 1.64059 2.66948 1.5314C2.68621 1.53038 2.70768 1.52923 2.73454 1.52806C2.91611 1.52014 3.24643 1.51381 3.87929 1.50943C5.13431 1.50074 7.4876 1.5 11.9996 1.5C16.5116 1.5 18.8649 1.50074 20.1199 1.50943C20.7528 1.51381 21.0831 1.52014 21.2647 1.52806C21.2915 1.52923 21.313 1.53038 21.3297 1.5314C21.6584 1.64059 21.9916 1.87429 22.1614 2.08978C22.2601 2.21511 22.4026 2.48744 22.468 2.67238C22.469 2.68854 22.4701 2.70885 22.4711 2.73381C22.4791 2.9153 22.4854 3.2455 22.4898 3.87818C22.4985 5.13284 22.4992 7.48545 22.4992 11.9962C22.4992 12.9316 22.4994 13.7755 22.4996 14.5372C22.5006 18.1257 22.5011 19.889 22.4746 20.8105C22.4646 21.158 22.4509 21.3331 22.4431 21.4118C22.418 21.4574 22.3871 21.5153 22.3534 21.5852L23.7043 22.237L22.3534 21.5852C22.1647 21.9763 21.8198 22.2936 21.3399 22.4607C21.3257 22.4615 21.3089 22.4624 21.2892 22.4633C21.1082 22.4712 20.7779 22.4777 20.1476 22.4826C18.8975 22.4921 16.5579 22.4947 12.0902 22.4981C8.12852 22.5011 5.77977 22.5009 4.39634 22.4946C3.70299 22.4914 3.26183 22.4867 2.98457 22.4803C2.84 22.477 2.76094 22.4732 2.72626 22.4717ZM2.79292 22.4875C2.79298 22.4875 2.79304 22.4875 2.7931 22.4875L2.79292 22.4875Z"
            fill="#FEBF10"
            stroke="black"
            stroke-width="3"
          />
        </svg>
      ) : (
        <svg
          className="w-10 h-6"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="" fill="black" stroke="black" strokeWidth="2" />
        </svg>
      )}
    </div>
  );
};

export default Radiobutton;
