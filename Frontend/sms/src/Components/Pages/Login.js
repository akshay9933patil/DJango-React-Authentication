import React from 'react';
import { useForm } from 'react-hook-form';
import { accessTokenApi } from '../../APIs/Auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const {register, handleSubmit,setError, formState:{errors}} = useForm();

  const navigate = useNavigate()
  async function handleLogin(user){

    try{
        const response = await accessTokenApi(user);
        console.log('response---->',response.data);

        if (response.status === 200){
            localStorage.clear();
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`;
            console.log('logged in!!!!!!!!!!!!!!!')
            navigate('/home/')
        }

    } catch(error){
      setError('username', { type: 'server', message: 'Please Provide Valid Credential !!! ' });
    }

    
  }

  return (
    <>
        <div>
            <form onSubmit={handleSubmit(handleLogin)} className='container jumbotron shadow mt-5'>
                <center><h1>Login</h1></center>
                <br /><br />
                <label htmlFor="username"><b>Enter Username:</b></label>
                <input type="text" id="" className='form-control' {...register('username')}/>
                <br /><br />

                <label htmlFor="password"><b>Enter Password:</b></label>
                <input type="password" className='form-control' {...register('password')}/>
                {errors.username && <span className='text-danger'>{errors.username.message}</span>}
                <br /><br />

                <input type="submit" value="Login" className='btn btn-danger col-5 float-left'/>
                <input type="reset" value="Reset" className='btn btn-info col-5 float-right'/>
                <br /><br />
            </form>
        </div>
    </>
  )
}

export default Login