import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { Clase } from 'src/clase/entities/clase.entity';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela, Clase, Ciudad])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
