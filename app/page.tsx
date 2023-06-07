import Button from '@/components/Button';

export default function Home() {
  return (
    <body className="px-8 flex items-center flex-col ">
      <h1 className="text-3xl text-center text-yellow-900">Consensus App </h1>
      <Button
        href="/login"
        className="border-3 border-black rounded w-full flex flex-col p-4 justify-between bg-yellow shadow-brutalist gap-2"
        children={'Button'}
      />
    </body>
  );
}
