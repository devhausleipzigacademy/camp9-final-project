import React from 'react';
import { HiPlay } from 'react-icons/hi2';
import {
  MdSentimentDissatisfied,
  MdSentimentNeutral,
  MdSentimentSatisfied,
  MdSentimentVeryDissatisfied,
  MdSentimentVerySatisfied,
} from 'react-icons/md';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  averageMood: number; //a floating point number between 0 and 4
}

function MoodDisplay({ averageMood, ...props }: Props) {
  // sets the pointer to a percentage position, otherwise caps the pointer to either start or end point
  let pointerPosition;
  let pointerColorValue;
  if (averageMood === -1) {
    pointerColorValue = -1;
    pointerPosition = 0;
  } else {
    // sets the value for emoji and pointer color}
    if (averageMood < 0.05) pointerPosition = 0.05 * 25;
    else if (averageMood > 3.95) pointerPosition = 3.95 * 25;
    else pointerPosition = averageMood * 25;
    pointerColorValue = Math.trunc(pointerPosition / 20);
  }
  return (
    <div className="w-full px-2 mt-2" {...props}>
      <div className="flex justify-evenly mb-[2px]">
        <div className="relative">
          <MdSentimentVeryDissatisfied className=" w-10 h-10 relative z-10" />
          <div
            className={
              'rounded-full w-8 h-8  absolute top-1 left-1 ' +
              (pointerColorValue === 0 && 'bg-red')
            }
          ></div>
        </div>
        <div className="relative">
          <MdSentimentDissatisfied className=" w-10 h-10 relative z-10" />
          <div
            className={
              'rounded-full w-8 h-8  absolute top-1 left-1 ' +
              (pointerColorValue === 1 && 'bg-peach')
            }
          ></div>
        </div>
        <div className="relative">
          <MdSentimentNeutral className=" w-10 h-10 relative z-10" />
          <div
            className={
              'rounded-full w-8 h-8  absolute top-1 left-1 ' +
              (pointerColorValue === 2 && 'bg-yellow')
            }
          ></div>
        </div>
        <div className="relative">
          <MdSentimentSatisfied className=" w-10 h-10 relative z-10 " />
          <div
            className={
              'rounded-full w-8 h-8  absolute top-1 left-1 ' +
              (pointerColorValue === 3 && 'bg-green-light')
            }
          ></div>
        </div>
        <div className="relative">
          <MdSentimentVerySatisfied className=" w-10 h-10 relative z-10 " />
          <div
            className={
              'rounded-full w-8 h-8  absolute top-1 left-1 ' +
              (pointerColorValue === 4 && 'bg-green')
            }
          ></div>
        </div>
      </div>
      <div className="h-3 border-brutal emotionGradient"></div>
      <HiPlay
        className={
          '-rotate-90 -translate-x-2 mt-[2px] ' +
          (pointerColorValue === 0
            ? 'text-red'
            : pointerColorValue === 1
            ? 'text-peach'
            : pointerColorValue === 2
            ? 'text-yellow'
            : pointerColorValue === 3
            ? 'text-green-light'
            : pointerColorValue === 4
            ? 'text-green'
            : 'text-transparent')
        }
        style={{ marginLeft: pointerPosition + '%' }}
      ></HiPlay>
    </div>
  );
}

export default MoodDisplay;
