'use client';

import InputField from 'components/InputField';
import SettingsButton from 'components/shared/buttons/SettingsButton';
import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEditUsernameMutation } from '@/components/hooks/useEditUsername';
import { useEditPasswordMutation } from '@/components/hooks/useEditPassword';

type Icon = 'pencil' | 'check';

function Settings() {
  const [usernameEdit, setUsernameEdit] = useState<Icon>('pencil');
  const [passwordEdit, setPasswordEdit] = useState<Icon>('pencil');
  const [username, setUsername] = useState('...'); // <-- username initially unknown

  const { data } = useSession(); // <-- get user ID object from session/JWT
  const userID = data?.user?.id; // <-- FIX: type error

  // func expression immediately updates username
  (async function () {
    try {
      const response = await axios.get('/api/getUsername', {
        params: { id: userID }, // <-- make get request to getUsername API with id as parameter
      });
      setUsername(response.data.username); // <--- set username if/once resolved
    } catch (error) {
      console.error(error);
    }
  })();

  const {
    mutate: mutateU,
    handleSubmit: handleSubmitU,
    register: registerU,
    errors: errorsU,
  } = useEditUsernameMutation();

  const onUsernameSubmit = (data: any) => {
    if (usernameEdit === 'check') {
      mutateU({ ...data, userID });
      setUsernameEdit('pencil');
    }
  };

  const {
    mutate: mutateP,
    handleSubmit: handleSubmitP,
    register: registerP,
    errors: errorsP,
  } = useEditPasswordMutation();

  const onPasswordSubmit = (data: any) => {
    if (passwordEdit === 'check') {
      mutateP({ ...data, userID });
      setPasswordEdit('pencil');
    }
  };

  return (
    <div className="bg-yellow-light">
      <h2 className="title-bold">User Settings</h2>
      <form
        className="flex gap-4 mt-[60px]"
        onSubmit={handleSubmitU(onUsernameSubmit)}
      >
        <InputField
          label={'Username'}
          type={'username'}
          width={'reduced'}
          disabled={usernameEdit === 'pencil'}
          placeholder={username}
          error={errorsU.username}
          {...registerU('username')}
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
      <form onSubmit={handleSubmitP(onPasswordSubmit)}>
        <div className="flex gap-4">
          <InputField
            label={'Password'}
            type={'password'}
            width={'reduced'}
            disabled={passwordEdit === 'pencil'}
            error={errorsP.password}
            placeholder="********"
            {...registerP('password')}
          />
          <SettingsButton
            disabled={false}
            variant={passwordEdit}
            children=""
            type="submit"
            onClick={() => {
              setPasswordEdit('check');
            }}
          />
        </div>
        <InputField
          label={'Confirm Password'}
          type={'password'}
          width={'reduced'}
          disabled={passwordEdit === 'pencil'}
          error={errorsP.confirmPassword}
          placeholder="********"
          {...registerP('confirmPassword')}
        />
      </form>
    </div>
  );
}

export default Settings;
