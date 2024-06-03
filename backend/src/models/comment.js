import { DataTypes } from "sequelize";

const Comment = {
    commentID: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING(100), 
        allowNull: false
    }
}

export default Comment