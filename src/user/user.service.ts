import { Injectable, NotFoundException } from '@nestjs/common';
import {  Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../databases/repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly usersrepo: UsersRepository
    ){}
    
    create(fullName: string, email: string, password: string) {
        const user = this.usersrepo.create({fullName, email, password})
        return this.usersrepo.save(user)
    }

    findOne(id: string){
        if(!id){
            return null
        }
        const user = this.usersrepo.findOne(id)
        return user
    }

    async findByEmail(email: string){
        return await  this.usersrepo.findOne({where:{email: email}})
    }
}
