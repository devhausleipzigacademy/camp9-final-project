import { Questionbox } from 'components/Question';
import Image from 'next/image';
import GroupIllustration from '/public/images/Illustr_group_voting.png';
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
    </div>
  );
}
