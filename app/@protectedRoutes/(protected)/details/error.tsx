'use client';
import React from 'react';

function error(error: Error) {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <img src="/images/flame-479.gif" className="w-[280px]"></img>
      <h1 className="title-bold text-center">Woops! Something went wrong.</h1>
    </div>
  );
}

export default error;
