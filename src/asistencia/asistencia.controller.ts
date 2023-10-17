import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaDto } from './dto/asistencia.dto';

@Controller('asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  //*****   CREATE   *****/
  @Post('crear-asistencia')
  async create(@Body() asistenciaDto: AsistenciaDto): Promise<any> {
    return await this.asistenciaService.create(asistenciaDto);
  }
  //*****   READ   *****/
  @Get()
  findAll() {
    return this.asistenciaService.findAll();
  }

  //*****   DELETE   *****/
  @Delete('eliminar-asistencia')
  async remove(@Body() AsistenciaDto: AsistenciaDto) {
    return await this.asistenciaService.remove(AsistenciaDto);
  }
}
