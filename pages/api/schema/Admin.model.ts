import mongoose, { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Check if the model already exists; if not, define it
const Admin = models.Admin || model('Admin', AdminSchema);

export default Admin;
