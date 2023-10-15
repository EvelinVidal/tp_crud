import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadDto } from './dto/ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';
import { dot } from 'node:test/reporters';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get('raw')
  async getAllRaw():Promise<Ciudad[]>{ 
  return await this.ciudadService.findAllRaw()
}
@Get('orm')
async getAllOrm():Promise<Ciudad[]>{ 
return await this.ciudadService.findAllOrm()
}
@Get(':id') // -> cambia con los id
async getId(@Param('id')id:number):Promise<Ciudad>{
  return await this.ciudadService.findById(id);
}
@Post('crear')
async crearCiudad(@Body()CiudadDto:CiudadDto):Promise<boolean>{
  return this.ciudadService.create(CiudadDto);
}
@Put('actualizar/:id')
async actualizarCiudadId(@Body()CiudadDto:CiudadDto, @Param ('id') id:number):Promise<string>{
return this.ciudadService.update(CiudadDto, id)
}
@Delete('eliminar/:id')
async eliminarCiudad(@Param('id')id:number):Promise<Ciudad>{
  return await this.ciudadService.delete(id);
}
}
