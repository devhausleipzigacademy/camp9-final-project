import { Questionbox } from 'components/Question';
import Image from 'next/image';
import GroupIllustration from '/public/images/Illustr_group_voting.png';
import Button from 'components/shared/buttons/Button';
import React from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Router } from 'next/router';
import {useRouter} from 'next/router'

export default function LandingPage() {
  return (
    <>
      <h1 className="logo">d'accord</h1>
      <div>
        <Image
          src={GroupIllustration}
          alt="illustratio of a group of people making decisions"
          placeholder='blur'
        />
        <div className="text-white text-center text-xl font-medium my-3">Vote secretly, reveal conditionally</div>
        
      </div>
      <div className='w-full'>
        <Button
          
          size="full"
          variant="secondary"
          className='my-4'
        >
          Sign up
        </Button>
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
            </div>
      </>
  );
}
