import { IEvent } from "@/lib/database/models/event.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirmation from "./DeleteConfirmation";
import { formatDateTime } from "@/lib/utils";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
      <Link href={`/events/${event._id}`} className="">
        <Image
          src={event.imageUrl}
          width={0}
          height={0}
          sizes="100vw"
          alt="event"
          className="flex-center w-full bg-gray-50 aspect-video object-cover bg-center text-gray-500"
        />
      </Link>
      {isEventCreator && !hidePrice && (
        <div className="absolute top-2 right-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
          <Link href={`/events/${event._id}/update`}>
            <Image
              src="/assets/icons/edit.svg"
              alt="edit"
              width={20}
              height={20}
            />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex flex-col min-h-[230px] gap-3 md:gap-4 p-5">
        {!hidePrice && (
          <div className="flex gap-2">
            <p className="w-min p-semibold rounded-full bg-green-100 px-4 py-1 text-green-60">
              {event.isFree ? "Free" : `$${event.price}`}
            </p>
            <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
              {event.category.name}
            </p>
          </div>
        )}

        <p className="p-medium-16 md:p-medium-18 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <Link href={`/events/${event._id}`}>
          <p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
            {event.title}
          </p>
        </Link>

        <div className="flex-between w-full">
          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>

          {hasOrderLink && (
            <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
              <p className="text-primary-500">Order Details</p>
              <Image
                src="/assets/icons/arrow.svg"
                alt="search"
                width={10}
                height={10}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Card;
