import React from 'react'

const Intro = () => {
  return (
    <div className='h-[80vh] px-8 py-2 flex  w-[900px] font-customParaTwo text-black relative z-[10]'>
        <div className='mt-[26vh] w-[50%] ml-8 relative z-[-2]'>
            <h1 className='text-7xl scale-[1.2] ml-[8%]'>Jana Sewa</h1>
            <h3 className='text-xl font-bebas'>"Your <span className='text-green-400 text-3xl'>Service</span> Our Duty"</h3><br></br>
            <h4 >Jana Sewa is a citizen service platform available in some regions for addressing public grievances and ensuring better governance. If your country has a platform like this, you can register your complaint online or in person. </h4>
        </div>
    </div>
  )
}

export default Intro;
