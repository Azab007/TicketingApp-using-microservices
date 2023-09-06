import { Publisher, Subjects } from "@azabticketing/common";
import {OrderCreatedEvent} from "@azabticketing/common/build/events/order-created-event"
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

}