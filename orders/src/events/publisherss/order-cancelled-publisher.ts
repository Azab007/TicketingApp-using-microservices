import { Publisher, Subjects } from "@azabticketing/common";
import {OrderCancelledEvent} from "@azabticketing/common/build/events/order-cancelled-event"
export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

}