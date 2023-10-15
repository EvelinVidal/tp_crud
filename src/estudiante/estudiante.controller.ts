import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { Estudiante } from './entities/estudiante.entity';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  //** Crear estudiante */
  @Post('nuevo')
  create(@Body() estudianteDto: EstudianteDto) {
    return this.estudianteService.create(estudianteDto);
  }

  // @Post('con_relacion/:id')
  // async createConRelacion(@Body() estudianteDto: EstudianteDto):Promise<boolean> {
  //   return await this.estudianteService.addClase(estudianteDto);
  // }

  //** agregar clase a Estudiante */
  @Post('agregar-clase')
  async agregarClase(@Body() body: any): Promise<any> {
    return await this.estudianteService.addClase(body);
  }

  //** obtener todos los estudiantes */
  @Get('get-all')
  async findAll(): Promise<Estudiante[]> {
    return await this.estudianteService.findAll();
  }

  //** Actualizar estudiante */
  @Put('modificar-estudiante/:id')
  async update(
    @Body() EstudianteDto: EstudianteDto,
    @Param('id') id: number,
  ): Promise<string> {
    return this.estudianteService.update(EstudianteDto, id);
  }

  //** Eliminar estudiante */
  @Delete('eliminar-estudiante/:id')
  remove(@Param('id') id: number): Promise<any> {
    return this.estudianteService.remove(id);
  }
}
