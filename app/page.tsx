import { Questionbox } from 'components/Question';
import Image from 'next/image';
import GroupIllustration from '/public/images/Illustr_group_voting.png';
import Button from 'components/shared/buttons/Button';
import React from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

export default function LandingPage() {
  return (
    <div className="">
      <h1 className="logo">d'accord</h1>
      <Image
        src={GroupIllustration}
        alt="illustratio of a group of people making decisions"
        placeholder='blur'
      />
      <div className="text-white text-center text-lg font-medium">Vote secretly, reveal conditionally</div>
      
      <Button
  
  size="full"
  variant="secondary"
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
  );
}
