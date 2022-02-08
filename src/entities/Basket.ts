import { Collection, Entity, ManyToOne, OneToMany, OneToOne, Property } from "@mikro-orm/core";
import { BasketItem, User } from ".";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Basket extends BaseEntity {
	@Property()
	checkedOut: boolean = false;

	@ManyToOne(() => User, { wrappedReference: true, nullable: false })
	user!: User;

	@OneToMany(() => BasketItem, (basketItem) => basketItem.basket)
	basketItems = new Collection<BasketItem>(this);
}
