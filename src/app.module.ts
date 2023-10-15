import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadModule } from './ciudad/ciudad.module';
import { ProfesorModule } from './profesor/profesor.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ClaseModule } from './clase/clase.module';
import { EscuelaModule } from './escuela/escuela.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type":"mysql",
      "host":"localhost",
      "port":3306,
      "username":"root",
      "password":"Misql8",
      "database":"db_colegio",
      "entities":[__dirname + "/**/**/**.entity{.ts,.js}"],
      // ["dist/**/**.entity{.ts,.js}"],
      "synchronize":true
    }),
    CiudadModule,
    ProfesorModule,
    ClaseModule,
    EstudianteModule,
    EscuelaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
