import React, {PropTypes, Component} from 'react';
import {FlatButton, DropDownMenu, MenuItem} from 'material-ui';
import WebAsset from 'material-ui/svg-icons/av/web-asset';
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';

import HardwareKeyboardTab from 'material-ui/svg-icons/hardware/keyboard-tab';

import ToggleIcon from './ToggleIcon';


export default class Menu extends Component {

  static propTypes = {
    align: PropTypes.string.isRequired,
    files: PropTypes.array.isRequired,
    setDockAlign: PropTypes.func.isRequired,
    runRequest: PropTypes.func.isRequired,
    toggleTabVisible: PropTypes.func.isRequired,
    style: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  handleAlignChange = (event, index, value) => {
    this.props.setDockAlign(value);
  }

  render() {
    const { align, style, runRequest, toggleTabVisible } = this.props;

    const rotate = (deg) => ({ transform: `rotate(${deg}deg)` });

    return (
      <div style={style}>
        <FlatButton icon={<PowerSettingsNew />} onClick={runRequest}></FlatButton>

        <ToggleIcon
          enable={<HardwareKeyboardTab />}
          disable={<HardwareKeyboardTab />}
          onChange={toggleTabVisible}
        />



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
