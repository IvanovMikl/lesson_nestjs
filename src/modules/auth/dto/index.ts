import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDTO{
   @ApiProperty()
   @IsString()
   email: string 

   @IsString()
   password: string
}