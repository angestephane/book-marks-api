import { Module } from '@nestjs/common';

//Import mongoose
import { MongooseModule } from '@nestjs/mongoose';

//Import of controller and service
import { UserService } from './user.service';
import { UserController } from './user.controller';

//Import user model/schema
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
