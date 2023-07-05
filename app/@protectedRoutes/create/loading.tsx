import Image from 'next/image';

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Image
        src="/images/flame-dreaming-of-unicorns.gif"
        alt="Loading image"
        width={280}
        height={280}
      />
      <h1 className="title-bold text-center">Woops! Something went wrong.</h1>
    </div>
  );
}

export default Loading;
