"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import Event from "../database/models/event.model";
import { revalidatePath } from "next/cache";
import Order from "../database/models/order.model";
import { log } from "console";

export const createUser = async (user: CreateUserParams) => {
  console.log(user);
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    console.log(newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const upddatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!upddatedUser) {
      throw new Error("User not found");
    }

    return JSON.parse(JSON.stringify(upddatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();

    const userDelete = await User.findOne({ clerkId });

    console.log(userDelete);

    if (!userDelete) {
      throw new Error("User not found");
    }

    await Promise.all([
      Event.updateMany(
        { _id: { $in: userDelete.events } },
        { $pull: { organizer: userDelete._id } }
      ),
      Order.updateMany(
        {
          _id: { $in: userDelete.orders },
        },
        { $unset: { buyer: 1 } }
      ),
    ]);

    const deletedUser = await User.findByIdAndDelete(userDelete._id);

    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
};
