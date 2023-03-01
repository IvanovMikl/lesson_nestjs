import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { user } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { Watchlist } from 'src/modules/watchlist/models/watchlist.model';


@Injectable()
export class UserService {
   constructor(@InjectModel(user) private readonly userRepository: typeof user){}

   async hashPassword(password){
      return bcrypt.hash(password, 10)
   }
   async findUserByEmail (email:string) {
      return this.userRepository.findOne({ where: { email: email } })
   }

   async createUser(dto: CreateUserDTO): Promise<CreateUserDTO>{

  
      dto.password = await this.hashPassword(dto.password);
      await this.userRepository.create({
         firstName: dto.firstName,
         userName: dto.userName,
         email: dto.email,
         password: dto.password
      });
      return dto;
   }
   async publicUser (email: string) {
      return this.userRepository.findOne({
         where: {email},
         attributes: {exclude: ['password']},
         include: {
            model: Watchlist,
            required: false
         }
      })
   }
   async updateUser (email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
      await this.userRepository.update(dto, {where: {email}})
      return dto;
   } 

   async deleteUser (email: string): Promise<boolean> {
      await this.userRepository.destroy({where: {email}})
      return true
   }
}
