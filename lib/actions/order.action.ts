import { GetOrdersByUserParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import Order from "../database/models/order.model";
import Event from "../database/models/event.model";
import User from "../database/models/user.model";

export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;

    const conditions = { buyer: userId };

    const ordersDistincts = await Order.distinct("event._id", conditions);

    const orders = await Order.find({ event: { $in: ordersDistincts } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "event",
        model: Event,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstname lastname",
        },
      });

    const ordersCount = await Order.countDocuments(ordersDistincts);

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getOrdersByEvent() {
  try {
    await connectToDatabase();
  } catch (error) {
    handleError(error);
  }
}
