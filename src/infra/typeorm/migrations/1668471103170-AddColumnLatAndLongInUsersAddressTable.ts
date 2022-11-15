import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnLatAndLongInUsersAddressTable1668471103170
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users_address',
      new TableColumn({
        name: 'latitude',
        type: 'varchar',
      }),
    );

    await queryRunner.addColumn(
      'users_address',
      new TableColumn({
        name: 'longitude',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users_address', 'longitude');
    await queryRunner.dropColumn('users_address', 'latitude');
  }
}
