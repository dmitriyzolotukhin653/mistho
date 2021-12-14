import { body } from 'express-validator';

export const registerValidations = [
  body('email', 'Enter your email')
    .isEmail()
    .withMessage('Enter a valid email')
    .isLength({ min: 10, max: 40 })
    .withMessage('Email should be of minimum 2 and maximum 40 characters length'),
  body('username', 'Enter your username')
    .isString()
    .isLength({ min: 2, max: 40 })
    .withMessage('Username should be of minimum 2 and maximum 40 characters length'),
  body('password', 'Enter your password')
    .isString()
    .isLength({ min: 6 })
    .withMessage('Password should be of minimum 8 characters length')
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error('Password should be match');
      } else {
        return value;
      }
    }),
];
