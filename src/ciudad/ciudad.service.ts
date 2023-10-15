import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CiudadDto } from './dto/ciudad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CiudadService {
  private ciudades: Ciudad[] = []; // funcion que retorna los elementos de la tabla
  constructor(
    @InjectRepository(Ciudad) // -> inyecta un repositorio correspondiente a la entidad Ciudad.El repositorio se comunica con la base de datos, entidad y servicio.
    private ciudadRepository: Repository<Ciudad>,
  ) {}

  async findAllRaw(): Promise<Ciudad[]> { // se llama tipo de consulta raw.
    this.ciudades = [] // -> asi no acumula las ciudades. 
    let datos = await this.ciudadRepository.query('select * from ciudad'); // -> el repositorio permite la comunicacion con la base de datos
    // query permite hacer consultas
    datos.forEach((element) => {
      // por cada elemento que trae de la bd
      let ciudad: Ciudad = new Ciudad(element['nombre']); //-> creamos un nuevo objeto ciudad con los parametros de la tabla, en este caso solo necesitamos el nombre.
      this.ciudades.push(ciudad); //-> por cada ciudad que obtenemos, hacemos push y la agregamos,
    });
    return this.ciudades;
  }
// misma funcion usando los métodos del repositorio:
  async findAllOrm():Promise<Ciudad[]>{
    return await this.ciudadRepository.find(); //-> me devuelve los elementos en array y el tipo de dato (son objetos de tipo ciudad);
  }

async findById(id:number):Promise<Ciudad> {
 try{ const criterio : FindOneOptions= {where: {id:id}} 
  let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio)// aca no va el dto porque cuando traemos el dato de la bs traemos la ciudad. 
  if (ciudad)
    return ciudad;
  else 
throw new Error ('No se encuentra la ciudad');
  }
  catch (error) {//-> toma el error que cree
   throw new HttpException({
status:HttpStatus.CONFLICT, // <- forma mas prolija de mostrar los errores.  
error: "Error en ciudad - " + error

   }, HttpStatus.NOT_FOUND);          // http exception que permite controlar mejor los errores. Es un json  que encuentre el error y el status.

  }
}

async create(ciudadDTO:CiudadDto):Promise<boolean>{ // falta verificar si la ciudad está o no en la bd
try{   let ciudad : Ciudad = await this.ciudadRepository.save(new Ciudad(ciudadDTO.nombre));
  if (ciudad)
    return true;
  else
     throw new Error('no se pudo crear la ciudad');
}
catch (error){
  throw new HttpException({
      status:HttpStatus.NOT_FOUND,
      error: 'Error en ciudad - ' + error
  }, HttpStatus.NOT_FOUND);
}
  }

// async create2(ciudadDTO:CiudadDto):Promise<CiudadDto>{ // devuelve la ciudad con su id. El metodo save devuelve el objeto que creo. 
//   return this.ciudadRepository.save(new Ciudad (ciudadDTO.nombre));  // estamos creando un nuevo objeto ciudad y le pasamos como parámetro el nombre del dto.
// }
// async crear(ciudadDTO:CiudadDto):Promise<CiudadDto>{ // -> este es el mismo método que create2 pero de distinta forma
// let ciudad: Ciudad = new Ciudad("Tandil")
//   return this.ciudadRepository.save(new Ciudad(ciudadDTO.nombre))
// }

async update(CiudadDto:CiudadDto, id:number):Promise<string>{
  const criterio : FindOneOptions = { where : {id:id}};
  let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
  if (!ciudad)
    throw new Error ('no se pudo encontrar la ciudad a modificar');
  else  
 { 
  let ciudadVieja = ciudad.getNombre();
    ciudad.setNombre(CiudadDto.nombre);
  ciudad = await this.ciudadRepository.save(ciudad); // save se encarga de distinguir entre create y update. Tiene las dos funciones y reconoce cuando debe crear y cuando modificar un recurso por el tipo de petición. 
  return `ok - ${ciudadVieja} --> ${CiudadDto.nombre}`
}
}

async delete(id:number):Promise<any>{
  try {
    const criterio : FindOneOptions = { where : {id:id}};
  let ciudad : Ciudad = await this.ciudadRepository.findOne(criterio);
  if (!ciudad)
  throw new Error ('no se pudo encontrar la ciudad a modificar');
  else  
       { await this.ciudadRepository.remove(ciudad)
    return {id:id, 
            message:'se elimino exitosamente'} // ->retorna json
    }
          }
          catch (error){
            throw new HttpException({
                status:HttpStatus.NOT_FOUND,
                error: 'Error en ciudad - ' + error
            }, HttpStatus.NOT_FOUND);
          }
}}