import { Collection, Entity, OneToMany, OneToOne, PrimaryKey } from "@mikro-orm/core";
import { BasketItem } from "./BasketItem";
import { User } from "./User";

@Entity()
export class Basket {
	@PrimaryKey()
	id!: number;

	@OneToOne(() => User, (user) => user.basket)
	user!: User;

	@OneToMany(() => BasketItem, (basketItem) => basketItem.basket)
	basketItemsToCheckout = new Collection<BasketItem>(this);

	@OneToMany(() => BasketItem, (basketItem) => basketItem.basket)
	basketItemsRemoved = new Collection<BasketItem>(this);
}
