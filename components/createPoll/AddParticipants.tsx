'use client';
'use client';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../shared/buttons/Button';
import { Combobox } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { HiUser } from 'react-icons/hi2';
import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import InputField from '../InputField';

export default function AddParticipants() {
  const { getValues, setValue, trigger, formState } =
    useFormContext<CreateNewPoll>(); // retrieve all hook methods

  const [participants, setParticipants] = useState<string[]>(
    getValues('participants') || []
  );
  const [query, setQuery] = useState(''); //input value of combobox
  const [selectedUser, setSelectedUser] = useState<string>(''); //selected user from combobox

  useEffect(() => {
    trigger('participants');
  }, [participants, trigger]);

  async function searchUsers() {
    const { data } = await axios.get('/api/searchUsers', {
      params: {
        queryString: query.toLocaleLowerCase(),
        participants: participants.join(','),
      },
    });
    return data;
  }

  const { data } = useQuery<User[]>(
    ['searchUsers', query, participants],
    searchUsers,
    {
      enabled: query.length > 0,
      staleTime: 1000 * 60 * 5, //5 minutes
    }
  );
  return (
    <div className="pl-8">
      <Combobox value={selectedUser} onChange={setSelectedUser}>
        <div className="flex flex-row h-12 gap-2 justify-between items-end mt-4">
          <Combobox.Input
            as={InputField}
            error={formState.errors.participants}
            placeholder="username"
            onChange={e => setQuery(e.target.value)}
          />
          <Button
            className="shrink-0"
            disabled={!selectedUser}
            size="xs"
            variant="secondary"
            type="button"
            onClick={() => {
              setParticipants(prev => {
                return [...prev, selectedUser!];
              });
              setValue('participants', [selectedUser!, ...participants]);
              setSelectedUser('');
            }}
          >
            +
          </Button>
        </div>
        <Combobox.Options className="w-[259px] h-fit max-h-[260px] fixed z-10 overflow-auto py-2 bg-yellow-light opacity-90 rounded-md">
          {data &&
            data.map(user => (
              <Combobox.Option
                className={'px-[14px] py-1 body'}
                value={user.name}
                key={user.id}
              >
                {query && user.name}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Combobox>
      <div className="flex flex-col">
        <div className="my-4 h-[260px] overflow-y-auto scrollbar-left-padded-green-sage w-full">
          {participants.map((participant, idx) => {
            return (
              <div
                key={idx}
                className={clsx(
                  participants.indexOf(participant) % 2 === 0
                    ? 'bg-peach'
                    : 'bg-peach-light',
                  'body border-2 border-black rounded-md px-[14px] py-[7px] my-1 flex flex-row justify-between'
                )}
              >
                <p className="body ">{participant}</p>
                <button
                  key={participant}
                  className=" text-black  body border-2 shadow border-black rounded-md px-[7px] py-[0px]"
                  onClick={() => {
                    setParticipants(prev =>
                      prev.filter(p => p !== participant)
                    );
                    setValue(
                      'participants',
                      participants.filter(p => p !== participant)
                    );
                  }}
                >
                  -
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <p className="shrink-0">{participants.length} people selected</p>
        <div className="flex overflow-hidden ml-2">
          <>
            {participants.slice(0, 7).map((_, idx) => {
              return (
                <HiUser key={idx} className="px-0 mx-0 w-[20px] h-[20px]" />
              );
            })}
            <p className="shrink-0 pr-1">
              {participants.length > 7 && `+${participants.length - 7}`}
            </p>
          </>
        </div>
      </div>
    </div>
  );
}
