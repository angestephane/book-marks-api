import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConnexionDto, InscriptionDto } from './dto';

//Import le décorateur InjectModel de nestjs/mongoose
import { InjectModel } from '@nestjs/mongoose';
//Import Model de mongoose
import mongoose, { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';

//Import argon to hash password
import * as argon from 'argon2';

//Import JWTservice from nestjs/jwt
import { JwtService } from '@nestjs/jwt';

//Import dotenv
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async inscription(user: InscriptionDto) {
    //Ajouter un utilisateur dans la base de données
    try {
      // Générer un hash
      const hash = await argon.hash(user.password);

      //Créer et enregistrer l'utlisateur
      const newUser = new this.userModel({
        email: user.email,
        username: user.username,
        hash,
      });

      await newUser.save();

      //Retourner Le token de l'utilisateur
      return await this.tokenConnexion(newUser._id, newUser.email);
    } catch (err) {
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: 'email déjà defini',
          },
          HttpStatus.CONFLICT,
        );
      }
    }
  }

  async connexion(userAuth: ConnexionDto) {
    //Recherche l'utilisateur via l'email
    const user = await this.userModel.findOne(
      { email: userAuth.email },
      'username bookmark hash _id',
    );
    //Check s'il existe un utilisateur avec ce mail
    if (user) {
      //Check le mot de passe
      /***
       * !argon.verify()
       * @Params : -mdp dans la bdd
       *           -mdp envoyé par le user
       *@return : boolean - true si mdp match
       *                  - false sinon
       */
      const mdpMatch = await argon.verify(user.hash, userAuth.password);
      if (mdpMatch) {
        return await this.tokenConnexion(user._id, user.email);
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Mot de passe incorrect',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Aucun utilisateur avec ce mail !',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  tokenConnexion(
    userId: mongoose.Types.ObjectId,
    email: string,
  ): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = process.env.SECRET_KEY;
    return this.jwt.signAsync(payload, {
      secret: secret,
      expiresIn: '15m',
    });
  }
}
