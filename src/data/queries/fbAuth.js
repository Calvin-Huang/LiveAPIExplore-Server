import FBAuthType from '../types/FBAuthType';

import FBAuth from '../../data/models/FBAuth';

const fbAuth = {
  type: FBAuthType,
  resolve(fieldName, args, context, { rootValue: { request } }) {
    if (!request.user) {
      return {};
    } else {
      return FBAuth.findOne({ order: [['createdAt', 'DESC']] });
    }
  }
}

export default fbAuth;