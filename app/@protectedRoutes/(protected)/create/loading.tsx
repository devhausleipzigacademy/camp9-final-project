import Image from 'next/image';

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen  bg-teal">
      <Image
        src="/images/flame-dreaming-of-unicorns.gif"
        alt="Loading image"
        width={280}
        height={280}
      />
      <h1 className="title-bold text-center">Loading...</h1>
    </div>
  );
}

export default Loading;
