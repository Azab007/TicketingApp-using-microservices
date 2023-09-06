import mongoose from 'mongoose';
import { Order } from './Order';
import { OrderStatus } from '@azabticketing/common';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current'
// An interface that describes the properties
// that are requried to create a new User
interface TicketAttrs {
  id: string;
  title: string;
  price: number
}

// An interface that describes the properties
// that a User Model has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByEvent(data: {id: string, version: number}): Promise<TicketDoc | null>
}

// An interface that describes the properties
// that a User Document has
export interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    version: number;
    isReserved(): Promise<Boolean>

}

const TicketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  toJSON: {
    transform(doc,ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
});
TicketSchema.set("versionKey","version")
TicketSchema.plugin(updateIfCurrentPlugin)

TicketSchema.statics.findByEvent = (event) => {
  return Ticket.findOne({
    _id:event.id,
    version: event.version-1
})
}

TicketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    ...attrs
  });
};

TicketSchema.methods.isReserved = async function() {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,OrderStatus.Complete,OrderStatus.AwaitingPayment
      ]
    }
  })
  return !!existingOrder
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('ticket', TicketSchema);

export { Ticket };
