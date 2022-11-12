import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions => {
  const ormOptions = {
    type: 'postgres',
    host: config.getDatabaseHost(),
    port: config.getDatabasePort(),
    username: config.getDatabaseUser(),
    password: config.getDatabasePassword(),
    database: config.getDatabaseName(),
    autoLoadEntities: true,
    logging: true,
    migrations: ['../../typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: '../../typeorm/migrations',
    },
    retryAttempts: 1,
  } as TypeOrmModuleOptions;

  if (config.getDatabaseHost() !== 'localhost') {
    Object.assign(ormOptions, {
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  return ormOptions;
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
