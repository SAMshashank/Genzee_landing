import mongoose, { Schema, Document } from 'mongoose';

// Define the subscription schema
interface ISubscription extends Document {
  email: string;
  createdAt: Date;
}

// Create the schema for the Subscription
const SubscriptionSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create the model based on the schema
const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;
