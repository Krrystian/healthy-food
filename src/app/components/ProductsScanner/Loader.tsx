import React from 'react'

const Loader = () => {
  return (
    <div data-testid="loader-container" className='flex justify-center items-center  space-x-2'>
      <div className='animate-bounce h-12 w-12 rounded-full bg-[#26BDDC]'>
      </div>
      <div className='animate-bounce h-12 w-12 rounded-full bg-[#FB8500]'>
      </div>
      <div className='animate-bounce h-12 w-12 rounded-full bg-[#009E52]'>
      </div>
    </div>
  )
}

export default Loader
