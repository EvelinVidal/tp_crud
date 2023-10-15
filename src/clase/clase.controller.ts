import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { Clase } from './entities/clase.entity';

@Controller('clase')
export class ClaseController {
  constructor(private readonly claseService: ClaseService) {}

  //**   CREATE    */
  @Post('crear')
  async crearClase(@Body() clase:Clase): Promise<boolean>{
    return await this.claseService.create(clase);
  }
  //**   READ    */
  @Get('obtenerAll')
  async buscarTodos(): Promise<Clase[]>{
    return await this.claseService.findAll();
  }
  @Get('obtener/:id')
  async buscarId(@Param('id') id:number) : Promise<Clase>{
    return await this.claseService.findOne(id);
  }
  //**   UPDATE    */
  @Put('actualizar/:id')
  async actualizarClase(@Body() clase:Clase,@Param('id')id:number ): Promise<String>{
    return await this.claseService.update(id,clase);
  }
  //**   DELETE    */
  @Delete('eliminar/:id')
  async eliminarClase(@Param('id') id:number):Promise<boolean> {
    return await this.claseService.remove(id);
  }
}
