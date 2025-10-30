import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  username: string
  password: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
