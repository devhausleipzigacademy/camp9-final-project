'use client';

import InputField from 'components/InputField';
import SettingsButton from 'components/shared/buttons/SettingsButton';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';

type Icon = 'pencil' | 'check';

interface SessionResponse {
  data: {
    user: {
      id: {
        sub: number;
      };
    };
  };
}

function Settings() {
  const [usernameEdit, setUsernameEdit] = useState<Icon>('pencil');
  const [passwordEdit, setPasswordEdit] = useState<Icon>('pencil');
  const { data } = useSession();

  async function getUsername(userID: number) {
    try {
      // console.log(`/api/getUsername/${userID}`)
      const response = await axios.get('/api/getUsername', {
        params: { id: userID },
      });
      // console.log(response);
      console.log(response.data.username);
      const username = response.data.username
      return username
    } catch (error) {
      console.error(error);
    }
  }

  // console.log('LOG1', data?.user.id.sub, status);

  const x = getUsername(data?.user?.id.sub);

  return (
    <div className="bg-yellow-light">
      <h2 className="title-bold">User Settings</h2>
      <div className="mt-[60px] flex">
        <div className="flex gap-4">
          <InputField
            label={'Username'}
            showLabel={true}
            type={'username'}
            width={'reduced'}
            disabled={usernameEdit === 'pencil'}
            placeholder={x}
          />
          <SettingsButton
            disabled={false}
            variant={usernameEdit}
            children=""
            onClick={() => {
              setUsernameEdit(usernameEdit === 'pencil' ? 'check' : 'pencil');
            }}
          />
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
            placeholder="<current password>"
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
            placeholder="<password>"
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
