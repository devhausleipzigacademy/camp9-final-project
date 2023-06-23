'useclient';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../shared/buttons/Button';
import { Combobox } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import clsx from 'clsx';
import { HiUser } from 'react-icons/hi2';

export default function AddParticipants() {
  const { register, formState, getValues } = useFormContext(); // retrieve all hook methods
  const [participants, setParticipants] = useState([]);
  let numParticipants = participants.length;
  const [query, setQuery] = useState(''); //input value of comobox
  const [selectedUser, setSelectedUser] = useState<null | User>(null); //selected user from combobox

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
  ); //query already filters people by input string

  // const queryClient = useQueryClient()
  // queryClient.invalidateQueries('searchUsers')//restet cached "stale" data so next request will me made new

  useEffect(() => {
    register('participants');
  }, [register]);

  return (
    <div className="">
      <Combobox value={selectedUser} onChange={setSelectedUser}>
        <div className="flex flex-row h-12 justify-around ">
          <Button
            className=""
            disabled={selectedUser === null}
            children="+"
            size="xs"
            variant="secondary"
            type="button"
            onClick={() => {
              setParticipants([...participants, selectedUser]);
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
                key={user.id}
                value={user.name}
              >
                {user.name}
              </Combobox.Option>
            ))}
        </Combobox.Options>
      </Combobox>
      <div>
        <div className="my-4">
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
                    setParticipants(
                      participants.splice(participants.indexOf(participant, 1))
                    );
                    console.log(participants);
                  }}
                >
                  -
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row">
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
