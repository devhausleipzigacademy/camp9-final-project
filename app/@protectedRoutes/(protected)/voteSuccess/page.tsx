import React from 'react';

import Image from 'next/image';
import Button from '@/components/shared/buttons/Button';

function VoteSuccess() {
  return (
    <div className="flex flex-col justify-between items-center">
      <h2 className="title-bold pt-4">Thank you for voting</h2>
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
      <div className="w-full h-full justify-center flex pt-12">
        <Button href="/" variant="primary" size="large">
          Next
        </Button>
      </div>
    </div>
  );
}

export default VoteSuccess;
