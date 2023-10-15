import { Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';
import { Clase } from 'src/clase/entities/clase.entity';
import { EstudianteClase } from './entities/clase_estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(@InjectRepository(Estudiante)
    private estudianteRepository:Repository<Estudiante>,
    @InjectRepository(Clase)
    private claseRepository:Repository<Clase>,
    @InjectRepository(EstudianteClase)
    private estudianteClaseRepository:Repository<EstudianteClase>)
    {}

 async create(estudianteDto: EstudianteDto) {
  // const fechaActual = new Date() -> puedo obtener la fecha actual y usarla como parametro en la creación de estudiante. new Estudiante (..., fechaActual)
    // const estudiante=new Estudiante(estudianteDto.nombre, estudianteDto.apellido, estudianteDto.fecha_nacimiento)
    // const estudianteGuardado : Estudiante = await this.estudianteRepository.save(estudiante)
    const estudiante : Estudiante = await this.estudianteRepository.save(new Estudiante(estudianteDto.nombre, estudianteDto.apellido, estudianteDto.fecha_nacimiento)) // combina las lineas ant
    if(estudiante)
      return `se creó el estudiante: ${estudiante.nombre}`
    else 
    return 'no se pudo crear el estudiante '
  }

//   async createConRelacion(estudianteDto:EstudianteDto):Promise<boolean>{
//    const clase:Clase = await this.claseRepository.findOne({where: {id:1}})  //consultar si existe la clase x, para eso inyectamos la clase --> linea 13
//    const estudiante = new Estudiante(estudianteDto.nombre, estudianteDto.apellido, estudianteDto.fecha_nacimiento) // -> creo el estudiante
//     if (clase)
//      estudiante.clases = [clase];  //le asignamos la clase al estudiante.
//     await this.estudianteRepository.save(estudiante) // guardo el estudiante.
//      if(estudiante)
// return true
// else 
//     return false;
//   }

async addClase(body):Promise<any>{
  const {claseId,estudianteId} = body;
  const estudiante = await this.estudianteRepository.findOne({where:{id:estudianteId}}) // busca el estudiante por id 
  if (!estudiante)
    return  `no se encontró ese estudiante con el id ${estudianteId}` // si no existe se muestra este texto
  const clase = await this.claseRepository.findOne({where:{id:claseId}})
  if(!clase)
    return "error - no se encontró clase"
  const clase_estudiante = await this.estudianteClaseRepository.findOne({where:{claseId:claseId,estudianteId:estudianteId}}) // si 
  if (clase_estudiante)
    return "el estudiante ya tiene asignada esa clase";
  return  await this.estudianteClaseRepository.save(new EstudianteClase(estudianteId,claseId));
 }


  findAll() {
    return `This action returns all estudiante`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudiante`;
  }

  update(id: number, estudianteDto: EstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
