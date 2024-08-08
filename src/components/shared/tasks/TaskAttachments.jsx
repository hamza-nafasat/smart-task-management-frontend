import React from 'react'
import xlImg from '../../../assets/images/tasks/xl.png'
import JpgImg from '../../../assets/images/tasks/jpg.png'
import DownloadIcon from '../../../assets/svgs/tasks/DownloadIcon'

const TaskAttachments = () => {
  return (
    <div className='bg-white rounded-lg px-4 md:px-5 py-4 xl:py-6'>
        <div className="flex items-center justify-between">
            <h5 className="text-xs md:text-sm font-semibold text-[#333333]">Attachments (2)</h5>
            <p className="text-primary text-[11px] cursor-pointer">Download all</p>
        </div>
        <table className='w-full mt-4 xl:mt-7'>
            <tbody>
                <tr>
                    <td className='pb-4 xl:pd-6'>
                        <img src={xlImg} alt="img" className='w-4 md:w-8' />
                    </td>
                    <td className='pb-4 xl:pd-6'>
                        <h4 className="text-[10px] md:text-xs font-semibold text-[#333333]">Data-structures.xls</h4>
                        <p className="text-[9px] md:text-xs text-[#828282] mt-1">Courtney Henry</p>
                    </td>
                    <td className='pb-4 xl:pd-6 text-[11px] md:text-[13px] text-[#4f4f4f]'>1.4MB</td>
                    <td className='text-end pb-4 xl:pd-6 cursor-pointer'><DownloadIcon /></td>
                </tr>
                <tr>
                    <td className='pb-4 xl:pd-6'>
                        <img src={JpgImg} alt="img" className='w-4 md:w-8' />
                    </td>
                    <td className='pb-4 xl:pd-6'>
                        <h4 className="text-[10px] md:text-xs font-semibold text-[#333333]">Team-Photos.jpg</h4>
                        <p className="text-[9px] md:text-xs text-[#828282] mt-1">Dianne Russell</p>
                    </td>
                    <td className='pb-4 xl:pd-6 text-[11px] md:text-[13px] text-[#4f4f4f]'>34MB</td>
                    <td className='text-end pb-4 xl:pd-6 cursor-pointer'><DownloadIcon /></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default TaskAttachments