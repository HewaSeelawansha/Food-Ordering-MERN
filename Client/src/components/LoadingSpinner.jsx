import React from 'react'

const Loading = () => {
  return (
    <div className='h-screen flex items-center justify-center'>
        <span className="loading loading-spinner text-green"></span>
        <span className="loading loading-spinner text-secondary"></span>
        <span className="loading loading-spinner text-accent"></span>
        <span className="loading loading-spinner text-neutral"></span>
        <span className="loading loading-spinner text-info"></span>
        <span className="loading loading-spinner text-success"></span>
        <span className="loading loading-spinner text-warning"></span>
        <span className="loading loading-spinner text-error"></span>
    </div>
  )
}

export default Loading
