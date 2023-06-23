'use client';

import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import React from 'react';
import { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import { UseFormRegister, useFormContext } from 'react-hook-form';
import TimePicker from 'react-time-picker';

const Select = React.forwardRef<
  HTMLSelectElement,
  { value: Date } & ReturnType<UseFormRegister<CreateNewPoll>>
>(({ onChange, onBlur, name, value }, ref) => (
  <Calendar
    className="calendar"
    prev2Label={null}
    next2Label={null}
    minDetail="year"
    minDate={new Date()}
    showFixedNumberOfWeeks={true}
    value={value}
    navigationAriaLabel="Go up"
    nextAriaLabel="Next"
    prevAriaLabel="Previous"
    aria-label="Calendar"
    onChange={() => {}}
  />
));

export default function Deadline({
  title = 'Deadline',
}: NewPollComponentProps) {
  const { register, formState, getValues } = useFormContext<CreateNewPoll>(); // retrieve all hook methods
  const { endDateTime } = getValues();
  const [showTime, setShowTime] = useState(false);
  useEffect(() => {
    setShowTime(true);
  }, []);
  function setTime(timeString: string) {
    const hoursAndMinutes = timeString.split(':');
    const newDateTime = new Date(endDateTime);
    newDateTime.setHours(
      parseInt(hoursAndMinutes[0]!),
      parseInt(hoursAndMinutes[1]!),
      0
    );
    // setDateTime(newDateTime);
  }
  console.log(register);
  console.log(endDateTime);
  return (
    <div className="flex flex-col gap-8 w-full">
      <Select
        {...register('endDateTime', { required: true })}
        value={endDateTime as Date}
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
          value={endDateTime}
          onChange={value => {
            setTime(value as string);
          }}
          onInvalidChange={() => console.log('error!')}
        />
      )}
    </div>
  );
}
