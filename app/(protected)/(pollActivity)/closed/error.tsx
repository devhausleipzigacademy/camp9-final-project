'use client';

import React from 'react';

function Error() {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src="/images/flame-479.gif" className="w-[280px]"></img>
      <h1 className="title-bold text-center">Woops! Something went wrong.</h1>
    </div>
  );
}

export default Error;
