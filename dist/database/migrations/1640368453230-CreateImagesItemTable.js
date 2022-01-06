"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImagesItemTable1640368453230 = void 0;
const typeorm_1 = require("typeorm");
class CreateImagesItemTable1640368453230 {
    async up(queryRunner) {
        queryRunner.createTable(new typeorm_1.Table({
            name: "images",
            columns: [
                {
                    name: 'image_id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
                {
                    name: 'item_id',
                    type: 'uuid'
                }
            ],
            foreignKeys: [
                {
                    name: 'imageitem',
                    columnNames: ['item_id'],
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
        await queryRunner.dropTable('images');
    }
}
exports.CreateImagesItemTable1640368453230 = CreateImagesItemTable1640368453230;
