import express from 'express';
import { validationResult } from 'express-validator';
import { UserModel } from '../models/UserModel';
import { generateMD5 } from '../utils/generateHash';

class UserController {
  async login(req: express.Request, res: express.Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email }).exec();

      if (!user) {
        res.status(404).json({ status: 'failed', message: 'User not found' });
        return;
      }

      if (user.password !== generateMD5(password + process.env.SECRET_KEY)) {
        res.status(401).json({ status: 'failed', message: 'Invalid password' });
        return;
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({
        message: JSON.stringify(error),
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const parseError = errors
          .array()
          .map((item) => Object.entries({ [item.param]: item.msg }))
          .flat()
          .reduce((acc: { [index: string]: string }, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});

        res.status(400).json({ status: 'error', errors: parseError });
        return;
      }

      const data = {
        email: req.body.email,
        username: req.body.username,
        password: generateMD5(req.body.password + process.env.SECRET_KEY),
      };

      const user = await UserModel.create(data);
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({
        message: JSON.stringify(error),
      });
    }
  }
}

export const UserCtrl = new UserController();
