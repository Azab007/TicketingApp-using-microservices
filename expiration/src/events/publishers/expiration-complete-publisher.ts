import { Publisher, Subjects } from "@azabticketing/common";
import {ExpirationCompletedEvent} from "@azabticketing/common"
export class ExpirationCompletePublisher extends Publisher<ExpirationCompletedEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

}