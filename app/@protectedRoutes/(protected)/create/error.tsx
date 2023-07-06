'use client';

import Image from 'next/image';
import { useEffect } from 'react';

function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error in create page', error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Image
        src="/images/flame-479.gif"
        alt="Error image"
        width={280}
        height={280}
      />
      <h1 className="title-bold text-center">Woops! Something went wrong.</h1>
    </div>
  );
}

export default Error;
