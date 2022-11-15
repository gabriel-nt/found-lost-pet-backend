import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnImageInDisappearancesTable1668466852324
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'disappearances',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        default: null,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('disappearances', 'image');
  }
}
