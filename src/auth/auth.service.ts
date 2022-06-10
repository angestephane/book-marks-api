import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConnexionDto, InscriptionDto } from './dto';

//Import le décorateur InjectModel de nestjs/mongoose
import { InjectModel } from '@nestjs/mongoose';
//Import Model de mongoose
import { Model } from 'mongoose';
import { User } from '../user/schemas/user.schema';

//Import argon to hash password
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

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

      //transformer la données à retourner à l'utilisateur
      type UserDataTmp = Pick<
        User,
        'email' | 'username' | 'createAt' | 'updateAt' | 'bookmark'
      >;
      const data: UserDataTmp = {
        email: newUser.email,
        username: newUser.username,
        createAt: newUser.createAt,
        updateAt: newUser.updateAt,
        bookmark: newUser.bookmark,
      };

      //Retourner l'utilisateur enregistré
      return data;
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

  connexion(userAuth: ConnexionDto) {
    //Recherche via L'email

    //Condition sur la données retournée
      //SI la données est vide
        //Retourn une exception
      //Sinon on fait un test si le mdp est correct
        //Si le mdp n'est pas correct
          //Retourne une exception


  }
}
