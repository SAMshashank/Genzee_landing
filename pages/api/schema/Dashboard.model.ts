import mongoose, { Document, Schema } from "mongoose";

interface IDashboard extends Document {
  title: string;
  metadata: any; // You can make this more specific if needed
  createdAt: Date;
  updatedAt: Date;
  visibility:boolean
}

const DashboardSchema = new Schema<IDashboard>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {},
  },
  visibility: {
    type:Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

DashboardSchema.pre<IDashboard>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Dashboard = mongoose.model<IDashboard>("Dashboard", DashboardSchema);

export default Dashboard;
