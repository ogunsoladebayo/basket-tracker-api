import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Collection, Entity, Enum, OneToMany, Property } from "@mikro-orm/core";
import { Basket } from ".";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
	@Property({ unique: true })
	username!: string;
	@Property({ hidden: true })
	hashedPassword: string;

	@Property({ hidden: true, persist: false })
	set password(value: string) {
		const salt = bcrypt.genSaltSync(10);
		const password = bcrypt.hashSync(value, salt);
		this.hashedPassword = password;
	}

	@Enum(() => UserRole)
	role?: UserRole = UserRole.CUSTOMER;

	@Property({ persist: false })
	get token() {
		return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRE
		});
	}

	@OneToMany(() => Basket, (basket) => basket.user, { orphanRemoval: true, nullable: true })
	baskets = new Collection<Basket>(this);

	constructor(username: string, password: string) {
		super();
		this.username = username;
		this.password = password;
	}
}

export enum UserRole {
	CUSTOMER = "customer",
	SALES_REP = "sales"
}
