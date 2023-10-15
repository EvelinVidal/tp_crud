import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { Ciudad_profesor } from 'src/ciudad/entities/ciudad_profesor.entity';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
    @InjectRepository(Ciudad_profesor)
    private readonly ciudadProfesorRepository: Repository<Ciudad_profesor>,
  ) {}

  //** CREATE */
  async create(CreateProfesorDto: CreateProfesorDto): Promise<boolean> {
    try {
      let profesor: Profesor = await this.ciudadRepository.save(
        new Profesor(CreateProfesorDto.nombre, CreateProfesorDto.apellido),
      );
      if (profesor) return true;
      else throw new Error('no se pudo agregar');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: ' - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /** CREATE DOMICILIO, método delegado por Ciudad_profesor */
  async createDomicilio(body) {
    // verifico si existe el profesor:
    const { ciudadId, profesorId, domicilio } = body; // vamos a desectructurar el body en variables diferentes.. esto ahorra escribir body.ciudadId,etc..
    const profesor = await this.profesorRepository.findOne({
      where: { id: profesorId },
    });
    if (!profesor)
      // si no es profesor
      return 'error - no existe este profesor';
    // verifico si existe la ciudad:
    const ciudad = await this.ciudadRepository.findOne({
      where: { id: ciudadId },
    });
    if (!ciudad)
      // si no existe la ciudad
      return 'error - no existe la ciudad para el profesor';
    // verificamos si el Profesor ya existe para evitar duplicados:
    const nuevo_domicilio = await this.ciudadProfesorRepository.findOne({
      where: { ciudadId: ciudadId, profesorId: profesorId },
    }); // la coma es igual a escribir AND para cumplir con los dos criterios. El profesor solo va a tener 1 domicilio dentro de esa ciudad
    if (nuevo_domicilio)
      // si encuentra uno devuelve que el domicilio ya existe. También podemos agregarle un update al domicilio
      return 'profesor ya tiene domicilio';
    return await this.ciudadProfesorRepository.save(
      new Ciudad_profesor(ciudadId, profesorId, domicilio),
    ); // si no existe el dom guardamos el nuevo, datos provenientes del body. El constructor de ciudad_profesor recibe estos 3 parámetros para la creación.
  }

  //** READ  */
  async findAll() {
    return await this.profesorRepository.find();
  }

  //** UPDATE */
  async update(
    CreateProfesorDto: CreateProfesorDto,
    id: number,
  ): Promise<string> {
    const findProfesorById: FindOneOptions = { where: { id: id } };
    let profesor: Profesor = await this.profesorRepository.findOne(
      findProfesorById,
    );
    if (!profesor) throw new Error('no se pudo encontrar');
    else {
      let nombreAnterior = profesor.getNombre();
      let apellidoAnterior = profesor.getApellido();
      profesor.setNombre(CreateProfesorDto.nombre);

      profesor = await this.ciudadRepository.save(profesor);
      return `ok - ${nombreAnterior} ${apellidoAnterior} --> ${CreateProfesorDto.nombre} ${CreateProfesorDto.apellido}`;
    }
  }

  //** DELETE  */
  async remove(id: number): Promise<any> {
    try {
      const findProfesor: FindOneOptions = { where: { id: id } };
      let profesor: Profesor = await this.profesorRepository.findOne(
        findProfesor,
      );
      if (!profesor) throw new Error('no se pudo encontrar');
      else {
        await this.profesorRepository.remove(profesor);
        return { id: id, message: 'se elimino correctamente' }; // -> retorna json
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: ' - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
