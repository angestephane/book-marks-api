import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';

dotenv.config();

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    //Initialisation de la strategie
    super({
      //Définit la méthode par laquelle le token sera extrait de la requête
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
}
