import { DataTypes, Sequelize, Model, Optional } from "sequelize";

interface IFile {
  id: string;
  userId?: string;
  fileName: string;
  fileSize: number;
  content: object;
  uploadedAt: Date;
}

interface ICreateFile extends Optional<IFile, "id"> {}

export class File extends Model<IFile, ICreateFile> implements IFile {
  public id!: string;
  public userId?: string;
  public fileName!: string;
  public fileSize!: number;
  public content!: object;
  public readonly uploadedAt!: Date;
}

export function FileFactory(sequelize: Sequelize): typeof File {
  File.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      uploadedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      tableName: "json_files",
      sequelize,
    }
  );

  return File;
}
