import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import SignUp from '../components/Signup/Signup';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate()

  return (
       <div className="w-full h-screen flex justify-center items-center bg-slate-100">
         <SignUp />
       </div>
  )
}

export default Login