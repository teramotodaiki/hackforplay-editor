import React, {PropTypes, Component} from 'react';
import {FlatButton} from 'material-ui';
import SwapHoriz from 'material-ui/svg-icons/action/swap-horiz';
import FileDownload from 'material-ui/svg-icons/file/file-download';

import SaveDialog from './SaveDialog';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSaveDialog: false,
      saveFile: {}
    };
  }

  swapClicked = (event) => {
    const {align, setDockAlign} = this.props;
    setDockAlign(align === 'right' ? 'left' : 'right');
  }

  saveClicked = (event) => {
    const {files} = this.props;
    this.setState({
      openSaveDialog: true,
      saveFile: files[0]
    });
  }

  closeSaveDialog = () => {
    this.setState({
      openSaveDialog: false,
      saveFile: {}
    });
  }

  render() {
    const {openSaveDialog, saveFile} = this.state;
    const {style} = this.props;

    return (
      <div style={style}>
        <SaveDialog
          open={openSaveDialog}
          file={saveFile}
          onRequestClose={this.closeSaveDialog}
        />
        <FlatButton icon={<FileDownload />} onClick={this.saveClicked}></FlatButton>
        <FlatButton icon={<SwapHoriz />} onClick={this.swapClicked}></FlatButton>
      </div>
    );
  }
}

Menu.propTypes = {
  align: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  setDockAlign: PropTypes.func.isRequired,
  runRequest: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired
};
