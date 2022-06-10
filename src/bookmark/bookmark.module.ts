import { Module } from '@nestjs/common';

//Import BookMark module controller and service
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

//Import MongooseModule
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkSchema } from './schemas/bookmark.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Bookmark', schema: BookmarkSchema }]),
  ],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
