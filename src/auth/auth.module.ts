import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

//Import MongooseModule from nestjs/mongoose
import { MongooseModule } from '@nestjs/mongoose';

//Import JWTModule

//Import UserSchema pour permettre l'injection de dépendance
import { UserSchema } from '../user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
