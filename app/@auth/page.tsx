'use client';
import Image from 'next/image';
import applogo from '/public/images/logoApp.png';
import Button from 'components/shared/buttons/Button';
import React from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="grid justify-center h-screen  bg-teal px-8 pt-8 overflow-y-hidden">
      <h1 className="appName">d'accord</h1>
      <div>
        <Image
          src={applogo}
          alt="illustration of a group of people making decisions"
        />
        <div className="text-black text-center text-xl font-semibold my-3">
          Vote secretly, reveal conditionally
        </div>
      </div>
      <div className="w-full">
        <Link href="/signup">
          <Button size="full" variant="secondary" className="my-4">
            Sign up
          </Button>
        </Link>
        <Link href="/login">
          <Button size="full" variant="primary">
            <React.Fragment key=".0">
              <h3>Login</h3>
              <HiOutlineArrowNarrowRight size={25} strokeWidth={2} />
            </React.Fragment>
          </Button>
        </Link>
      </div>
    </div>
  );
}
