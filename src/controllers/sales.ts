import { Request, Response } from "express";
import { DI } from "../app";
import { UserRole } from "../entities";
import asyncHandler from "../middlewares/asyncHandler";

/**
 *  @desc      All customers
 *  @route     GET /sales/customers/all
 *  @access    Logged in sales rep
 * */
export const allCustomers = asyncHandler(async (req: Request, res: Response, next) => {
	const customers = await DI.userRepository.find({ role: UserRole.CUSTOMER });

	res.status(200).json({ success: true, message: "customers fetched successfully.", data: customers });
});

/**
 *  @desc      Fetch customer removed items
 *  @route     GET /sales/customers/removed-items/:id
 *  @access    Logged in sales rep
 * */
export const getUserRemovedItems = asyncHandler(async (req: Request, res: Response, next) => {
	const baskets = await DI.basketItemRepository.find(
		{ basket: { user: parseInt(req.params.id) }, active: false },
		{ fields: ["item"] }
	);

	res.status(200).json({
		success: true,
		message: "basket items removed by user fetched successfully.",
		data: baskets
	});
});
