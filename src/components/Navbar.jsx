import React, { useState, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize, setColor, setMode, currentMode, setThemeSettings } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  
  const [user, setUser] = useState({})
  const [role, setRole] = useState('')

  const getUser = () => {
    const userData = localStorage.getItem('user')
    const user = JSON.parse(userData)
    setUser(user)
    setRole(user.roles[0].name)
    console.log('USER: ', user);
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative shadow-lg w-full">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          
        <div className='flex justify-between flex-row items-center'>
        <WbSunnyOutlinedIcon color={currentMode === 'dark' ? 'white' : 'black'} />
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <p>
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user.username}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </div>
        </TooltipComponent>
        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
  );
};

export default Navbar;
