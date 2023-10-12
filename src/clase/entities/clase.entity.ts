import { Escuela } from "src/escuela/entities/escuela.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'clase'})
export class Clase {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;

  //*** Relación entre clase y profesor -> muchos a uno: *** 
  @ManyToOne(()=>Profesor,profesor=>profesor.clases)
  @JoinColumn({name: "fk_id_profesor"})
  profesor:Profesor;

  //*** Relación entre clase y escuela -> muchos a uno: ***
  @ManyToOne(()=>Escuela,escuela=>escuela.clases)
  @JoinColumn({name: "fk_id_clase"})
  escuela:Escuela

 //*** Relación entre clases y estudiantes -> muchos a muchos: ***
@ManyToMany(()=>Estudiante,estudiantes=>estudiantes.clases)
@JoinTable({name:"clase_estudiante"}) // JoinTable es obligatorio, el nombre es opcional. 
estudiantes:Estudiante []; //<- array de estudiantes


    constructor(nombre: string) {
        this.nombre = nombre;
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

}
