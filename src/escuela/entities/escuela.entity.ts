import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { ClaseService } from 'src/clase/clase.service';
import { Clase } from 'src/clase/entities/clase.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'escuela' })
export class Escuela {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  domicilio: string;
// relación entre escuela y ciudad -> muchos a uno

  @ManyToOne(()=>Ciudad,ciudad=>ciudad.escuelas) // referencia a escuelas. Muchas escuelas pueden referenciar un elemento de ciudad
  @JoinColumn({name: "id_ciudad"}) // esto es opcional, es para definir el nombre del atributo FK en la tabla que lo crea, en este caso Escuela contiene id ciudad como FK. 
  ciudad:Ciudad;   // propiedad que permite la conexion entre tablas, tamb permite acceder al array de escuelas 


  // relación entre escuela y clase -> muchos a uno. 
@OneToMany(()=>Clase,clases=>clases.escuela)
clases:Clase[];
  // 2. constructor
  constructor(nombre: string, domicilio: string) {
    nombre = this.nombre;
    domicilio = this.domicilio; 
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
  public getDomicilio(): string {
    return this.domicilio;
  }
  public setDomicilio(domicilio: string) {
    this.domicilio = domicilio;
  }
}
