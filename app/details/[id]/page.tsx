import PollDetailsCard from 'components/PollDetailsCard';
import PreviewCheckbox from 'components/PreviewCheckbox';
import React from 'react';

function PollDetails() {
  return (
    <section className="px-8 py-10 bg-yellow h-[667px]">
      <h1 className="title-black">Poll Details</h1>
      <div className="mt-3 flex flex-col gap-4">
        <PollDetailsCard title="Poll Question">Question</PollDetailsCard>
        <PollDetailsCard title="Poll Description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
          sapiente adipisci doloremque quam esse sed reiciendis dolorum deleniti
          tempore ullam quidem nemo ad ex ducimus earum, ipsa nihil debitis
          distinctio.
        </PollDetailsCard>
        <PollDetailsCard title="Your vote">
          <ul className="flex flex-col gap-1">
            <li className="flex gap-2">
              <PreviewCheckbox isChecked={true} />
              <p>voting option A</p>
            </li>
            <li className="flex gap-2">
              <PreviewCheckbox />
              <p>voting option B</p>
            </li>
            <li className="flex gap-2">
              <PreviewCheckbox />
              <p>voting option C</p>
            </li>
          </ul>
        </PollDetailsCard>
      </div>
    </section>
  );
}

export default PollDetails;
