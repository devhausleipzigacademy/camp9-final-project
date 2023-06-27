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

export default function AddParticipants({
  title = 'Add Participants',
}: NewPollComponentProps) {
  const { register, formState, getValues, setValue } =
    useFormContext<CreateNewPoll>(); // retrieve all hook methods
  const [participants, setParticipants] = useState<string[]>([]);
  let numParticipants = participants.length;
  const [query, setQuery] = useState(''); //input value of comobox
  const [selectedUser, setSelectedUser] = useState<null | string>(null); //selected user from combobox
  async function searchUsers() {
    const { data } = await axios.get('/api/searchUsers', {
      params: {
        queryString: query,
      },
    });
    return data;
  }

  const { data, isError, isLoading } = useQuery<User[]>(
    ['searchUsers', query],
    searchUsers
  );

  // const queryClient = useQueryClient()
  // queryClient.invalidateQueries('searchUsers')//resets cached "stale" data so next request will me made new

  return (
    <div className="">
      <Combobox value={selectedUser} onChange={setSelectedUser}>
        <div className="flex flex-row h-12 gap-1 justify-between">
          <Button
            {...register('participants')}
            className=""
            disabled={selectedUser === null}
            children="+"
            size="xs"
            variant="secondary"
            type="button"
            onClick={() => {
              setParticipants(prev => {
                return [...prev, selectedUser!];
              });
              setValue('participants', [...participants, selectedUser!]);
              setSelectedUser(null);
            }}
          ></Button>
          <Combobox.Input
            className="w-[251px] focus:outline-yellow p-[14px] h-11 body bg-yellow-light shadow-shadow border-black border-3 rounded placeholder-[body-light]"
            onChange={event => setQuery(event.target.value)}
            placeholder="username"
          />
        </div>
        <Combobox.Options
          className={clsx(
            query === '' && 'hidden',
            'fixed z-10 w-[251px] right-9 mr-1 overflow-auto py-2 bg-yellow-light rounded-md'
          )}
        >
          {data &&
            data.map(user => (
              <Combobox.Option
                className={'px-[14px] py-1 body'}
                value={user.name}
              >
                {user.name}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Combobox>
      <div className="flex flex-col">
        <div className="my-4 h-[253px] overflow-y-auto scrollbar w-[308px]">
          {participants.map(participant => {
            return (
              <div
                className={clsx(
                  participants.indexOf(participant) % 2 === 0
                    ? 'bg-peach'
                    : 'bg-peach-light',
                  'body border-2 border-black rounded-md px-[14px] py-[7px] my-1 flex flex-row justify-between'
                )}
              >
                <p className="body ">{participant}</p>
                <button
                  className=" text-black  body border-2 shadow border-black rounded-md px-[7px] py-[0px]"
                  onClick={() => {
                    setParticipants(prev =>
                      prev.filter(p => p !== participant)
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
      <div className="flex flex-row justify-end">
        <p>{numParticipants} people selected</p>
        <div className="flex flex-row ml-2">
          {participants.map(participant => {
            return <HiUser className="px-0 mx-0 w-[20px] h-[20px]" />;
          })}
        </div>
      </div>
    </div>
  );
}
