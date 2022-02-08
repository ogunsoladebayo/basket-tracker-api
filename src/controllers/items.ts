import { Reference, wrap } from "@mikro-orm/core";
import { Request, Response } from "express";
import { DI } from "../app";
import { Basket, BasketItem } from "../entities";
import asyncHandler from "../middlewares/asyncHandler";

/**
 *  @desc      All products
 *  @route     POST /items/list
 *  @access    Public
 * */
export const allItems = asyncHandler(async (req: Request, res: Response, next) => {
	const items = await DI.itemRepository.findAll();

	res.status(200).json({ success: true, message: "Items fetched successfully.", data: items });
});

/**
 *  @desc      Add an item to basket
 *  @route     POST /items/add/Id
 *  @access    Logged in customer
 * */
export const addItemToBasket = asyncHandler(async (req: Request, res: Response, next) => {
	const item = await DI.itemRepository.findOneOrFail({ id: parseInt(req.params.id) });
	let basket =
		(await DI.basketRepository.findOne(
			{
				user: req.body.user.id,
				checkedOut: false,
				basketItems: { active: true }
			},
			{ fields: [{ basketItems: ["quantity", "item"] }] }
		)) || new Basket();
	basket.user = req.body.user;

	let basketItem: BasketItem | Reference<BasketItem>;
	basketItem = await DI.basketItemRepository.findOne({ item: item });

	if (!basketItem) {
		basketItem = new BasketItem();
		wrap(basketItem).assign({ item, quantity: 1 }, { em: DI.em });
		DI.basketItemRepository.persist(basketItem);
	} else if (!basketItem.active) {
		wrap(basketItem).assign({ id: basketItem.id, active: true, quantity: 1 });
	} else {
		wrap(basketItem).assign({ id: basketItem.id, quantity: basketItem.quantity + 1 });
	}

	basket.basketItems.add(basketItem);

	await DI.basketRepository.flush();

	res.status(200).json({
		success: true,
		message: "Item was successfully added to basket.",
		data: basket.basketItems
	});
});

/**
 *  @desc      Remove an item from basket
 *  @route     POST /items/remove/:Id
 *  @access    Logged in customer
 * */
export const removeItemFromBasket = asyncHandler(async (req: Request, res: Response, next) => {
	// find the item from the user's active basket
	var basketItem = await DI.basketItemRepository.findOneOrFail({
		basket: { user: req.body.user, checkedOut: false },
		item: { id: parseInt(req.params.id) },
		active: true
	});

	// set the basket item active property to false
	basketItem.active = false;

	await DI.basketItemRepository.flush();

	const basket = await DI.basketRepository.findOne(
		{ user: req.body.user.id, checkedOut: false, basketItems: { active: true } },
		{ fields: [{ basketItems: ["quantity", "item"] }] }
	);

	res.status(200).json({
		success: true,
		message: "Items was successfully removed from basket.",
		data: basket.basketItems
	});
});
