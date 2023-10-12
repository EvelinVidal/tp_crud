import { MaxLength } from 'class-validator';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ciudad_profesor } from './ciudad_profesor.entity';

@Entity({ name: 'ciudad' })
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(255)
  nombre: string;

@OneToMany(()=>Escuela,escuela=>escuela.ciudad) // referencia a la entidad escuela. En la entidad Escuela debe haber una referencia a Ciudad !
public escuelas:Escuela[]; // creamos propiedad de la escuela. Tiene un array de escuelas xq una ciudad puede tener varias escuelas. -> podemos tomar esas esc en servicio

//***Relación entre Ciudad y Ciudad -> muchos a muchos */
@ManyToMany(()=>Estudiante,estudiantes=>estudiantes.ciudad)
@JoinTable({name:"ciudad_estudiante"})
estudiantes:Estudiante[];

@OneToMany(()=>Ciudad_profesor,domicilios=>domicilios.ciudad)
domicilios:Ciudad_profesor[];


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
