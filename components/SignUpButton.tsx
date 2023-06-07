import Button from './Button';

export default function SignUpButton() {
  return (
    <Button
      bgColor={'bg-teal'}
      children={'Sign Up'}
      enable={true}
      href="/"
      width="w-full"
      padding={'p-4'}
    />
  );
}
