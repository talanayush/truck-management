import React from 'react'

const Stats = () => {
  return (
    <>
      <div className="stats shadow bg-gradient-to-r bg-slate-200 text-black w-full p-6 rounded-lg flex justify-between items-center">
        <div className="stat h-32 flex flex-col justify-center items-center">
          <div className="stat-figure">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-12 w-12 stroke-current text-yellow-500">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="stat-title text-black text-lg">Downloads</div>
          <div className="stat-value text-black text-4xl font-bold">31K</div>
          <div className="stat-desc text-black text-sm">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat h-32 flex flex-col justify-center items-center">
          <div className="stat-figure">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-12 w-12 stroke-current text-yellow-500">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
            </svg>
          </div>
          <div className="stat-title text-black text-lg">New Users</div>
          <div className="stat-value  text-black text-4xl font-bold">4,200</div>
          <div className="stat-desc  text-black text-sm">↗︎ 400 (22%)</div>
        </div>

        <div className="stat h-32 flex flex-col justify-center items-center">
          <div className="stat-figure">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-12 w-12 stroke-current text-yellow-500">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
          <div className="stat-title text-black text-lg">New Registers</div>
          <div className="stat-value text-black text-4xl font-bold">1,200</div>
          <div className="stat-desc text-black text-sm">↘︎ 90 (14%)</div>
        </div>
      </div>
    </>
  )
}

export default Stats
