import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

//Import MongooseModule from nestjs/mongoose
import { MongooseModule } from '@nestjs/mongoose';

//Import UserSchema pour permettre l'injection de dépendance
import { UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
