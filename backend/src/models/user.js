import { DataTypes } from "sequelize";

const User = {
    userID: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    }, 
    userName: {
        type: DataTypes.STRING(15),
        allowNull: false, 
        unique: true 
    }, 
    passwordHash: {
        type: DataTypes.TEXT, 
        allowNull: false, 
    }, 
    profileImagePath:{
        type: DataTypes.TEXT,
        allowNull: false, 
        defaultValue: '' 
    }  
}

export default User 