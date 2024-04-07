import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['./dist/**/**.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  migrationsRun: true,
  migrations: ['./dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};

export const typeormConfigs: TypeOrmModuleAsyncOptions = {
  useFactory: () => datasourceOptions,
};

export default new DataSource(datasourceOptions);
