import { IEvent } from "@/lib/database/models/event.model";

export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

export type CreateCategoryParams = {
  categoryName: string;
};

export type SearchParamsProps = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    categoryId: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type GetAllEventsParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

export type GetRelatedEventsByCategoryParams = {
  eventId: string;
  categoryId: string;
  limit?: number;
  page: string | number;
};

export type GetOrdersByUserParams = {
  userId: string;
  limit?: number;
  page?: number;
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type GetEventsByUserProps = {
  userId: string;
  limit?: number;
  page?: number;
};

export type GetOrdersByEventParams = {
  searchString: string;
  eventId: string;
};

export type CheckoutOrderParams = {
  eventTitle: string;
  eventId: string;
  price: string;
  isFree: boolean;
  buyerId: string;
};

export type CreateOrderParams = {
  stripeId: string;
  eventId: string;
  buyerId: string;
  totalAmount: string;
  createdAt: Date;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};
