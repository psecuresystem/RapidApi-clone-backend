import { Injectable } from "@nestjs/common";
import { BeforeInsert, Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, } from "typeorm";
import { Exclude } from "class-transformer";
import { randomBytes, pbkdf2Sync } from "crypto";
import { SharedEntity } from "../common/model/sharedEntity";
import { User } from "./user.entity";
import { Api } from "./api.entity";
import { Comment } from "./comment.entity";

// @Injectable()
// export class HashPassword{

// }
@Entity()
export class Discussion extends SharedEntity {

    @PrimaryGeneratedColumn('uuid')
    discussion_id: string

    @ManyToOne(type => User, user => user.discussions) 
    user: User

    @Column({type: "varchar",length: "45",unique: true})
    subject: string
    
    @ManyToOne(type => Api, api => api.discussions) 
    api: Api

    @OneToMany(type => Comment, comment => comment.discussion)
    comments: Comment[]

}