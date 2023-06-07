import Button from './Button';

export default function SignUpButton() {
  return (
    <Button
      active={true}
      href="/"
      className="p-4"
      children={'Sign Up'}
      enable={true}
      bgColor={'bg-teal'}
      width="w-full"
    />
  );
}
