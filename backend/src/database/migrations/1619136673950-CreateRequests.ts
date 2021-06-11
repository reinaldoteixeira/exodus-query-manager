import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRequests1619136673950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'requests',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'user',
            type: 'varchar',
          },
          {
            name: 'host',
            type: 'varchar',
          },
          {
            name: 'databases',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'time_to_run',
            type: 'varchar',
          },
          {
            name: 'schedule',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ddl_command',
            type: 'mediumtext',
          },
          {
            name: 'status',
            type: 'tinyint',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('requests');
  }
}
