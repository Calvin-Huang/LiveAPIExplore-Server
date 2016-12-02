import DataType from 'sequelize';
import Model from '../sequelize';

const Admin = Model.define('Admin', {

  id: {
    type: DataType.INTEGER,
    primaryKey: true,
  },
  username: { type: DataType.STRING },
  password: { type: DataType.STRING },

}, {
  indexes: [
    {
      unique: true,
      fields: [ 'username' ],
    }
  ]
});

export default Admin;
