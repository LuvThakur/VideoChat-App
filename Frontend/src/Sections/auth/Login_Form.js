import React, { useState } from 'react';
import * as Yup from 'yup';
import { FormProvider, ReactformText } from '../../Hook_Form/Index';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, IconButton, InputAdornment, Stack, Link, Button } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import { Link as RouterLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { LoginUserFun } from '../../Redux/Slice/AuthSlice';



const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is require").email("Email must be valid address"),
  password: Yup.string().required("Password required")
});


const defaultValues = {
  email: "abc@gmail.com",
  password: "abc1234"
}


const Login_Form = () => {


  const dispatch = useDispatch();

  const [showPassword, setpassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit, formState: { errors } } = methods;

  const onSubmit = async (data) => {
    try {

      dispatch(LoginUserFun(data))

    }
    catch (error) {
      console.log("->>", error)
      reset();
      setError("aftersubmit", { ...error, message: error.message })
    }
  }


  const toggleshowPassword = () => {

    setpassword(!showPassword);
  }


  return (
    <FormProvider methods={methods} resolver={yupResolver(LoginSchema)} defaultValues={defaultValues} onSubmit={handleSubmit(onSubmit)}>

      <Stack spacing={3}>
        {!!errors.aftersubmit && <Alert severity='error'>{errors.aftersubmit.message}</Alert>}
      </Stack>

      <Stack spacing={3}>

        <ReactformText name={"email"} label="Email Address" />
        <ReactformText name={"password"} label="Password" type={showPassword ? "text" : "password"}

          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleshowPassword} edge="end">
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            )
          }}

        />

      </Stack>

      <Stack alignItems={'flex-end'} my={2} >
        <Link to="/auth/forgot" variant='subtitle2'
          underline="always" component={RouterLink}>
          forgot password
        </Link>
      </Stack>
      <Button fullWidth size='large' variant='contained' type='submit' sx={{ bgcolor: 'text.primary', color: (theme) => theme.palette.mode === 'light' ? "common.white" : 'grey.800' }}  >
        Submit
      </Button>
    </FormProvider>
  )
}


export default Login_Form;