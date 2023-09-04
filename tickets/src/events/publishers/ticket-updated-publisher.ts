import { Publisher } from "@azabticketing/common";
import { Subjects } from "@azabticketing/common";
import { TicketUpdatedEvent } from "@azabticketing/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}