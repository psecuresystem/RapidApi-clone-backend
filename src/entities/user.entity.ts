import { Injectable } from "@nestjs/common";
import { BeforeInsert, Entity, Column, PrimaryGeneratedColumn, OneToMany, } from "typeorm";
import { Exclude } from "class-transformer";
import { randomBytes, pbkdf2Sync } from "crypto";
import { SharedEntity } from "../common/model/sharedEntity";
import { Api } from "./api.entity";
import { Discussion } from "./discussion.entity";
import { Comment } from "./comment.entity";

// @Injectable()
// export class HashPassword{

// }
@Entity()
export class User extends SharedEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    fullName: string

    @Column({unique: true} )
    email: string

    @Column()
    password: string
    
    @Column({nullable: true})
    organization ?: string

    @OneToMany(type => Api, api => api.user) 
    apis: Api[]

    @Column({ unique: true, nullable: true })
    @Exclude()
    refreshToken ?: string

    @OneToMany(type => Discussion, discussion => discussion.user) 
    discussions: Discussion[]

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[]

    @BeforeInsert()
    public setPassword() {
        console.log('before insert entity space')
        let salt = randomBytes(32).toString('hex')
        let hash = pbkdf2Sync(this.password, salt, 1000, 64, 'sha512').toString('hex')
        let hashedPassword = `${salt}:${hash}`
        this.password = hashedPassword
        return this.password
    }
}