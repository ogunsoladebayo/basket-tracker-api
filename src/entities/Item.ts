import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Item extends BaseEntity {
	@Property({ unique: true })
	name!: string;

	@Property()
	price!: number;
}
