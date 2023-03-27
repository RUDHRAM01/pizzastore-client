import  React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function CreateAccount() {
  const [config, setConfig] = useState({
    email: '',
    password: ''
  });

   const navigate  = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/users/register", config).then((data) => {
      localStorage.setItem('token', data.data.token);
      console.log(data);
      navigate('/login');
    }).catch((e) => {
      console.log(e)
    })
  };

  return (
    <ThemeProvider theme={theme}>
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

          </Avatar>
          <Typography component="h1" variant="h5">
             Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={config.email}
              onChange={(e) => {
                setConfig({ ...config, email: e.target.value });
              }}
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
              value={config.password}
              onChange={(e) => {
                setConfig({ ...config, password: e.target.value });
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </Button>
            <Grid container>
              <Grid item>
              <Button variant='text' onClick={()=>navigate("/login")}>
              {"already have an account? Sign In"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}