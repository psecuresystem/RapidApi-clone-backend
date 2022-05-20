import { Injectable } from "@nestjs/common";
import { BeforeInsert, Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, } from "typeorm";
import { Exclude } from "class-transformer";
import { randomBytes, pbkdf2Sync } from "crypto";
import { SharedEntity } from "../common/model/sharedEntity";
import { User } from "./user.entity";
import { Discussion } from "./discussion.entity";
import { Parameter } from "./parameter.entity";
import { Endpoint } from "./endpoint.entity";

// @Injectable()
// export class HashPassword{

// }
@Entity()
export class Api extends SharedEntity {

    @PrimaryGeneratedColumn('uuid')
    api_id: string

    @Column({type: "varchar",length: "20",unique: true})
    api_name: string

    @Column({type: 'mediumtext'})
    short_description: string

    @Column({type: "varchar",length: "45",unique: true})
    category: string
    
    @ManyToOne(type => User, user => user.apis) 
    user: User

    @Column()
    subscription_count: number

    @OneToMany(type => Discussion, discussion => discussion.api) 
    discussions: Discussion[]

    @OneToMany(type => Endpoint, endpoint => endpoint.api) 
    endpoints: Endpoint[]

    @Column({type: "varchar",length: "200"})
    about: string

}