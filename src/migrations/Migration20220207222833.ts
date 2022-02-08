import { Migration } from '@mikro-orm/migrations';

export class Migration20220207222833 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "item" drop constraint if exists "item_updated_at_check";');
    this.addSql('alter table "item" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "item" alter column "updated_at" set default now();');

    this.addSql('alter table "user" drop constraint if exists "user_updated_at_check";');
    this.addSql('alter table "user" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "updated_at" set default now();');

    this.addSql('alter table "basket" drop constraint if exists "basket_updated_at_check";');
    this.addSql('alter table "basket" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "basket" alter column "updated_at" set default now();');

    this.addSql('alter table "basket_item" drop constraint if exists "basket_item_updated_at_check";');
    this.addSql('alter table "basket_item" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "basket_item" alter column "updated_at" set default now();');
  }

  async down(): Promise<void> {
    this.addSql('alter table "item" drop constraint if exists "item_updated_at_check";');
    this.addSql('alter table "item" alter column "updated_at" drop default;');
    this.addSql('alter table "item" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "user" drop constraint if exists "user_updated_at_check";');
    this.addSql('alter table "user" alter column "updated_at" drop default;');
    this.addSql('alter table "user" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "basket" drop constraint if exists "basket_updated_at_check";');
    this.addSql('alter table "basket" alter column "updated_at" drop default;');
    this.addSql('alter table "basket" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "basket_item" drop constraint if exists "basket_item_updated_at_check";');
    this.addSql('alter table "basket_item" alter column "updated_at" drop default;');
    this.addSql('alter table "basket_item" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
  }

}
