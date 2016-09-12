import React, {PropTypes, Component} from 'react';
import {FlatButton, DropDownMenu, MenuItem} from 'material-ui';
import WebAsset from 'material-ui/svg-icons/av/web-asset';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

import SaveDialog from './SaveDialog';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSaveDialog: false,
      saveFile: {}
    };
  }

  handleAlignChange = (event, index, value) => {
    this.props.setDockAlign(value);
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
    const {align, style, runRequest} = this.props;

    const rotate = (deg) => ({ transform: `rotate(${deg}deg)` });

    return (
      <div style={style}>
        <SaveDialog
          open={openSaveDialog}
          file={saveFile}
          onRequestClose={this.closeSaveDialog}
        />
        <FlatButton icon={<PowerSettingsNew />} onClick={runRequest}></FlatButton>
        <FlatButton icon={<FileDownload />} onClick={this.saveClicked}></FlatButton>
        <DropDownMenu value={align} onChange={this.handleAlignChange}>
          <MenuItem value="top" primaryText="T" leftIcon={<WebAsset style={rotate(0)} />} />
          <MenuItem value="right" primaryText="R" leftIcon={<WebAsset style={rotate(90)} />} />
          <MenuItem value="left" primaryText="L" leftIcon={<WebAsset style={rotate(270)} />} />
          <MenuItem value="bottom" primaryText="B" leftIcon={<WebAsset style={rotate(180)} />} />
        </DropDownMenu>
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
