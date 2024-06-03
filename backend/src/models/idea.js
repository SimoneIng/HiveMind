import { DataTypes } from "sequelize";

const Idea = {
    ideaID: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true
    }, 
    title: {
        type: DataTypes.STRING(30), 
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(400), 
        allowNull: false
    }, 
    createdAt: {
        type: DataTypes.DATE, 
        allowNull: false, 
        defaultValue: Date.now()
    }, 
    upVotes: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 0, 
        validate: {
            min: 0 
        }
    }, 
    downVotes: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 0, 
        validate: {
            min: 0 
        }
    }
}

export default Idea; 