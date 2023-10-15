import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('nuevo')
  create(@Body() estudianteDto: EstudianteDto) {
    return this.estudianteService.create(estudianteDto);
  }

  // @Post('con_relacion/:id') 
  // async createConRelacion(@Body() estudianteDto: EstudianteDto):Promise<boolean> { 
  //   return await this.estudianteService.addClase(estudianteDto);
  // }
  @Post('agregar-clase') 
  async agregarClase(@Body() body:any):Promise<any> { 
    return await this.estudianteService.addClase(body);
  }
  @Get()
  async findAll() {
    return await this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() estudianteDto: EstudianteDto) {
    return this.estudianteService.update(+id, estudianteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
