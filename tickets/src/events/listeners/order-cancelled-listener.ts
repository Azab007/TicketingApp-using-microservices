import { Listener, Subjects, OrderCancelledEvent } from "@azabticketing/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/Ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelleddListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled =Subjects.OrderCancelled;
    queueGroupName: string = queueGroupName
    async onMessage(data: OrderCancelledEvent["data"],msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id)
        if (!ticket) {
            throw new Error("ticket not found")
        }
        ticket.set({orderId: undefined})
        await ticket.save()
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            title: ticket.id,
            version: ticket.version,
            price: ticket.price,
            userId: ticket.userId,
            orderId: ticket.orderId
        })
        msg.ack()
    }
}