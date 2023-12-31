import { Clase } from "src/clase/entities/clase.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Ciudad_profesor } from "src/ciudad/entities/ciudad_profesor.entity";

@Entity({name:'profesor'})
export class Profesor {
@PrimaryGeneratedColumn()
id:number;

@Column()
nombre:string;

@Column()
apellido:string;

  //*****   Relación entre Profesor y Clase ---> uno a muchos  *****/    un profesor puede tener varias clases*/
  @OneToMany(()=>Clase,clases=>clases.profesor)
clases:Clase[]

  //*****   Relación entre Profesor y Ciudad_profesor ---> uno a muchos  *****/ 
@OneToMany(()=>Ciudad_profesor,domicilios=>domicilios.profesor)
domicilios:Ciudad_profesor[];

constructor(nombre:string, apellido:string){
    this.nombre = nombre;
    this.apellido = apellido;
}
public getId(): number {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public setNombre(nombre: string) {
    this.nombre = nombre;
  }
  public getApellido(): string {
    return this.apellido;
  }
  public setApellido(apellido: string) {
    this.apellido = apellido;
  }
}
