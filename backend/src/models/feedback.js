import { DataTypes } from "sequelize";

const Feedback = {
    FeedbackID: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    }, 
    flag: {
        type: DataTypes.BOOLEAN, 
        allowNull: false, 
    }
}

export default Feedback