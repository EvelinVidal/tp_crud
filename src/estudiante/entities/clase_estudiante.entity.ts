import { Entity, JoinColumn,  ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { Asistencia } from 'src/asistencia/entities/asistencia.entity';

@Entity({ name: 'clase_estudiante' })
export class EstudianteClase {
  @PrimaryColumn()
  estudianteId: number;

  @PrimaryColumn()
  claseId: number;

  //*****   Relación entre Clase_estudiante y Estudiante ---> muchos a uno   *****/
  @ManyToOne(() => Estudiante, (estudiante) => estudiante.estudianteClases)
  @JoinColumn()
  estudiante: Estudiante;

  //*****   Relación entre Clase_estudiante y Clase ---> muchos a uno   *****/
  @ManyToOne(() => Clase, (clase) => clase.estudianteClases)
  @JoinColumn()
  clase: Clase;

  //*****   Relación entre Clase_estudiante y Asistencia ---> uno a muchos  *****/    
  @OneToMany(() => Asistencia, (asistencia) => asistencia.estudianteClase)
  asistencias: Asistencia[];

  constructor(estudianteId: number, claseId: number) {
    this.estudianteId = estudianteId;
    this.claseId = claseId;
  }
}
