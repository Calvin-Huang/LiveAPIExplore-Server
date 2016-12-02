import DataType from 'sequelize';
import Model from '../sequelize'
import moment from 'moment';

const FBAuth = Model.define('FBAuth', {
  accessToken: DataType.STRING,
  expiresIn: {
    type: DataType.DATE,
    get: function() {
      try {
        return moment(new Date(this.getDataValue('expiresIn'))).format("YYYY/MM/DD HH:mm:SS");
      } catch (e) {
      }
    }
  },
}, {
  classMethods: {
    associate: function(models) {
      // associations can be defined here
    }
  }
});

export default FBAuth;