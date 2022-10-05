import Users from "./../../models/user.model";

export = {
    Query: {
        async getUsers() {
            return await Users.find();
        }
    }
}