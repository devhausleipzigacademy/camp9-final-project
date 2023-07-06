import React from 'react';

function loading() {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <img
        src="/images/flame-dreaming-of-unicorns.gif"
        className="w-[280px]"
      ></img>
      <h3 className="title-bold">Loading...</h3>
    </div>
  );
}

export default loading;
