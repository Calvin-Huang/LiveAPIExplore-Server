import FBAuthType from '../types/FBAuthType';

import FBAuth from '../../data/models/FBAuth';

const fbAuth = {
  type: FBAuthType,
  resolve() {
    return FBAuth.findOne({ order: [['createdAt', 'DESC']] });
  }
}

export default fbAuth;