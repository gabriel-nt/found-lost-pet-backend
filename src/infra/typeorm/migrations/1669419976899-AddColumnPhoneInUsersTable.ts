import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnPhoneInUsersTable1669419976899
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        default: null,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'phone');
  }
}
