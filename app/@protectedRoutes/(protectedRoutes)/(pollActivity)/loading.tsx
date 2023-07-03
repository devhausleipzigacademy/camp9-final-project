import React from 'react';

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <img
        src="/images/flame-dreaming-of-unicorns.gif"
        className="w-[280px]"
      ></img>
      <h1 className="title-bold">Loading...</h1>
    </div>
  );
}

export default Loading;
