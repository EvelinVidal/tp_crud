import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AsistenciaDto } from './dto/asistencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Asistencia } from './entities/asistencia.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { EstudianteClase } from 'src/estudiante/entities/clase_estudiante.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository:Repository<Asistencia>,
    @InjectRepository(EstudianteClase)
    private readonly estudianteClaseRepository:Repository<EstudianteClase>) {}

    //**   CREATE    */
  async create(asistenciaDto: AsistenciaDto) {
    let fecha = new Date
    const { estudianteId, claseId } = asistenciaDto;
    const asistencia_estudiante = await this.estudianteClaseRepository.findOne({
      where: { claseId: claseId, estudianteId: estudianteId },
    });
    if (!asistencia_estudiante)
      return 'no se encontró';
    return await this.asistenciaRepository.save(new Asistencia(claseId,estudianteId, fecha))
  }
// para agregar asistencia deben tener una clase asignada

  //** READ    */
  findAll() {
    return this.asistenciaRepository.find();
  }
 
  async remove( asistenciaDto: AsistenciaDto) {
   try { const encontrarAsistencia = await this.asistenciaRepository.find({
      where:{
      claseId:asistenciaDto.claseId,
      estudianteId:asistenciaDto.estudianteId
      }
    })
    if(encontrarAsistencia.length === 0)  // el metodo find no devuelve null, sino un array vacío si no hay coincidencia o un resultado vacío. 
    return "no se encontro coincidencia"
 else{  await this.asistenciaRepository.remove(encontrarAsistencia);
    return "eliminado"}
      }
      catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: ' ' + error,
          },
          HttpStatus.NOT_FOUND,
        );
      } 
}}
