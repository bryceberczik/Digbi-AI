import sequelize from "../config/connection";
import { UserFactory } from "./user";
import { FileFactory } from "./file";

const User = UserFactory(sequelize);
const File = FileFactory(sequelize);

export { User, File };
