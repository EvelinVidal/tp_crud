import { Escuela } from "src/escuela/entities/escuela.entity";
import { EstudianteClase } from "src/estudiante/entities/clase_estudiante.entity";
import { Profesor } from "src/profesor/entities/profesor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'clase'})
export class Clase {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;

  //*****   Relación entre Clase y Profesor ---> muchos a uno   *****/    
  @ManyToOne(()=>Profesor,profesor=>profesor.clases)
  @JoinColumn({name: "fk_id_profesor"})
  profesor:Profesor;

  //*****   Relación entre Clase y Escuela ---> muchos a uno   *****/
  @ManyToOne(()=>Escuela,escuela=>escuela.clases)
  @JoinColumn({name: "fk_id_escuela"})
  escuela:Escuela

 //***** Relación entre Clase y Estudiante ---> muchos a muchos *****/ cambió la relación por eso está comentado */
// @ManyToMany(()=>Estudiante,estudiantes=>estudiantes.clases)
// @JoinTable({name:"clase_estudiante"}) // JoinTable es obligatorio, el nombre es opcional. 
// estudiantes:Estudiante []; //<- array de estudiantes


//*****   Relación entre Clase y EstudianteClase  ---> uno a muchos *****/
@OneToMany(()=>EstudianteClase,estudianteClases=>estudianteClases.clase)
estudianteClases:EstudianteClase[];


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
