import * as mongoose from 'mongoose';
import { timestamp } from 'rxjs';

export interface User {
  createAt: string;
  updateAt: Date;
  email: string;
  username: string;
  password: string;
  hash: string;
  bookmark: Array<string>;
}

export const UserSchema = new mongoose.Schema({
  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  hash: { type: String },
  bookmark: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark' }],
});
