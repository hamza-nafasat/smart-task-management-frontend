import React from 'react'
import AddIcon from '../../../assets/svgs/tasks/AddIcon'
import ThreeDotsIcon from '../../../assets/svgs/tasks/ThreeDotsIcon'

const TaskColumn = ({title, children}) => {
  return (
    <div className='bg-[#eef2f56e] rounded-[10px] overflow-y-scroll scrollbar-0 relative'>
        <div className="flex items-center justify-between gap-3 p-4 xl:p-6 sticky top-0 md:backdrop-blur-md z-10">
            <h3 className="text-base font-semibold">{title}</h3>
        </div>
        <div className="flex flex-col gap-4 md:gap-5 p-4 xl:p-6">
            {children}
        </div>
    </div>
  )
}

export default TaskColumn