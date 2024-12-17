'use strict';
const {Model, Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../config/database');
const AppError = require('../../utils/appError');

module.exports = sequelize.define('service', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  documentType: {
    type: DataTypes.ENUM('0', '1', '2'),
  },
  serviceType: {
    type: DataTypes.ENUM('0', '1'),
  },
  address: {
    type: DataTypes.STRING
  },
  scheduledServiceTime: {
    type: DataTypes.DATE
  },
  clientID: {
    type: DataTypes.STRING
  },
  lat: {
    type: DataTypes.STRING
  },
  lon: {
    type: DataTypes.STRING
  },
  senderAddress: {
    type: DataTypes.STRING
  },
  routeNumber:{
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
},
  {
    paranoid: true,
    freezeTableName: true,
    modelName: 'service'
  },
);