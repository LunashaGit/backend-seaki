import mongoose, { Schema, Document, Model } from "mongoose";

interface IEvent extends Document {
  _doc: any;
  name: string;
  date: Date;
  description: string;
}

interface IEventDocument extends IEvent {}

interface IEventModel extends Model<IEventDocument> {}

const EventSchema: Schema<IEventDocument> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
});

const EventModel = mongoose.model<IEventDocument, IEventModel>(
  "Event",
  EventSchema
);

export default EventModel;
