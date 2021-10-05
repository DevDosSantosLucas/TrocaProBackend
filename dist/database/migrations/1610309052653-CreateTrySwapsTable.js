"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTrySwapsTable1610309052653 = void 0;
const typeorm_1 = require("typeorm");
class CreateTrySwapsTable1610309052653 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
            name: "swaps",
            columns: [
                {
                    name: 'swap_id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'user_id',
                    type: 'string'
                },
                {
                    name: 'item_id',
                    type: 'uuid'
                },
                {
                    name: 'targed_item_id',
                    type: 'uuid'
                },
            ],
            foreignKeys: [
                {
                    name: 'item_info',
                    columnNames: ['item_id'],
                    referencedTableName: 'items',
                    referencedColumnNames: ['item_id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE' // Quando o orphanege for deletado as imagem será também deletadas;
                },
                {
                    name: 'item_info_targed',
                    columnNames: ['targed_item_id'],
                    referencedTableName: 'items',
                    referencedColumnNames: ['item_id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE' // Quando o orphanege for deletado as imagem será também deletadas;
                }
            ]
        }));
    }
    async down(queryRunner) {
        //DESFAZER O QUE FOI FEITO NO UP
        await queryRunner.dropTable('swaps');
    }
}
exports.CreateTrySwapsTable1610309052653 = CreateTrySwapsTable1610309052653;
