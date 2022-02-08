import { Basket } from "./entities/Basket";
import { BasketItem } from "./entities/BasketItem";
import { Item } from "./entities/Item";
import { User } from "./entities/User";

export default {
	entities: [User, Basket, BasketItem, Item],
	dbName: "BasketTracker",
	type: "postgresql"
};
