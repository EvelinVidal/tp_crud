import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { ClaseModule } from './clase/clase.module';
import { EscuelaModule } from './escuela/escuela.module';

@Module({
  imports: [CiudadModule, ProfesorModule, EstudianteModule, AsistenciaModule, ClaseModule, EscuelaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
