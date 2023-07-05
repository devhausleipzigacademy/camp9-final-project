import Image from 'next/image';

function error() {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Image
        src="/images/flame-479.gif"
        className="w-[280px]"
        alt="Error image"
      />
      <h1 className="title-bold text-center">Woops! Something went wrong.</h1>
    </div>
  );
}

export default error;
