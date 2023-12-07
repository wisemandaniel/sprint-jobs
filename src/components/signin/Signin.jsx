/* eslint-disable */
import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
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
      <Link color="inherit" href="https://mui.com/">
        sprint-jobs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
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
      password,
    };

    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}public/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));
        if (user.roles[0].name === 'ROLE_ADMIN') {
          navigate('/Dashboard/AllJobs');
        } else if (user.roles[0].name === 'ROLE_USER') {
          navigate('/Dashboard/UploadedJobs');
        } else if (user.roles[0].name === 'ROLE_WORKER') {
          navigate('/Dashboard/AllJobs');
        }
      } else {
        const errorData = await response.json();
        console.log('ERROR: ', errorData);
        setErrorMessage(errorData.message);
        setShowModal(true);
      }
    } catch (error) {
      console.log('ERROR: ', error);
      setErrorMessage(error.message);
      setShowModal(true);
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Box marginTop={2} marginBottom={2}>
              <Typography fontSize={14} display="inline">New user?</Typography>{' '}
              <Link
                style={{ cursor: 'pointer' }}
                color={'secondary'}
                fontWeight={'bold'}
                onClick={() => {
                  navigate('/Registration');
                }}
                component="span"
                underline="none"
                display="inline"
              >
                Create account
              </Link>
            </Box>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
              onChange={handlePasswordChange}
              error={Boolean(passwordError)}
              helperText={passwordError}
            />
            <Grid container>
              <Grid item xs sx={{ textAlign: 'right' }}>
                <Link
                  component="button" // Use a button component for a clickable link
                  variant="body2"
                  underline="none"
                  onClick={() => {
                    navigate('/Registration');
                  }}
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
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
              Login
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
                <Alert onClose={() => setShowModal(false)} severity="error">
                  {errorMessage}
                </Alert>
              </Snackbar>
            )}
          </div>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
