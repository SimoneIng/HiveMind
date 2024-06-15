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
    }, 
    createdAt: {
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: Date.now()
    }
}

export default Comment