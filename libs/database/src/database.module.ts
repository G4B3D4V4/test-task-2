import { Global, Module } from '@nestjs/common';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Global()
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3360,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'rootpass',
      database: process.env.DB_NAME || 'fans_crm_dev_db',
      autoLoadModels: true,
      synchronize: false,
      models: ['./models/*.model{.js,.ts}'],
    }),
  ],
})
export class DatabaseModule {}
