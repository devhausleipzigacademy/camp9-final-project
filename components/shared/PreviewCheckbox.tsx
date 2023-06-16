import React from 'react';

type Props = {
  isChecked?: boolean;
  type: 'radio' | 'check';
};

function PreviewCheckbox({ isChecked = false, type }: Props) {
  if (isChecked) {
    return (
      <div className="w-4 h-4 pt-[2px]">
        {type === 'check' ? (
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="6" fill="#BCBCBC" />
            <path
              d="M5.33333 2C3.47693 2 2 3.47693 2 5.33333V18.6667C2 20.5231 3.47693 22 5.33333 22H18.6667C20.5231 22 22 20.5231 22 18.6667V7.2381L21.0476 8.33929V18.6667C21.0476 20.0004 20.0004 21.0476 18.6667 21.0476H5.33333C3.99963 21.0476 2.95238 20.0004 2.95238 18.6667V5.33333C2.95238 3.99963 3.99963 2.95238 5.33333 2.95238H17.9077L18.6667 2H5.33333ZM20.6905 3.78571L11.4792 14.6488L7.61012 11.0327L6.95536 11.7321L11.1964 15.6756L11.5685 16.0179L11.881 15.6458L21.4048 4.39583L20.6905 3.78571Z"
              fill="black"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" rx="6" fill="#BCBCBC" />
            <path
              d="M5.33333 2C3.47693 2 2 3.47693 2 5.33333V18.6667C2 20.5231 3.47693 22 5.33333 22H18.6667C20.5231 22 22 20.5231 22 18.6667V7.2381L21.0476 8.33929V18.6667C21.0476 20.0004 20.0004 21.0476 18.6667 21.0476H5.33333C3.99963 21.0476 2.95238 20.0004 2.95238 18.6667V5.33333C2.95238 3.99963 3.99963 2.95238 5.33333 2.95238H17.9077L18.6667 2H5.33333Z"
              fill="black"
              stroke="black"
              strokeWidth="2"
            />

            <rect width="12" height="12" rx="2" x="6" y="6" fill="#000" />
          </svg>
        )}
      </div>
    );
  } else {
    return (
      <div className="w-4 h-4 pt-[2px]">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="6" fill="#BCBCBC" />
          <path
            d="M5.33333 2C3.47693 2 2 3.47693 2 5.33333V18.6667C2 20.5231 3.47693 22 5.33333 22H18.6667C20.5231 22 22 20.5231 22 18.6667V7.2381L21.0476 8.33929V18.6667C21.0476 20.0004 20.0004 21.0476 18.6667 21.0476H5.33333C3.99963 21.0476 2.95238 20.0004 2.95238 18.6667V5.33333C2.95238 3.99963 3.99963 2.95238 5.33333 2.95238H17.9077L18.6667 2H5.33333Z"
            fill="black"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }
}

export default PreviewCheckbox;
