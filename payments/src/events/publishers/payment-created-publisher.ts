import { PaymentCreatedEvent, Publisher } from "@azabticketing/common";
import { Subjects } from "@azabticketing/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}