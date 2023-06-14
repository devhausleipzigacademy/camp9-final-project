import UserEdit from 'components/UserEdit';
import React from 'react';
// import { User } from '@prisma/client';

// const testUser: User = {
//     id: 1,
//     name: 'nameTest',
//     password: 'test',
//     createdAt: new Date(),
//     updatedAt: new Date(),
// };

// function read(){
//     return testUser;
// }

// function write(date: User){
// }

function page() {
  return (
    <div>
      <h2 className="title-bold">User Settings</h2>
      <div>
        <p className="body-semibold">Username</p>
        <div>
          <input type="" />
          <UserEdit disabled={false} variant="pencil" children=''/>
        </div>
      </div>
    </div>
  );
}

export default page;
