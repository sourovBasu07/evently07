import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";

const CheckOut = ({ event, userId }: { event: IEvent; userId: string }) => {
  const onCheckout = async () => {};

  return (
    <form action={onCheckout} method="POST">
      <Button type="submit" role="link" className="button sm:w-fit" size="lg">
        {event.isFree ? "Get Ticket" : "Buy Ticket"}
      </Button>
    </form>
  );
};
export default CheckOut;
