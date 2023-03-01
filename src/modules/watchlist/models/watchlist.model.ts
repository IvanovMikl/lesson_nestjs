import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { user } from 'src/user/models/user.model';

@Table
export class Watchlist extends Model {

   @ForeignKey(() => user)
   user: user;

   @Column
   name: string;

   @Column
   assetId: string;
}