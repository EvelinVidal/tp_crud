import { Profesor } from "src/profesor/entities/profesor.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({name: 'ciudad_profesor'})
export class Ciudad_profesor{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    domicilio:string;
//*** 1 a muchos con profesores y con ciudad */
    @ManyToOne(()=>Profesor,profesor=>profesor.domicilios)
    profesor:Profesor;
    
    @ManyToOne(()=>Ciudad,ciudad=>ciudad.domicilios)
    ciudad:Ciudad;

}