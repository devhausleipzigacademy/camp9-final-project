import React, { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
};

function PollDetailsCard({ title, children }: Props) {
  return (
    <div className="border-brutal shadow-brutal rounded-round bg-yellow-light">
      <h4 className="body-semibold bg-yellow px-3 py-[6px] border-b-[3px] border-b-black">
        {title}
      </h4>
      <p className="description px-3 py-[6px]">{children}</p>
    </div>
  );
}

export default PollDetailsCard;
