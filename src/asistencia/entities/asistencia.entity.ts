import { Clase } from "src/clase/entities/clase.entity";
import { EstudianteClase } from "src/estudiante/entities/clase_estudiante.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity({name:"asistencia"})
export class Asistencia {
    
    @PrimaryColumn({name:"estudianteClaseClaseId"})
    claseId:number;
    
    @PrimaryColumn({name:"estudianteClaseEstudianteId"})
    estudianteId:number;

    @Column()
    fecha:Date;

    constructor(claseId:number,estudianteId:number,fecha:Date){
        this.claseId=claseId;
        this.estudianteId= estudianteId;
        this.fecha=fecha;
    }
        //** relacion uno a muchos con Estudiante */
        @ManyToOne(()=>EstudianteClase,estudianteClase=>estudianteClase.asistencias)
        @JoinColumn()
        estudianteClase:EstudianteClase;

}
