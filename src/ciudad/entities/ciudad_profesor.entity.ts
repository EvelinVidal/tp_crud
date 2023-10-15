import { Profesor } from "src/profesor/entities/profesor.entity";
import {Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Ciudad } from "./ciudad.entity";

@Entity({name: 'ciudad_profesor'})
export class Ciudad_profesor{
    // tomamos ciudadId y profesorId como PK
    @PrimaryColumn()
    ciudadId:number;

    @PrimaryColumn()
    profesorId:number;
    // recordar que estos nombres tienen que estar exactamente igual a los de la base de datos ya creada. (en domicilioProfesor)
    
    @Column()
    domicilio:string;

    //*** 1 a muchos con profesores y con ciudad */
    @ManyToOne(()=>Profesor,profesor=>profesor.domicilios)
    profesor:Profesor;
    
    @ManyToOne(()=>Ciudad,ciudad=>ciudad.domicilios)
    ciudad:Ciudad;
constructor(ciudadId:number, profesorId:number, domicilio:string, )// como las PK no son autogeneradas necesitamos ponerlas en el constructor.
{
this.ciudadId=ciudadId;
this.profesorId=profesorId;
this.domicilio=domicilio;
}
}