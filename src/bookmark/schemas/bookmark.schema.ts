import { Document } from 'mongoose';
import { Schema } from '@nestjs/mongoose';

export type BookMarkDocument = BookMark & Document;

@Schema()
export class BookMark {}
