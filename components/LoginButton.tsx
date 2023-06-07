import Button from './Button';

export default function LoginButton() {
  return (
    <Button
      bgColor={'bg-yellow'}
      children={'Log In'}
      enable={true}
      href="/"
      padding="p-4"
      width="w-full"
    />
  );
}
