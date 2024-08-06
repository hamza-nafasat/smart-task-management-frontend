import React from 'react'
import { RiAddBoxFill } from "react-icons/ri";
import UserCard from '../../../components/shared/users/UserCard';
import { Link } from 'react-router-dom';


const Users = () => {
  return (
    <div className='h-[calc(100vh-80px)] p-4'>
        <div className="bg-[#eef2f56e] rounded-[10px] h-full p-4 overflow-y-scroll scrollbar-0">
            <div className="flex justify-end">
                <Link to='/dashboard/add-user' className="p-1 bg-primary rounded-lg">
                    <RiAddBoxFill color='#fff' fontSize={18} cursor='pointer' />
                </Link>
            </div>
            <div className="mt-[5rem] grid md:grid-cols-12 gap-4" style={{rowGap: '4rem'}}>
                <UserCard />
            </div>
        </div>
    </div>
  )
}

export default Users