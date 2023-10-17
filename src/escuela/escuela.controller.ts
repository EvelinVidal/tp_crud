import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { EscuelaDto } from './dto/escuela.dto';

@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  //*****   CREATE   *****/
  @Post('new')
  async create(@Body() escuelaDto: EscuelaDto):Promise<boolean> {
    return await this.escuelaService.create(escuelaDto);
  }
 
  //*****   READ   *****/
  @Get('get-all')
  async findAll():Promise<any>{
    return await this.escuelaService.findAll();
  }

  //*****   UPDATE   *****/
  @Put('modificar-escuela/:id')
  update(@Param('id') id: number, @Body()EscuelaDto: EscuelaDto) {
    return this.escuelaService.update( id, EscuelaDto);
  }

  //*****   DELETE   *****/
  @Delete('eliminar/:id')
  remove(@Param('id') id: number) {
    return this.escuelaService.remove(id);
  }
}
