import fs from "fs";
import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Item } from "../entities";

export class ItemSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const itemRepository = em.getRepository(Item);
		if ((await itemRepository.count()) === 0) {
			// Read JSON file
			const items = JSON.parse(fs.readFileSync(`${__dirname}/products.json`, "utf-8"));

			await em.nativeInsert(Item, items);
		}
	}
}
