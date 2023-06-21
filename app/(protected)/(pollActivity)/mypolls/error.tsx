'use client';
import Image from 'next/image';

import React from 'react';

function Error() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src="/images/flame-479.gif"
        alt="error"
        width={280}
        height={280}
      ></Image>
      <h1 className="title-bold text-center">Woops! Something went wrong.</h1>
    </div>
  );
}

export default Error;
