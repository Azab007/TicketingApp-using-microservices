import { OrderStatus } from '@azabticketing/common';
import mongoose from 'mongoose';
import { TicketDoc } from './Ticket';
import {updateIfCurrentPlugin} from "mongoose-update-if-current"
// An interface that describes the properties
// that are requried to create a new User
interface OrderAttrs {
  userId: string;
  status: OrderStatus
  expiresAt: Date
  ticket: TicketDoc
}

// An interface that describes the properties
// that a User Model has
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

// An interface that describes the properties
// that a User Document has
interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus
    expiresAt: Date
    ticket: TicketDoc
    version: number
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date,
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ticket"
  }
}, {
  toJSON: {
    transform(doc,ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
});

orderSchema.set("versionKey","version");
orderSchema.plugin(updateIfCurrentPlugin)
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('order', orderSchema);

export { Order };
