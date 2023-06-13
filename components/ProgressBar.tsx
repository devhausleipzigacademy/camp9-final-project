export default function ProgressBar() {
  const page = Math.floor(Math.random() * 5) + 1;

  const getWidth = () => {
    const widths = ['w-1/5', 'w-2/5', 'w-3/5', 'w-4/5', 'w-full'];
    return widths[page - 1];
  };

  const width = getWidth();
  const classes = `z-10 border-2 border-red absolute top-0 ${width}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h3>Progress</h3>
        <p>{`page ${page} of 5`}</p>
      </div>
      <div className="relative">
        <hr className="border-2 border-black" />
        <hr className={classes} />
      </div>
    </div>
  );
}
