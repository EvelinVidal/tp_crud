import { IsDate } from 'class-validator';
import { type } from 'os';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'estudiante' })
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
