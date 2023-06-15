'use client'

import { signIn } from 'next-auth/react';
import React from 'react';

function TestButton() {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </button>
  );
}

export default TestButton;
