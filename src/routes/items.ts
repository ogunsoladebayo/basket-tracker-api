import express from "express";
import { addItemToBasket, allItems, checkout, removeItemFromBasket } from "../controllers/customers";
import { UserRole } from "../entities";
import { authorize, protect } from "../middlewares/auth";

const Router = express.Router();

export const itemsRoutes = Router.get("/items/all", allItems)
	.post("/items/:id", protect, authorize(UserRole.CUSTOMER), addItemToBasket)
	.delete("/items/:id", protect, authorize(UserRole.CUSTOMER), removeItemFromBasket)
	.post("/checkout", protect, authorize(UserRole.CUSTOMER), checkout);
