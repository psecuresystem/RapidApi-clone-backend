import { BadRequestException, Injectable } from '@nestjs/common';
import { emit } from 'process';
import { ZuAppResponse } from 'src/common/helpers/response';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersservice: UserService){}

    async signup({fullName, email, password}){
        const existingUser = await this.usersservice.findByEmail(email)
        if(existingUser) {
            throw new BadRequestException(
                ZuAppResponse.BadRequest("Duplicate Values", "The Email already exists")
            )
        }
        const newUser = await this.usersservice.create(fullName, email, password)

        return newUser
    }
}
