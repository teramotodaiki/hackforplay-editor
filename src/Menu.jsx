import React, {PropTypes, Component} from 'react';
import {FlatButton} from 'material-ui';
import SwapHoriz from 'material-ui/svg-icons/action/swap-horiz';

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  swapClicked = (event) => {
    const {align, setDockAlign} = this.props;
    setDockAlign(align === 'right' ? 'left' : 'right');
  }

  render() {
    const {style} = this.props;
    
    return (
      <div style={style}>
        <FlatButton icon={<SwapHoriz />} onClick={this.swapClicked}></FlatButton>
      </div>
    );
  }
}

Menu.propTypes = {
  align: PropTypes.string.isRequired,
  setDockAlign: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired
};
