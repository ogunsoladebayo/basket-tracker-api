import express from "express";
import { addItemToBasket, allItems, removeItemFromBasket } from "../controllers/items";
import { UserRole } from "../entities";
import { authorize, protect } from "../middlewares/auth";

const Router = express.Router();

export const itemsRoutes = Router.get("/all", allItems)
	.post("/add/:id", protect, authorize(UserRole.CUSTOMER), addItemToBasket)
	.post("/remove/:id", protect, authorize(UserRole.CUSTOMER), removeItemFromBasket);
