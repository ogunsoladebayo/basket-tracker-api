import fs from "fs";
import { EntityManager, wrap } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Item } from "../src/entities";

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		// Read JSON file
		const items = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, "utf-8"));

		await em.nativeInsert(Item, items);

		// wrap(items).assign(items);
		// em.persist(items);
	}
}
