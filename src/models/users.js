import database from "../config/database.js"
import { DataTypes } from "sequelize"

const User = database.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    },

    type: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "Professor"
    },

    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
    {
        timestamps: false
    }
)

export default User
