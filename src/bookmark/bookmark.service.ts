import { Injectable } from '@nestjs/common';

//Import le décorateur InjectModel from nestjs/mongoose
import { InjectModel } from '@nestjs/mongoose';

//Import models from mongoose
import { Model } from 'mongoose';
import { Bookmark } from './schemas/bookmark.schema';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel('Bookmark') private readonly bookMarkModel: Model<Bookmark>,
  ) {}
}
