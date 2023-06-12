import React from 'react';

function Home() {
//1. user login & has a session (useSession
//2. user credential request to check filter poll logic)


//new
    //Participating (true)
    //votes (false)

//pending
    //Participating (true)
    //votes (true)

//closed
    //all voted || time ended

//my polls
    //created polls


//Request
    // axios.get('/api/


  return (
    <div>
      <div>
        <button>new</button>
        <button>pending</button>
        <button>closed</button>
        <button>my polls</button>
      </div>
        <div>

        </div>
    </div>
  );
}

export default Home;
