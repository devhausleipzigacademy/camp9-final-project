import Image from 'next/image';

function loading() {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Image
        src="/images/flame-dreaming-of-unicorns.gif"
        className="w-[280px]"
        alt="Loading image"
      />
      <h1 className="title-bold text-center">Woops! Something went wrong.</h1>
    </div>
  );
}

export default loading;

