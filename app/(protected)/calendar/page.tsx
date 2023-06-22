'use client';
import Button from '@/components/shared/buttons/Button';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function page() {
  const [value, onChange] = useState(new Date());
  const [isCountdown, setIsCountdown] = useState(true);
  return (
    <main className="px-8 py-10 bg-teal h-[667px]">
      <h1 className="title-black mb-1">Poll Details</h1>
      <div className="mb-4 flex gap-6">
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
      </div>
      {isCountdown ? (
        <></>
      ) : (
        <Calendar
          className="shadow-brutal p-4 bg-yellow"
          prev2Label={null}
          next2Label={null}
          minDetail="year"
          minDate={new Date()}
          showFixedNumberOfWeeks={true}
          onChange={() => {}}
          value={value}
        />
      )}
    </main>
  );
}

export default page;
