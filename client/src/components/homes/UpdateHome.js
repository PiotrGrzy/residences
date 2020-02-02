import React from 'react';
import { updateHome } from '../../actions/homeActions';

const UpdateHome = props => {
  return <div className="update">Update.... or not</div>;
};

export default connect(null, { updateHome })(UpdateHome);
