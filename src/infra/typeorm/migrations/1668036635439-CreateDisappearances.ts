import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDisappearances1668036635439
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'disappearances',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'situation',
            type: 'varchar',
            enum: ['MISSING', 'FOUND', 'SIGHTED'],
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'latitude',
            type: 'decimal',
          },
          {
            name: 'longitude',
            type: 'decimal',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'varchar',
            length: '2',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('disappearances');
  }
}
