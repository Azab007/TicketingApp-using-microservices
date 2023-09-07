import { ExpirationCompletedEvent, Listener, OrderStatus, Subjects } from "@azabticketing/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order";
import { OrderCancelledPublisher } from "../publisherss/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompletedEvent> {
    subject: Subjects.ExpirationComplete =Subjects.ExpirationComplete;
    queueGroupName: string = queueGroupName
    async onMessage(data: ExpirationCompletedEvent["data"],msg: Message) {
        const order = await Order.findById(data.orderId).populate('ticket')
        if (!order) {
            throw new Error("ticket not found")
        }
        if(order.status === OrderStatus.Complete) {
            return msg.ack()
        }
        order.set({
            status:OrderStatus.Cancelled 
        })
        await order.save()
        await new OrderCancelledPublisher(this.client).publish({
            id: order.id,
            version: order.version,
            ticket: {
                id: order.ticket.id
            }
        })
        msg.ack()
    }
}