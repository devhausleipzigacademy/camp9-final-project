import React from 'react';
import Button from '../shared/buttons/Button';
import Image from 'next/image';

function ThankYouForVoting() {
  return (
    <div className="flex flex-col justify-between items-center">
      <h2 className="title-bold text-center pt-4">
        Nothing to see, nothing to find.
      </h2>
      <div>
        <Image
          src="/images/flame-479.gif"
          alt="Vote Sucess"
          width={280}
          height={280}
        ></Image>
      </div>
      <div>
        <p className="description text-center">Thank you for hanging around!</p>
        <p className="description-light text-center">Please stay tuned.</p>
      </div>
      <div className="w-full h-full justify-center flex pt-12">
        <Button href="/" variant="primary" size="large">
          Next
        </Button>
      </div>
    </div>
  );
}

export default ThankYouForVoting;
