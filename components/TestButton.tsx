'use client'

import { signIn } from 'next-auth/react';
import React from 'react';

function TestButton() {
  return <button onClick={() => signIn()}>signin</button>;
}

export default TestButton;
