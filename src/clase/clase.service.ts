import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { Clase } from './entities/clase.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClaseService {
  constructor(
    @InjectRepository(Clase)
    private claseRepository: Repository<Clase>,
  ) {}

  //*****   CREATE   *****/
  async create(claseDto: Clase): Promise<boolean> {
    let clase: Clase = await this.claseRepository.save(
      new Clase(claseDto.nombre),
    );
    if (clase) return true;
    return false;
  }


  //*****   READ   *****/
  async findAll(): Promise<Clase[]> {
    return await this.claseRepository.find();
  }

  async findOne(id: number) {
    const criterio: FindOneOptions = { where: { id: id } };
    let clase: Clase = await this.claseRepository.findOne(criterio);
    if (clase) return clase;
    else return null;
  }


  //*****   UPDATE   *****/
  async update(id: number, claseDto: Clase): Promise<String> {
    const criterio: FindOneOptions = { where: { id: id } };
    let clase: Clase = await this.claseRepository.findOne(criterio);
    let nombreViejo = clase.getNombre();
    if (clase) {
      clase.setNombre(claseDto.getNombre());
      clase = await this.claseRepository.save(clase);
      if (clase) return `Se reemplazo: ${nombreViejo} --> ${clase.getNombre()}`;
      else return 'No se pudo reemplazaar';
    } else return 'no se encontro clase';
  }

  
  //*****   DELETE   *****/
  async remove(id: number): Promise<boolean> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      const clase: Clase = await this.claseRepository.findOne(criterio);
      if (clase) {
        await this.claseRepository.remove(clase);
        return true;
      } else throw new Error('No se encontro clase para eliminar');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Problemas en Clase - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
