import React from 'react';
import Image from 'next/image';

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src="/images/flame-dreaming-of-unicorns.gif"
        alt="loading "
        width={280}
        height={280}
      ></Image>
      <h1 className="title-bold">Loading...</h1>
    </div>
  );
}

export default Loading;
