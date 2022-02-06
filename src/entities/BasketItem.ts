import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Basket } from "./Basket";
import { Item } from "./Item";

@Entity()
export class BasketItem {
	@PrimaryKey()
	id!: number;

	@Property()
	quantity!: number;

	@ManyToOne(() => Item, { wrappedReference: true, nullable: false })
	item!: Item;

	@ManyToOne(() => Basket, { wrappedReference: true, nullable: false })
	basket!: Basket;
}
