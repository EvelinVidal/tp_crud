import { IsDate } from 'class-validator';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EstudianteClase } from './clase_estudiante.entity';

@Entity({name:'estudiante'})
export class Estudiante {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  @IsDate()
  fecha_nacimiento: Date;
  
//*** Relación entre Clase y Estudiante-> muchos a muchos */ comentado porque cambio la relación entre tablas. Ahora es una relacion entre Clase y clase_estudiante; y Estudiante y clase_estudiante
// @ManyToMany(()=>Clase,clases=>clases.estudiantes)
// clases:Clase[]; // arreglo de clases 

//** Relación uno a muchos de Estudiante y EstudianteClase */
@OneToMany(()=>EstudianteClase,estudianteClases=>estudianteClases.estudiante)
estudianteClases:EstudianteClase[];


//***Relación entre Estudiante y Ciudad -> muchos a muchos */
@ManyToMany(()=>Ciudad,ciudades=>ciudades.estudiantes)
ciudad:Ciudad[];

  constructor(nombre: string, apellido: string, fecha_nacimiento: Date) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecha_nacimiento = fecha_nacimiento;
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
  public getFechaNac(): Date {
    return this.fecha_nacimiento;
  }
  public setFechaNac(fecha_nacimiento: Date) {
    this.fecha_nacimiento = fecha_nacimiento;
  }
}
