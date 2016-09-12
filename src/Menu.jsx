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

  saveClicked = (event) => {
    const {files} = this.props;
    const file = files[0];
    // download
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    const elem = document.createElement('a');
    elem.download = file.filename;
    elem.href = URL.createObjectURL(new Blob([file.code]));
    elem.dispatchEvent(event);
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
  files: PropTypes.array.isRequired,
  setDockAlign: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired
};
