import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Clase } from 'src/clase/entities/clase.entity';
import { EstudianteClase } from './entities/clase_estudiante.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Clase)
    private claseRepository: Repository<Clase>,
    @InjectRepository(EstudianteClase)
    private estudianteClaseRepository: Repository<EstudianteClase>,
  ) {}

  //** CREATE */
  async create(estudianteDto: EstudianteDto) {
    // const fechaActual = new Date() -> puedo obtener la fecha actual y usarla como parametro en la creación de estudiante. new Estudiante (..., fechaActual)
    // const estudiante=new Estudiante(estudianteDto.nombre, estudianteDto.apellido, estudianteDto.fecha_nacimiento)
    // const estudianteGuardado : Estudiante = await this.estudianteRepository.save(estudiante)
    const estudiante: Estudiante = await this.estudianteRepository.save(
      new Estudiante(
        estudianteDto.nombre,
        estudianteDto.apellido,
        estudianteDto.fecha_nacimiento,
      ),
    ); // combina las lineas ant
    if (estudiante) return `se creó el estudiante: ${estudiante.nombre}`;
    else return 'no se pudo crear el estudiante ';
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

  //** ADD CLASE */
  async addClase(body): Promise<any> {
    const { claseId, estudianteId } = body;
    const estudiante = await this.estudianteRepository.findOne({
      where: { id: estudianteId },
    }); // busca el estudiante por id
    if (!estudiante)
      return `no se encontró ese estudiante con el id ${estudianteId}`; // si no existe se muestra este texto
    const clase = await this.claseRepository.findOne({
      where: { id: claseId },
    });
    if (!clase) return 'error - no se encontró clase';
    const clase_estudiante = await this.estudianteClaseRepository.findOne({
      where: { claseId: claseId, estudianteId: estudianteId },
    }); // si
    if (clase_estudiante) return 'el estudiante ya tiene asignada esa clase';
    return await this.estudianteClaseRepository.save(
      new EstudianteClase(estudianteId, claseId),
    );
  }

  //** FIND ALL */
  async findAll(): Promise<any> {
    return await this.estudianteRepository.find();
  }

  
  //**UPDATE  */

  async update(EstudianteDto: EstudianteDto, id: number): Promise<string> {
    const findEstudiante: FindOneOptions = { where: { id: id } };
    let estudiante: Estudiante = await this.estudianteRepository.findOne(
      findEstudiante,
    );
    if (!estudiante)
      throw new Error('no se pudo encontrar el estudiante a modificar');
    else {
      let estudianteAnterior = estudiante.getNombre();
      estudiante.setNombre(EstudianteDto.nombre);
      estudiante = await this.estudianteRepository.save(estudiante); 
      return `ok - ${estudianteAnterior} --> ${EstudianteDto.nombre}`;
    }
  }

  //** REMOVE */
  async remove(id: number) {
    try {
      const aux: FindOneOptions = { where: { id: id } };
      let estudiante: Estudiante = await this.estudianteRepository.findOne(aux);
      if (!estudiante) throw new Error('no se encontró el estudiante');
      else {
        await this.estudianteRepository.remove(estudiante);
        return { id: id, message: 'se elimino exitosamente' }; // ->retorna json
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: ' ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}

