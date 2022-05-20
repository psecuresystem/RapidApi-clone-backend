import { Injectable } from "@nestjs/common";
import { BeforeInsert, Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, } from "typeorm";
import { Exclude } from "class-transformer";
import { randomBytes, pbkdf2Sync } from "crypto";
import { SharedEntity } from "../common/model/sharedEntity";
import { User } from "./user.entity";
import { Discussion } from "./discussion.entity";

// @Injectable()
// export class HashPassword{

// }
@Entity()
export class Comment extends SharedEntity {

    @PrimaryGeneratedColumn('uuid')
    comment_id: string

    @Column({type: "varchar",length: "1000",unique: true})
    comment_details: string

    @ManyToOne(type => User,user => user.comments)
    user: User

    @ManyToOne(type => Discussion, discussion => discussion.comments)
    discussion: Discussion
}