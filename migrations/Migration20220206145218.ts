import { Migration } from '@mikro-orm/migrations';

export class Migration20220206145218 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "item" ("id" serial primary key, "name" varchar(255) not null, "price" int4 not null);');

    this.addSql('create table "basket" ("id" serial primary key);');

    this.addSql('create table "basket_item" ("id" serial primary key, "quantity" int4 not null, "item_id" int4 not null, "basket_id" int4 not null);');

    this.addSql('create table "user" ("id" serial primary key, "username" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in (\'customer\', \'sales rep\')) not null, "basket_id" int4 not null);');
    this.addSql('alter table "user" add constraint "user_basket_id_unique" unique ("basket_id");');

    this.addSql('alter table "basket_item" add constraint "basket_item_item_id_foreign" foreign key ("item_id") references "item" ("id") on update cascade;');
    this.addSql('alter table "basket_item" add constraint "basket_item_basket_id_foreign" foreign key ("basket_id") references "basket" ("id") on update cascade;');

    this.addSql('alter table "user" add constraint "user_basket_id_foreign" foreign key ("basket_id") references "basket" ("id") on update cascade;');
  }

}
