"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1640368302133 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1640368302133 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS  "uuid-ossp"');
        //REALIZAR ALTERAÇÕES
        //CRIAR TABELA, CRIAR UM NOVO CAMPO, DELETAR ALGUM CAMPO
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'user_id',
                    type: 'uuid',
                    // unsigned: true, //Essa coluna não pode ser negativa;
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'whatsapp',
                    // type: 'decimal',
                    type: 'numeric',
                    scale: 14,
                    isUnique: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'city',
                    type: 'varchar',
                },
                {
                    name: 'uf',
                    type: 'varchar',
                    scale: 2,
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
exports.CreateUsersTable1640368302133 = CreateUsersTable1640368302133;
// CREATE TABLE users(
//     user_id serial PRIMARY KEY,
//     whatsapp bigint UNIQUE NOT NULL,
//     name varchar(255) NOT NULL,
//     city varchar(255) NOT NULL,
//     uf varchar(2) NOT NULL,
//     avatar varchar(255) NOT NULL,
//     password varchar(255) NOT NULL
//  );
// yarn typeorm migration:create -n CreateUsersTable
