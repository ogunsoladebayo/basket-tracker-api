import { Migration } from '@mikro-orm/migrations';

export class Migration20220207222643 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "item" drop constraint if exists "item_created_at_check";');
    this.addSql('alter table "item" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "item" alter column "created_at" set default now();');

    this.addSql('alter table "user" drop constraint if exists "user_created_at_check";');
    this.addSql('alter table "user" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "created_at" set default now();');

    this.addSql('alter table "basket" drop constraint if exists "basket_created_at_check";');
    this.addSql('alter table "basket" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "basket" alter column "created_at" set default now();');

    this.addSql('alter table "basket_item" drop constraint if exists "basket_item_created_at_check";');
    this.addSql('alter table "basket_item" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "basket_item" alter column "created_at" set default now();');
  }

  async down(): Promise<void> {
    this.addSql('alter table "item" drop constraint if exists "item_created_at_check";');
    this.addSql('alter table "item" alter column "created_at" drop default;');
    this.addSql('alter table "item" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');

    this.addSql('alter table "user" drop constraint if exists "user_created_at_check";');
    this.addSql('alter table "user" alter column "created_at" drop default;');
    this.addSql('alter table "user" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');

    this.addSql('alter table "basket" drop constraint if exists "basket_created_at_check";');
    this.addSql('alter table "basket" alter column "created_at" drop default;');
    this.addSql('alter table "basket" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');

    this.addSql('alter table "basket_item" drop constraint if exists "basket_item_created_at_check";');
    this.addSql('alter table "basket_item" alter column "created_at" drop default;');
    this.addSql('alter table "basket_item" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
  }

}
