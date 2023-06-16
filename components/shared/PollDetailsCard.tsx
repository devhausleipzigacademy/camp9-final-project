import React, { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  note?: string;
  bodyMaxH?: string;
};

function PollDetailsCard({ title, children, note, bodyMaxH }: Props) {
  return (
    <div className="border-brutal shadow-brutal rounded-round bg-yellow-light">
      <h4 className="body-semibold bg-yellow px-3 py-[6px] border-b-[3px] border-b-black">
        {title}
      </h4>
      <div
        className={`description px-3 my-[6px] overflow-scroll`}
        style={{ maxHeight: bodyMaxH, scrollbarColor: 'red' }}
      >
        {children}
      </div>
      {note && (
        <p className=" bg-yellow small px-3 py-[6px] border-t-[3px] border-t-black">
          {note}
        </p>
      )}
    </div>
  );
}

export default PollDetailsCard;
