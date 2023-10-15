import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Estudiante } from "./estudiante.entity";
import { Clase } from "src/clase/entities/clase.entity";
import { Asistencia } from "src/asistencia/entities/asistencia.entity";

@Entity({name:"clase_estudiante"})
export class EstudianteClase{
    @PrimaryColumn()
    estudianteId:number;

    @PrimaryColumn()
    claseId:number;

    //** relacion uno a muchos con Estudiante */
    @ManyToOne(()=>Estudiante,estudiante=>estudiante.estudianteClases)
    @JoinColumn()
    estudiante:Estudiante;

    //**relacion uno a muchos con Clase */
    @ManyToOne(()=>Clase,clase=>clase.estudianteClases)
    @JoinColumn()
    clase:Clase
    
    @OneToMany(()=>Asistencia,asistencia=>asistencia.estudianteClase)
    asistencias:Asistencia[];

    constructor (estudianteId:number,claseId:number){
        this.estudianteId=estudianteId;
        this. claseId=claseId;
    }

}
