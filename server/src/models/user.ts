import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface IUser {
  id: number;
  email: string;
  password: string;
}

interface ICreateUser extends Optional<IUser, "id"> {}

export class User extends Model<IUser, ICreateUser> implements IUser {
  public id!: number;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      sequelize,
    }
  );

  return User;
}
