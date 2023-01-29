import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';

import store from '../store/AdminLoginStore'
import { observer } from "mobx-react-lite"
import { apiClient } from "../api/apiClient";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = observer(() => {
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      apiClient.admin.login({
        login: store.fields.login,
        password: store.fields.password
      }).then(data => {
        if (data.success) {
          localStorage.setItem("auth_token", data.token)
          document.location.reload()
        } else {
          store.activeAlert(true)
        }
      })

    } catch (e) {
      console.log(e);
      store.activeAlert(true)
    }  
  }

  return (
    <div className='main'>
      <Container maxWidth="sm">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                id="outlined-basic" 
                className="text-field"
                label="login" 
                variant="outlined" 
                value={store.fields.login}
                onChange={event => store.fieldChange('login', event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" className="text-field">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={store.showPassword ? 'text' : 'password'}
                  value={store.fields.password}
                  onChange={event => store.fieldChange('password', event.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => store.changeShowPassword()}
                        edge="end"
                      >
                        {store.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit"
              >
                Войти
              </Button>
            </Grid>
          </Grid>
        </form>

        <Snackbar open={store.isActiveAlert} autoHideDuration={6000} onClose={() => store.deactiveAlert()}>
          <Alert onClose={() => store.deactiveAlert()} severity="error">
            Login or password is incorrect
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
})

export default Login;
