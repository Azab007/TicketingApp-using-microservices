import { Listener, Subjects, PaymentCreatedEvent, OrderStatus } from "@azabticketing/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated =Subjects.PaymentCreated;
    queueGroupName: string = queueGroupName
    async onMessage(data: PaymentCreatedEvent["data"],msg: Message) {
        const order = await Order.findById(data.orderId)
        if (!order) {
            throw new Error("order not found")
        }
        order.set({
            status: OrderStatus.Cancelled
        })
        await order.save()
        msg.ack()
    }
}