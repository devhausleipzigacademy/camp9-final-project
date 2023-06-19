import InputField from 'components/InputField';
import UserEdit from 'components/UserEdit';
import React from 'react';

function page() {
  return (
    <div className="bg-yellow-light">
      <h2 className="title-bold">User Settings</h2>
      <div className="mt-[60px]">
        <div className="flex">
          <InputField
            label={'Username'}
            showLabel={true}
            type={'username'}
            width={'reduced'}
            disabled={false}
            placeholder="<current username>"
          />
          <UserEdit disabled={false} variant="pencil" children="" />
        </div>
      </div>
      <div className=" my-4">
        <div className="flex">
          <InputField
            label={'Password'}
            showLabel={true}
            type={'password'}
            width={'reduced'}
            disabled={false}
            placeholder="<current password>"
          />
          <UserEdit disabled={false} variant="pencil" children="" />
        </div>
      </div>
      <div className="mb-[107px]">
        <div className="flex ">
          <InputField
            label={'Confirm Password'}
            showLabel={true}
            type={'password'}
            width={'reduced'}
            disabled={true}
            placeholder="<password>"
          />
          <UserEdit disabled={false} variant="pencil" children="" />
        </div>
      </div>
      <div className="flex justify-items-end">
        <button className="border-brutal rounded-md p-4 flex-grow">
          Log out
        </button>
      </div>
    </div>
  );
}

export default page;
