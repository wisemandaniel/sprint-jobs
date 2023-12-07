/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate()

  const { setIsClicked, initialState } = useStateContext();

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

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg sm:w-2/6 w-5/6">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">{user.username}</p>
          {role === 'USER' && <p className="text-gray-500 text-sm dark:text-gray-400">USER</p>}
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div onClick={() => {
            setIsClicked(initialState)
            navigate('/dashboard/ProfileScreen')
          }} key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 justify-center items-center">
        <button
            type="submit"
            onClick={() => {
              setIsClicked(initialState)
              localStorage.removeItem('user')
              navigate('/Login')
            }}
            className={'text-xl p-3 w-full hover:drop-shadow-xl justify-center items-center bg-red-400 text-white rounded-md font-bold'}
            >
              {'Logout'}
          </button>
        </div>
    </div>

  );
};

export default UserProfile;
