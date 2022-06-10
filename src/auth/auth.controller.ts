import { Body, Controller, Post } from '@nestjs/common';
import { ConnexionDto, InscriptionDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('inscription')
  async inscription(@Body() user: InscriptionDto) {
    return await this.authService.inscription(user);
  }

  @Post('connexion')
  connexion(@Body() userAuth: ConnexionDto) {
    this.authService.connexion(userAuth);
  }
}
