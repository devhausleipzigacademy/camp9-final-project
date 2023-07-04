'use client';

import { useFormContext } from 'react-hook-form';
import { Calendar } from 'react-calendar';
import { useState, useEffect } from 'react';
import { HiExclamationTriangle } from 'react-icons/hi2';
import TimePicker from 'react-time-picker';

import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';

export default function Deadline() {
  const { formState, getValues, setValue } = useFormContext<CreateNewPoll>(); // retrieve all hook methods

  const { endDateTime } = getValues();

  const [showTime, setShowTime] = useState(false);
  useEffect(() => {
    setShowTime(true);
    return () => {
      setShowTime(false);
    };
  }, []);

  // function for setting the newly selected time
  function setTime(timeString: string | null) {
    if (timeString) {
      const hoursAndMinutes = timeString.split(':');
      const newDateTime = new Date(endDateTime);
      newDateTime.setHours(
        parseInt(hoursAndMinutes[0]!),
        parseInt(hoursAndMinutes[1]!),
        0
      );
      setValue('endDateTime', newDateTime, {
        shouldValidate: true,
      });
    }
  }

  // function for setting the newly selected date
  function setDate(selectedDate: Date) {
    const newDateTime = new Date(endDateTime);
    newDateTime.setFullYear(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    setValue('endDateTime', newDateTime, {
      shouldValidate: true,
    });
  }
  // JSX return statement
  return (
    <div className="pl-8 flex flex-col gap-y-2 items-center pb-1">
      <h3 className="title-black">Deadline</h3>
      <Calendar
        className="calendar"
        prev2Label={null}
        next2Label={null}
        minDetail="year"
        minDate={new Date()}
        showFixedNumberOfWeeks={true}
        value={endDateTime}
        navigationAriaLabel="Go up"
        nextAriaLabel="Next"
        prevAriaLabel="Previous"
        aria-label="Calendar"
        onChange={value => setDate(value as Date)}
      />
      {showTime && (
        <TimePicker
          onContextMenu={e => e.preventDefault()}
          className="timePicker items-center"
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
          onInvalidChange={() => setValue('endDateTime', endDateTime)}
        />
      )}
      <div
        className={
          'description bg-peach border-brutal shadow-brutal p-2 flex gap-1 items-center ' +
          (!formState.errors.endDateTime && 'hidden')
        }
      >
        <HiExclamationTriangle className="h-5 w-5" />
        {formState.errors.endDateTime?.message}
      </div>
    </div>
  );
}
