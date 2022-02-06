import { BaseEntity, Entity, Enum, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Basket } from "./Basket";

@Entity()
export class User {
	@PrimaryKey()
	id!: number;

	@Property()
	username!: string;

	@Property()
	password!: string;

	@Enum(() => UserRole)
	role?: UserRole;

	@OneToOne(() => Basket, (basket) => basket.user, { owner: true, orphanRemoval: true })
	basket!: Basket;
}

export enum UserRole {
	CUSTOMER = "customer",
	SALES_REP = "sales rep"
}
