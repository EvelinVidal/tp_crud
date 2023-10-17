import { Controller, Get, Post, Body,  Param, Delete, Put} from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadDto } from './dto/ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}
  //*****   CREATE   *****/

  @Post('crear')
  async crearCiudad(@Body() CiudadDto: CiudadDto): Promise<boolean> {
    return this.ciudadService.create(CiudadDto);
  }

  //*****   READ   *****/
  @Get('raw')
  async getAllRaw(): Promise<Ciudad[]> {
    return await this.ciudadService.findAllRaw();
  }
  @Get('orm')
  async getAllOrm(): Promise<Ciudad[]> {
    return await this.ciudadService.findAllOrm();
  }
  @Get(':id') // -> cambia con los id
  async getId(@Param('id') id: number): Promise<Ciudad> {
    return await this.ciudadService.findById(id);
  }
  //***** UPDATE   *****/
  @Put('actualizar/:id')
  async actualizarCiudadId(
    @Body() CiudadDto: CiudadDto,
    @Param('id') id: number,
  ): Promise<string> {
    return this.ciudadService.update(CiudadDto, id);
  }

  //*****   DELETE   *****/
  @Delete('eliminar/:id')
  async eliminarCiudad(@Param('id') id: number): Promise<Ciudad> {
    return await this.ciudadService.delete(id);
  }
}
