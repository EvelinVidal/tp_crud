import { Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Escuela } from 'src/escuela/entities/escuela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Escuela])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudianteModule {}
