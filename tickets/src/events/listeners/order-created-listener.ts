import { Listener, Subjects, OrderCreatedEvent } from "@azabticketing/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/Ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated =Subjects.OrderCreated;
    queueGroupName: string = queueGroupName
    async onMessage(data: OrderCreatedEvent["data"],msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id)
        if (!ticket) {
            throw new Error("ticket not found")
        }
        ticket.set({orderId: data.id})
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