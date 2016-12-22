import DataType from 'sequelize';
import Model from '../sequelize';

const Product = Model.define('Product', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
  },
  videoId: DataType.STRING,
  imageUrls: { 
    type: DataType.STRING,
    set: function(newValue) {
      this.setDataValue('imageUrls', JSON.stringify(newValue));
    },
    get: function() {
      return JSON.parse(this.getDataValue('imageUrls'));
    }
  },
  name: DataType.STRING,
  price: DataType.INTEGER,
  shippingDays: DataType.INTEGER,
  otherDescription: DataType.STRING
}, {
  classMethods: {
    associate: function(models) {
      // associations can be defined here
    }
  }
});

export default Product;