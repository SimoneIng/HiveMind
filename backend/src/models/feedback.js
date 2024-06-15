import { DataTypes } from "sequelize";

const Feedback = {
    feedbackID: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    }, 
    flag: {
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
    },
    createdAt: {
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: Date.now()
    }
}

export default Feedback