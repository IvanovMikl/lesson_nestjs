import { Module } from '@nestjs/common';
import { TokenModule } from 'src/modules/token/token.module';
import { JwtStrategy } from 'src/strategy';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
