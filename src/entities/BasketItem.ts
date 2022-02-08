import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { Basket, Item } from ".";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class BasketItem extends BaseEntity {
	@Property()
	quantity!: number;

	@Property({ hidden: true })
	active: boolean = true;

	@ManyToOne(() => Item, { wrappedReference: true, nullable: false })
	item!: Item;

	@ManyToOne(() => Basket, { wrappedReference: true, nullable: false, hidden: true })
	basket!: Basket;
}
