import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { Estudiante } from './entities/estudiante.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { EstudianteClase } from './entities/clase_estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Clase, Ciudad, EstudianteClase])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
