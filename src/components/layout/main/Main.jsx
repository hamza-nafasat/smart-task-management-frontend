import { Outlet, useLocation } from 'react-router-dom'
import Tasks from '../../../pages/dashboard/tasks/Tasks'

const Main = () => {
  const location = useLocation();
  return (
    <div className='main-bg '>
      <div className="relative z-[99] md:h-auto">
        {location.pathname === '/dashboard' && (<Tasks />) || location.pathname === '/dashboard/' && (<Tasks />)}
          <Outlet />
      </div>
    </div>
  )
}

export default Main