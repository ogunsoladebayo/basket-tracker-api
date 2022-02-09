import { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../entities";

export class UserSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const userRepository = em.getRepository(User);
		if ((await userRepository.count({ role: UserRole.SALES_REP })) === 0) {
			const repPassword = "SaLeSReP";

			const user = userRepository.create({
				username: "rep",
				password: repPassword,
				role: UserRole.SALES_REP,
				createdAt: new Date(),
				updatedAt: new Date()
			});
		}
	}
}
