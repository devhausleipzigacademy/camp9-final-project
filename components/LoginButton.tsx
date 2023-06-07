import Button from './Button';

export default function LoginButton() {
  return (
    <Button
      active={true}
      href="/"
      className="p-4"
      children={'Log In'}
      enable={true}
      bgColor={'bg-yellow'}
      width="w-full"
    />
  );
}
