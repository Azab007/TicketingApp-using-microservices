import { Publisher } from "@azabticketing/common";
import { Subjects } from "@azabticketing/common";
import { TicketCreatedEvent } from "@azabticketing/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}