import { EstudianteClase } from 'src/estudiante/entities/clase_estudiante.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'asistencia' })
export class Asistencia {
  @PrimaryColumn({ name: 'estudianteClaseClaseId' })
  claseId: number;

  @PrimaryColumn({ name: 'estudianteClaseEstudianteId' })
  estudianteId: number;

  @Column()
  fecha: Date;

  /*****   Relación entre Asistencia y EstudianteClase ---> uno a muchos  *****/
  @ManyToOne(
    () => EstudianteClase,
    (estudianteClase) => estudianteClase.asistencias)
  @JoinColumn()
  estudianteClase: EstudianteClase;

  constructor(claseId: number, estudianteId: number, fecha: Date) {
    this.claseId = claseId;
    this.estudianteId = estudianteId;
    this.fecha = fecha;
  }

  public getFecha(): Date {
    return this.fecha;
  }
  public setFecha(fecha: Date) {
    this.fecha = fecha;
  }
}
