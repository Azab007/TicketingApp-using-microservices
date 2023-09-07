import { OrderStatus } from '@azabticketing/common';
import mongoose from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current'
// An interface that describes the properties
// that are requried to create a new User
interface OrderAttrs {
    id: string
    version: number;
    price: number;
    userId: string;
    status: OrderStatus;
  }
  
  // An interface that describes the properties
  // that a User Model has
  interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
  }
  
  // An interface that describes the properties
  // that a User Document has
  interface OrderDoc extends mongoose.Document {
    version: number
    price: number;
    userId: string;
    status: OrderStatus
  }

    const orderSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
},{
    toJSON: {
        transform(doc,ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})
orderSchema.set("versionKey","version")
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) =>{
    return new Order({
        _id:attrs.id,
        version: attrs.version,
        price: attrs.price,
        userId: attrs.userId,
        status: attrs.status
    })
}

const Order = mongoose.model<OrderDoc,OrderModel>('order',orderSchema)

export {Order}