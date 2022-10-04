import mongoose, { Schema, Document, Model } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

interface IUser extends Document {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
}

interface IUserDocument extends IUser {}

interface IUserModel extends Model<IUserDocument> {
  findByCredentials: (
    email: string,
    password: string
  ) => Promise<IUserDocument>;
}

const UserSchema: Schema<IUserDocument> = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    validate: [isEmail],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
    trim: true,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

UserSchema.statics.findByCredentials = async function (
  email: string,
  password: string
) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

const UserModel = mongoose.model<IUserDocument, IUserModel>("user", UserSchema);

export default UserModel;
