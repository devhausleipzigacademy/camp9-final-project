import Button from './Button';

export default function SignUpButton() {
  return (
    <Button
      backgroundColor={'bg-teal'}
      children={'Sign Up'}
      enable={true}
      href="/"
      width="w-full"
      padding={'p-4'}
    />
  );
}
