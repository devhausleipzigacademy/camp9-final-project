import Image from 'next/image';
import GroupIllustration from '/public/images/Illustr_group_voting.png';
import Button from 'components/shared/buttons/Button';
import React from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <h1 className="landing-logo">d'accord</h1>
      <div>
        <Image
          src={GroupIllustration}
          alt="illustration of a group of people making decisions"
          placeholder='blur'
        />
        <div className="text-white text-center text-xl font-medium my-3">Vote secretly, reveal conditionally</div>
        
      </div>
      <div className='w-full'>
        <Link href="/signup" >
          <Button
          
            size="full"
            variant="secondary"
            className='my-4'
          >
            Sign up
          </Button>
        </Link>
        <Link href="/login ">
          <Button
          
            size="full"
            variant="primary"
          >
            <React.Fragment key=".0">
              <h3>
          Login
              </h3>
              <HiOutlineArrowNarrowRight
          size={25}
          strokeWidth={2}
              />
            </React.Fragment>
          </Button>
        </Link>
            </div>
      </>
  );
}
