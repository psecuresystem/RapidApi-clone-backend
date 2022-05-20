import { Injectable } from "@nestjs/common";
import { BeforeInsert, Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, } from "typeorm";
import { Exclude } from "class-transformer";
import { randomBytes, pbkdf2Sync } from "crypto";
import { SharedEntity } from "../common/model/sharedEntity";
import { User } from "./user.entity";
import { Discussion } from "./discussion.entity";
import { Endpoint } from "./endpoint.entity";

// @Injectable()
// export class HashPassword{

// }
@Entity()
export class Parameter extends SharedEntity {

    @PrimaryGeneratedColumn('uuid')
    parameter_id: string

    @Column({length: "20"})
    title: string

    @Column({default: true})
    required: boolean

    @Column({length: "500"})
    description: string

    @ManyToOne(type => Endpoint, endpoint => endpoint.parameters)
    endpoint: Endpoint

    @Column({default: null, nullable: true})
    default: string
}