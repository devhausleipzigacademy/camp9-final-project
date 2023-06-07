import Button from './Button';

export default function LoginButton() {
  return (
    <Button
      backgroundColor={'bg-yellow'}
      children={'Log In'}
      enable={false}
      href="/"
      padding="p-4"
      width="w-full"
    />
  );
}
