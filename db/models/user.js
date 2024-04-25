// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class user extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   user.init({
//     userType: DataTypes.ENUM,
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'user',
//   });
//   return user;
// };



//------------------------------  use of sequelize ------------------------------
// 'use strict';
// const {Model,Sequelize} = require('sequelize');
// const sequelize = require('../../config/database.js');

// module.exports = sequelize.define('user',{
//   id: {
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: Sequelize.INTEGER
//   },
//   userType: {
//     type: Sequelize.ENUM('0','1','2')
//   },
//   firstName: {
//     type: Sequelize.STRING
//   },
//   lastName: {
//     type: Sequelize.STRING
//   },
//   email: {
//     type: Sequelize.STRING
//   },
//   password: {
//     type: Sequelize.STRING
//   },
//   confirmPassword: {
//     type: Sequelize.VIRTUAL
//   },
//   createdAt: {
//     allowNull: false,
//     type: Sequelize.DATE
//   },
//   updatedAt: {
//     allowNull: false,
//     type: Sequelize.DATE
//   },
//   deletedAt: {
//     type: Sequelize.DATE
//   }
// },{
//   paranoid: true,
//   freezeTableName: true,
//   modelName: 'user'
// })


// --------------------------------------------  use of DataType ---------------------------
'use strict';
const {Model,Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../../config/database.js');
const bcrypt = require('bcrypt')

module.exports = sequelize.define('user',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userType: {
    type: DataTypes.ENUM('0','1','2')
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value){
      if(value === this.password){
        const hashPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password',hashPassword);
      }else {
        throw new Error( 'Password and Confirm Password must be the same')
      }
    }
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
    type: DataTypes.DATE
  }
},{
  paranoid: true,
  freezeTableName: true,
  modelName: 'user'
})