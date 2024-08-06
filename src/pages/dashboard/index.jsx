import React from 'react'
import Aside from '../../components/layout/aside/Aside'
import Header from '../../components/layout/header/Header'
import Main from '../../components/layout/main/Main'

const Dashboard = () => {
  return (
    <section className="w-full user-dashboard relative h-[calc(100vh-0px)] overflow-x-hidden overflow-y-scroll bg-[#f5f7fb] z-0 scrollbar-0">
      <div className="flex flex-col-2">
        <div className='bg-linearGrad backdrop-blur-lg'>
          <Aside />
        </div>
        <div className="w-[100%]">
          <Header />
          <Main />
        </div>
      </div>
    </section>
  )
}

export default Dashboard