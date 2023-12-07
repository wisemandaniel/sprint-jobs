/* eslint-disable */
import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import baseUrl from '../../pages/url';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://sprint-jobs-a81df.web.app/">
        sprint-jobs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!username) {
      setUsernameError("Username is requred")
      isValid = false
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const user = {
      username,
      email,
      role: "ROLE_USER",
      password,
    };

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}public/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setShowModal(false)
        setMessage("Registration is successful! Login to your account")
        setSuccess(true)
        setTimeout(() => {
          navigate('/Login');
        }, 3000);
      } else {
        setSuccess(false)
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setShowModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Box marginTop={2} marginBottom={2}>
                <Typography fontSize={14} display="inline">Old user?</Typography>{' '}
                <Link
                  style={{ cursor: 'pointer' }}
                  color={'secondary'}
                  fontWeight={'bold'}
                  onClick={() => {
                    navigate('/Login');
                  }}
                  component="span"
                  underline="none"
                  display="inline"
                >
                  Sign in
                </Link>
              </Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleUsernameChange}
              error={Boolean(usernameError)}
              helperText={usernameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handlePasswordChange}
              error={Boolean(passwordError)}
              helperText={passwordError}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              endIcon={<KeyboardArrowRightIcon fontSize="large" fontWeight="bold" />}
              sx={{
                fontWeight: 'bold',
                mt: 3,
                mb: 2,
                p: 1.2,
                justifyContent: 'space-between',
              }}
            >
              Create account
            </Button>
          </Box>
          {loading && <LoadingSpinner />}
          <div>
            {showModal && (
              <Snackbar
                open={showModal}
                autoHideDuration={5000}
                onClose={() => setShowModal(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert
                  onClose={() => setShowModal(false)}
                  severity="error"
                >
                  {errorMessage}
                </Alert>
              </Snackbar>
            )}
          </div>
          {/* <div> */}
            {success && (
              <Snackbar
                open={success}
                autoHideDuration={2000}
                onClose={() => setSuccess(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert
                  onClose={() => setSuccess(false)}
                  severity="success"
                >
                  {message}
                </Alert>
              </Snackbar>
            )}
          {/* </div> */}
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
