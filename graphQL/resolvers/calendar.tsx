import Event from "./../../models/calendar.model";

export = {
  Query: {
    async getEvents() {
      return await Event.find();
    },
  },
  Mutation: {
    async createEvent(_: any, { name, date, description }: any) {
      const NewEvent = new Event({
        name,
        date,
        description,
      });

      const res = await NewEvent.save();

      return {
        ...res._doc,
        id: res._id,
      };
    },
  },
};
