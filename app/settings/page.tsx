'use client';
import InputField from 'components/InputField';
import SettingsButton from 'components/shared/buttons/SettingsButton';
import UserEdit from 'components/shared/buttons/SettingsButton';
import React from 'react';
import { useState } from 'react';

type Icon = 'pencil' | 'check';

function Settings() {
  const [usernameEdit, setUsernameEdit] = useState<Icon>('pencil');
  const [passwordEdit, setPasswordEdit] = useState<Icon>('pencil');
  const [confirmPasswordEdit, setConfirmPasswordEdit] =
    useState<Icon>('pencil');

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
            disabled={false}
            placeholder="<current username>"
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
            disabled={false}
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
      <div className="mb-[107px]">
        <div className="flex gap-4 items-">
          <InputField
            label={'Confirm Password'}
            showLabel={true}
            type={'password'}
            width={'reduced'}
            disabled={true}
            placeholder="<password>"
          />
          <SettingsButton
            disabled={true}
            variant={confirmPasswordEdit}
            children=""
            onClick={() => {
              setConfirmPasswordEdit(
                confirmPasswordEdit === 'pencil' ? 'check' : 'pencil'
              );
            }}
          />
        </div>
      </div>
      <p className="body-accent">Username successfully changed!</p>
      <p className="body-accent">Password successfully changed!</p>
    </div>
  );
}

export default Settings;
