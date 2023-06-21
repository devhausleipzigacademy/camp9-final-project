'use client';
import React from 'react';

function error(error: Error) {
  return (
    <div className="mt-2">
      <h4 className="body-semibold">Error!</h4>
      <p className="body">{error.message}</p>
    </div>
  );
}

export default error;
