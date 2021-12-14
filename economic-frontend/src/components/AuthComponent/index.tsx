import React, { useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { RequestUserType } from '../../effects/user/type';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAuth } from '../../effects/user/userSlice';
import { FormHelperText, Typography } from '@mui/material';
import { userValidationSelector, userAuthSelector } from '../../effects/user/userSelector';

interface IAuth {
  type: RequestUserType;
  closeHandler: () => void;
}

export const AuthComponent: React.FC<IAuth> = ({ type, closeHandler }) => {
  const dispatch = useAppDispatch();
  const validationError = useAppSelector(userValidationSelector);
  const isAuth = useAppSelector(userAuthSelector);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      password2: '',
    },
    onSubmit: (values) => {
      dispatch(fetchAuth({ user: values, type }));
    },
  });

  useEffect(() => {
    if (typeof validationError === 'object') {
      formik.setErrors(validationError);
    } else {
      formik.setErrors({});
    }
    if (isAuth) {
      closeHandler();
    }
  }, [formik, validationError, isAuth, closeHandler, dispatch]);

  const title = useMemo(() => (type === RequestUserType.SIGNUP ? 'Sign Up' : 'Login'), [type]);

  return (
    <Dialog maxWidth="sm" onClose={closeHandler} open={!!type}>
      <Box sx={{ width: 350, padding: 2 }}>
        <DialogTitle sx={{ paddingX: 0 }}>{title}</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          {type === RequestUserType.SIGNUP && (
            <FormControl fullWidth variant="standard" error={!!formik.errors.username}>
              <InputLabel htmlFor="username">User Name</InputLabel>
              <Input
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              <FormHelperText>{formik.errors.username}</FormHelperText>
            </FormControl>
          )}
          <FormControl fullWidth variant="standard" error={!!formik.errors.email}>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormHelperText>{formik.errors.email}</FormHelperText>
          </FormControl>
          <FormControl fullWidth variant="standard" error={!!formik.errors.password}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <FormHelperText>{formik.errors.password}</FormHelperText>
          </FormControl>
          {type === RequestUserType.SIGNUP && (
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="password2">Confirm Password</InputLabel>
              <Input
                id="password2"
                name="password2"
                value={formik.values.password2}
                onChange={formik.handleChange}
              />
            </FormControl>
          )}
          {typeof validationError === 'string' && (
            <Typography textAlign="center" color="error">
              {validationError}
            </Typography>
          )}
          <Button sx={{ marginTop: 2 }} fullWidth variant="contained" type="submit">
            {title}
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};
