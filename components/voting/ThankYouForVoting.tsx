import React from 'react';
import Button from '../shared/buttons/Button';
import Image from 'next/image';

function ThankYouForVoting() {
  return (
    <div className="flex flex-col justify-between items-center gap-10">
      <h2 className="title-bold">Thank you for voting</h2>
      <div>
        <Image
          src="/images/flame-success.gif"
          alt="Vote Sucess"
          width={280}
          height={280}
        ></Image>
      </div>
      <div>
        <p className="description text-center">
          Your vote has been successfully submitted.
        </p>
        <p className="description-light text-center">
          The results of the voting will be announced soon. Please stay tuned.
        </p>
      </div>
      <Button href="/" variant="primary" size="large">
        Next
      </Button>
    </div>
  );
}

export default ThankYouForVoting;
