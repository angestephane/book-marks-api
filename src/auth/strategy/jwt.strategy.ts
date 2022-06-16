import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

dotenv.config();

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectModel('User') private userModel: Model<User>) {
    //Initialisation de la strategie
    super({
      //Définit la méthode par laquelle le token sera extrait de la requête
      //Méthode bearer
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      /**
       * le temps d'expiration à préalablement été défini
       * dans lors de la création du passport.
       * Donc passport gère automatiquement le temps
       */
      ignoreExpiration: false,

      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const sub = payload.sub;
    //Si aucun utilisateur n'existe dans la base de données une erreur
    //De non authorisation sera générée
    const user = await this.userModel.findById(sub, '-_id -__v -hash');
    return user;
  }
}
