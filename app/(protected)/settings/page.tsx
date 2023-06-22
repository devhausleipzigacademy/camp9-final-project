'use client';

import InputField from 'components/InputField';
import SettingsButton from 'components/shared/buttons/SettingsButton';
import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEditUsernameMutation } from '@/components/hooks/useEditUsername';
import { UsernameType } from '@/types/user/AuthSchemata';

type Icon = 'pencil' | 'check';

function Settings() {
  const [usernameEdit, setUsernameEdit] = useState<Icon>('pencil');
  const [passwordEdit, setPasswordEdit] = useState<Icon>('pencil');
  const [username, setUsername] = useState('...'); // <-- username initially unknown

  const { data } = useSession(); // <-- get user ID object from session/JWT
  const userID = data?.user?.id;

  (async function () {
    // <-- function expression to immediatley update username
    try {
      const response = await axios.get('/api/getUsername', {
        params: { id: userID }, // <-- make get request to getUsername API with id as parameter
      });
      setUsername(response.data.username); // <--- set username if/once resolved
    } catch (error) {
      console.error(error);
    }
  })();

  const { mutate, isLoading, handleSubmit, register, errors, formState } =
    useEditUsernameMutation();

  const onSubmit = (data: any) => {
    mutate({ ...data, userID });
    console.log('FRONTEND: onSubmit triggered', data);
    setUsernameEdit('pencil');
  };

  return (
    <div className="bg-yellow-light">
      <h2 className="title-bold">User Settings</h2>
      <div className="mt-[60px] flex">
        <div className="flex gap-4">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField
              label={'Username'}
              showLabel={true}
              type={'username'}
              width={'reduced'}
              disabled={usernameEdit === 'pencil'}
              placeholder={username}
              {...register('username')}
            />
            <SettingsButton
              disabled={false}
              variant={usernameEdit}
              children=""
              type="submit"
              onClick={() => {
                setUsernameEdit('check');
              }}
            />
          </form>
        </div>
      </div>
      <div className="my-4">
        <div className="flex gap-4">
          <InputField
            label={'Password'}
            showLabel={true}
            type={'password'}
            width={'reduced'}
            disabled={passwordEdit === 'pencil'}
            placeholder="********"
          />
          <SettingsButton
            disabled={false}
            variant={passwordEdit}
            children=""
            onClick={() => {
              setPasswordEdit(passwordEdit === 'pencil' ? 'check' : 'pencil');
            }}
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex gap-4 items-">
          <InputField
            label={'Confirm Password'}
            showLabel={true}
            type={'password'}
            width={'reduced'}
            disabled={passwordEdit === 'pencil'}
            placeholder="********"
          />
        </div>
        {/* ------Success Notification------ */}
      </div>
      <p className="body-accent text-green text-center hidden">
        Username successfully changed!
      </p>
      <p className="body-accent text-green text-center hidden">
        Password successfully changed!
      </p>
    </div>
  );
}

export default Settings;
