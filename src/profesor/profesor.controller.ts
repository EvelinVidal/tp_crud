import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  //** CREATE  */
  @Post('nuevo-profesor')
  async create(@Body() createProfesorDto: CreateProfesorDto) {
    return await this.profesorService.create(createProfesorDto);
  }

  @Post('agregar-domicilio')
  async addDomicilio(@Body() body: any): Promise<any> {
    return await this.profesorService.createDomicilio(body);
  }
  //**  READ   */
  @Get('get-all')
  async findAll() {
    return await this.profesorService.findAll();
  }

//**  UPDATE   */
  @Put('modificar-profesor/:id')
  update(
    @Param('id') id: number,
    @Body() createProfesorDto: CreateProfesorDto,
  ) {
    return this.profesorService.update(createProfesorDto, id);
  }

  //**   DELETE   */
  @Delete('eliminar/:id')
  async remove(@Param('id') id: number) {
    return await this.profesorService.remove(id);
  }
}
