import { Model, DataTypes } from "sequelize";
import sequelize from "../db.js";

class StarbucksStore extends Model {}

StarbucksStore.init({
    storeId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        field: "STORE_NUMBER"
    },
    storeName: {
        type: DataTypes.STRING,
        field: "STORE_NAME",
        allowNull: false
    },
    storeAddress: {
        type: DataTypes.STRING,
        field: "STREET_ADDRESS",
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        field: "CITY",
        allowNull: false
    },
    province: {
        type: DataTypes.STRING,
        field: "PROVINCE",
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        field: "COUNTRY",
        allowNull: false
    },
    postCode: {
        type: DataTypes.STRING,
        field: "POSTCODE",
        allowNull: true
    },
    longitud: {
        type: DataTypes.FLOAT,
        field: "LONGITUDE",
        allowNull: false
    },
    latitud: {
        type: DataTypes.FLOAT,
        field: "LATITUDE",
        allowNull: false
    }
},
    {
        sequelize,
        modelName: "StarbucksStore",
        tableName: "STARBUCKS_DIRECTORY",
        timestamps: false
    }

)

export default StarbucksStore