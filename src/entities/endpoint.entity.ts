import { Injectable } from "@nestjs/common";
import { BeforeInsert, Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, } from "typeorm";
import { Exclude } from "class-transformer";
import { randomBytes, pbkdf2Sync } from "crypto";
import { SharedEntity } from "../common/model/sharedEntity";
import { User } from "./user.entity";
import { Discussion } from "./discussion.entity";
import { Parameter } from "./parameter.entity";
import { Api } from "./api.entity";

// @Injectable()
// export class HashPassword{

// }
type endpoints = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "PATCH"

@Entity()
export class Endpoint extends SharedEntity {

    @PrimaryGeneratedColumn('uuid')
    endpoint_id: string

    @Column({type: "varchar",length: "8",unique: true})
    endpoint_type: endpoints

    @Column({type: 'varchar', length: "500"})
    endpoint: string

    @Column({type: 'varchar', length: "100"})
    short_description: string

    @OneToMany(type => Parameter, param => param.endpoint)
    parameters: Parameter[]

    @ManyToOne(type => Api,api => api.endpoints)
    api: Api

}