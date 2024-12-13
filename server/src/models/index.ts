import sequelize from "../config/connection";
import { UserFactory } from "./user";

const User = UserFactory(sequelize);

export { User };
