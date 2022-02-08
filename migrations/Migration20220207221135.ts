import { Migration } from '@mikro-orm/migrations';

export class Migration20220207221135 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "item" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "price" int not null);');
    this.addSql('alter table "item" add constraint "item_name_unique" unique ("name");');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "hashed_password" varchar(255) not null, "role" text check ("role" in (\'customer\', \'sales\')) not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "basket" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "checked_out" boolean not null, "user_id" int not null);');

    this.addSql('create table "basket_item" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "quantity" int not null, "active" boolean not null, "item_id" int not null, "basket_id" int not null);');

    this.addSql('alter table "basket" add constraint "basket_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "basket_item" add constraint "basket_item_item_id_foreign" foreign key ("item_id") references "item" ("id") on update cascade;');
    this.addSql('alter table "basket_item" add constraint "basket_item_basket_id_foreign" foreign key ("basket_id") references "basket" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "basket_item" drop constraint "basket_item_item_id_foreign";');

    this.addSql('alter table "basket" drop constraint "basket_user_id_foreign";');

    this.addSql('alter table "basket_item" drop constraint "basket_item_basket_id_foreign";');

    this.addSql('drop table if exists "item" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "basket" cascade;');

    this.addSql('drop table if exists "basket_item" cascade;');
  }

}
