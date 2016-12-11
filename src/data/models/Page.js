import DataType from 'sequelize';
import Model from '../sequelize'

const Page = Model.define('Page', {
  id: {
    type: DataType.STRING,
    primaryKey: true,
  },
  accessToken: DataType.STRING,
  name: DataType.STRING,
}, {
  classMethods: {
    associate: function(models) {
      // associations can be defined here
    }
  }
});

export default Page;