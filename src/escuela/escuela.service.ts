import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EscuelaDto } from './dto/escuela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class EscuelaService {
  constructor(
    @InjectRepository(Escuela)
    private readonly escuelaRepository: Repository<Escuela>,
  ) {}

  //*****   CREATE   *****/
  async create(EscuelaDto: EscuelaDto): Promise<boolean> {
    try {
      let escuela: Escuela = await this.escuelaRepository.save(
        new Escuela(EscuelaDto.nombre, EscuelaDto.nombre),
      );
      if (escuela) return true;
      else throw new Error('no se pudo crear la escuela');
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

  
  //*****   READ   *****/
  async findAll(): Promise<any> {
    return await this.escuelaRepository.find();
  }


  //*****   UPDATE   *****/
  async update(id: number, EscuelaDto: EscuelaDto): Promise<string> {
    const findEscuelaById: FindOneOptions = { where: { id: id } };
    let escuela: Escuela = await this.escuelaRepository.findOne(
      findEscuelaById,
    );
    if (!escuela)
      throw new Error('no se pudo encontrar la escuela a modificar');
    else {
      let nombreAnterior = escuela.getNombre();
      let direccionAnterior = escuela.getDomicilio();
      escuela.setNombre(EscuelaDto.nombre);
      escuela.setDomicilio(EscuelaDto.domicilio);
      escuela = await this.escuelaRepository.save(escuela);
      return `datos actualizados - ${nombreAnterior} - ${direccionAnterior}---> nuevos datos: ${EscuelaDto.nombre} ${EscuelaDto.domicilio}`;
    }
  }


  //*****   DELETE   *****/
  async remove(id: number): Promise<any> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let escuela: Escuela = await this.escuelaRepository.findOne(criterio);
      if (!escuela) throw new Error('no se pudo encontrar  la escuela');
      else {
        await this.escuelaRepository.remove(escuela);
        return { id: id, message: 'se elimino correctamente' };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en ciudad - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
