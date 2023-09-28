import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BsCurrencyDollar, BsShield } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';

import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {

  const [role, setRole] = useState('')

  const getUser = () => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)
    setRole(user.roles[0].name)
  }

  useEffect(() => {
    getUser()
  }, [])

  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 mt-8';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 mt-8';
  const dashboardColor = 'bg-red-400 flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 mt-8'

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span>SPRINT JOBS</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
            <div className="mt-10 ">
            {role === 'ROLE_ADMIN' && 
              <div>
                  <NavLink
                    to={`/Dashboard`}
                    key={'Dashboard'}
                    onClick={handleCloseSideBar}
                    className={({ isActive }) => (isActive ? dashboardColor : normalLink)}
                  >
                    {<RiContactsLine />}
                    <span className="capitalize ">{'Dashboard'}</span>
                  </NavLink>
              </div>}
              {role === 'WORKER' || role === 'ADMIN' && <div>
                  <NavLink
                    to={`/Dashboard/AllJobs`}
                    key={'All Jobs'}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {<RiContactsLine />}
                    <span className="capitalize ">{'All Jobs'}</span>
                  </NavLink>
              </div>}
              {role === 'ADMIN' || role === 'ROLE_USER' && <div>
                  <NavLink
                    to={`/Dashboard/UploadedJobs`}
                    key={'Uploaded Jobs'}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {<RiContactsLine />}
                    <span className="capitalize ">{'Uploaded Jobs'}</span>
                  </NavLink>
              </div>}
             {role === 'ROLE_ADMIN' || role === 'ROLE_WORKER' && <div>
                  <NavLink
                    to={`/Dashboard/AppliedJobs`}
                    key={'Applied Jobs'}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {<RiContactsLine />}
                    <span className="capitalize ">{'Applied Jobs'}</span>
                  </NavLink>
              </div>}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
