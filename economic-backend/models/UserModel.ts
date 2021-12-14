import { model, Schema, Document } from 'mongoose';

export interface UserModelInterface {
  _id?: string;
  email: string;
  username: string;
  password: string;
}

export type UserModelType = UserModelInterface & Document;

const UserSchema = new Schema({
  email: {
    unique: true,
    required: true,
    type: String,
  },
  username: {
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  }
});

UserSchema.set('toJSON', {
  transform: (_, obj) => {
    delete obj.password;
    return obj;
  },
});

export const UserModel = model('User', UserSchema);
