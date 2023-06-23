'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';

function page() {
  const [dateTime, setDateTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  useEffect(() => {
    setShowTime(true);
  }, []);
  function setTime(timeString: string) {
    const hoursAndMinutes = timeString.split(':');
    const newDateTime = new Date(dateTime);
    newDateTime.setHours(
      parseInt(hoursAndMinutes[0]!),
      parseInt(hoursAndMinutes[1]!),
      0
    );
    setDateTime(newDateTime);
  }
  return (
    <main className="px-8 py-10 bg-teal h-[667px]">
      <h1 className="title-black mb-1">Poll Details</h1>
      {/* <div className="mb-4 flex gap-6">
        <Button
          variant={isCountdown ? 'primary' : 'quinary'}
          handleClick={() => setIsCountdown(true)}
        >
          Countdown
        </Button>
        <Button
          variant={isCountdown ? 'quinary' : 'primary'}
          handleClick={() => setIsCountdown(false)}
        >
          Date & Time
        </Button>
      </div> */}
      <div className="flex flex-col gap-4 items-center">
        <Calendar
          className="calendar"
          prev2Label={null}
          next2Label={null}
          minDetail="year"
          minDate={new Date()}
          showFixedNumberOfWeeks={true}
          onChange={() => {}}
          value={dateTime}
          navigationAriaLabel="Go up"
          nextAriaLabel="Next"
          prevAriaLabel="Previous"
          aria-label="Calendar"
        />
        {showTime && (
          <TimePicker
            onContextMenu={e => e.preventDefault()}
            className="timePicker"
            amPmAriaLabel="Select AM/PM"
            clearAriaLabel="Clear value"
            clockAriaLabel="Toggle clock"
            hourAriaLabel="Hour"
            maxDetail="minute"
            clearIcon={null}
            minuteAriaLabel="Minute"
            nativeInputAriaLabel="Time"
            secondAriaLabel="Second"
            shouldOpenClock={() => false}
            value={dateTime}
            onChange={value => {
              setTime(value as string);
            }}
            onInvalidChange={() => console.log('error!')}
          />
        )}
      </div>
    </main>
  );
}

export default page;
