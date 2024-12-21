import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import * as config from '../config/config.json';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: dbConfig.dialect as any,
      host: dbConfig.host,
      port: parseInt(dbConfig.port, 10) || 5432,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      autoLoadModels: true,
      synchronize: false,
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
