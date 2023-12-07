/* eslint-disable */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import SignIn from '../components/signin/Signin';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
       <div className="w-full h-screen flex justify-center items-center bg-slate-100">
         <SignIn />
       </div>
  )
}

export default Login