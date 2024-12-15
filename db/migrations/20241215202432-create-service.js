'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('service', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      documentType: {
        type: Sequelize.ENUM('0', '1', '2'),
      },
      serviceType: {
        type: Sequelize.ENUM('0', '1'),
      },
      address: {
        type: Sequelize.STRING
      },
      scheduledServiceTime: {
        type: Sequelize.DATE
      },
      clientID: {
        type: Sequelize.STRING
      },
      lat: {
        type: Sequelize.STRING
      },
      lon: {
        type: Sequelize.STRING
      },
      senderAddress: {
        type: Sequelize.STRING
      },
      routeNumber:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('service');
  }, 
};