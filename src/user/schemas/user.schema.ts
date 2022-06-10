import * as mongoose from 'mongoose';

export interface User {
  createAt: string;
  updateAt: string;
  emails: string;
  username: string;
  password: string;
  salt: string;
}

export const UserSchema = new mongoose.Schema({
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date },
  emails: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String },
});
