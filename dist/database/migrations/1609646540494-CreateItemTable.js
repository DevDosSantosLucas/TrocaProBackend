"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateItemTable1609646540494 = void 0;
const typeorm_1 = require("typeorm");
class CreateItemTable1609646540494 {
    async up(queryRunner) {
        //REALIZAR ALTERAÇÕES
        //CRIAR TABELA, CRIAR UM NOVO CAMPO, DELETAR ALGUM CAMPO
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'items',
            columns: [
                {
                    name: 'item_id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name_item',
                    type: 'varchar',
                },
                {
                    name: 'price',
                    type: 'varchar',
                },
                {
                    name: 'category',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'text'
                },
                {
                    name: 'user_id',
                    type: 'varchar',
                },
                {
                    name: 'user',
                    type: 'uuid'
                }
            ],
            foreignKeys: [
                {
                    name: 'item_fk',
                    columnNames: ['user'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['user_id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE' // Quando o orphanege for deletado as imagem será também deletadas;
                }
            ]
        }));
    }
    async down(queryRunner) {
        //DESFAZER O QUE FOI FEITO NO UP
        await queryRunner.dropTable('items');
    }
}
exports.CreateItemTable1609646540494 = CreateItemTable1609646540494;