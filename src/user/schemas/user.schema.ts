import { Document } from 'mongoose';
import { Schema } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {}
