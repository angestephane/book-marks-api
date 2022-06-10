import { Injectable } from '@nestjs/common';

//Import décorateur injectModel from @nestjs/mongoose
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

//Import model from mongoose
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
}
