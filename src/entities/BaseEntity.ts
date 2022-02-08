import { PrimaryKey, Property } from "@mikro-orm/core";
import { hidden } from "colors";

export abstract class BaseEntity {
	@PrimaryKey()
	id!: number;

	@Property({ defaultRaw: "now()", onCreate: () => new Date(), hidden: true })
	createdAt!: Date;

	@Property({ defaultRaw: "now()", hidden: true })
	updatedAt: Date = new Date();
}
