import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPhoneAndEmailColunsInDisappearance1669419976722
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'disappearances',
      new TableColumn({
        name: 'phone',
        type: 'varchar',
        default: null,
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'disappearances',
      new TableColumn({
        name: 'email',
        type: 'varchar',
        default: null,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('disappearances', 'email');
    await queryRunner.dropColumn('disappearances', 'phone');
  }
}
