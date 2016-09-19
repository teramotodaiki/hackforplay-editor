import React, { PropTypes, Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Tabs, Tab, Badge, Avatar, Chip } from 'material-ui';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');

import ContextMenu from './ContextMenu';

const PANE_CONTENT_CONTAINER = 'PANE_CONTENT_CONTAINER'; // classname

export default class Pane extends Component {

  static propTypes = {
    files: PropTypes.array.isRequired,
    updateFile: PropTypes.func.isRequired,
    openRenameDialog: PropTypes.func.isRequired,
    openSaveDialog: PropTypes.func.isRequired,
    openDeleteDialog: PropTypes.func.isRequired,
    style: PropTypes.object
  };

  state = {
    openContextMenu: {}
  };

  constructor(props) {
    super(props);
  }

  getStyle() {
    if (!this.style) {
      const ref = document.querySelector('.' + PANE_CONTENT_CONTAINER);
      if (!ref) return { width: '100%', height: 300 };
      this.style = ref.currentStyle || document.defaultView.getComputedStyle(ref);
    }
    return this.style;
  }

  setEnoughHeight = (ref) => {
    const cm = ref.getCodeMirror();
    const setSize = () => cm.setSize(this.getStyle().width, this.getStyle().height);
    setSize();
    addEventListener('resize', setSize);
  }

  handleContextMenu(event, file) {
    event.preventDefault();
    const { clientX, clientY } = event.nativeEvent;
    const openContextMenu = { file, absX: clientX, absY: clientY };
    this.setState({ openContextMenu });
  }

  handleContextMenuClose() {
    this.setState({ openContextMenu: {} });
  }

  handleRename = () => {
    const { files, openRenameDialog } = this.props;
    const file = files.find((item) => item === this.state.openContextMenu.file);
    if (!file) return;
    openRenameDialog(file);
    this.setState({ openContextMenu: {} });
  }

  handleSave = () => {
    const { files, openSaveDialog } = this.props;
    const file = files.find((item) => item === this.state.openContextMenu.file);
    if (!file) return;
    openSaveDialog(file);
    this.setState({ openContextMenu: {} });
  }

  handleDelete = () => {
    const { files, openDeleteDialog } = this.props;
    const file = files.find((item) => item === this.state.openContextMenu.file);
    if (!file) return;
    openDeleteDialog(file);
    this.setState({ openContextMenu: {} });
  }

  handleSwitch = () => {
    const { files, switchEntryPoint } = this.props;
    const file = files.find((item) => item === this.state.openContextMenu.file);
    if (!file) return;
    switchEntryPoint(file);
    this.setState({ openContextMenu: {} });
  }

  render() {
    const { files, updateFile } = this.props;
    const { openContextMenu } = this.state;
    const options = {
      lineNumbers: true,
      mode: 'javascript'
    };

    const style = Object.assign({
      display: 'flex',
      flexDirection: 'column'
    }, this.props.style);

    const menuList = [
      {
        primaryText: 'Save as',
        onTouchTap: this.handleSave
      },
      {
        primaryText: 'Rename',
        onTouchTap: this.handleRename
      },
      {
        primaryText: 'Switch entry point',
        onTouchTap: this.handleSwitch
      },
      {
        primaryText: 'Delete',
        onTouchTap: this.handleDelete
      }
    ];


    const tabLabels = files.map(file => file.isEntryPoint ? (
      <span>
        <PlayCircleOutline color="white" style={{ marginBottom: -6, marginRight: 10 }} />{file.filename}
      </span>
    ) : file.filename);

    return (
      <Tabs
        style={style}
        tabItemContainerStyle={{ flex: '0 0 auto' }}
        contentContainerStyle={{ flex: '1 1 auto' }}
        contentContainerClassName={PANE_CONTENT_CONTAINER}
      >
      {files.map((file, index) => (
        <Tab
          key={file.filename}
          label={tabLabels[index]}
          style={{ textTransform: 'none' }}
          onContextMenu={(e) => this.handleContextMenu(e, file)}
        >
          <ContextMenu
            menuList={menuList}
            openEvent={openContextMenu.file === file ? openContextMenu : null}
            onClose={this.handleContextMenuClose}
          />
          <CodeMirror
            ref={this.setEnoughHeight}
            value={file.code}
            onChange={(code) => updateFile(file, { code })}
            options={options}
          />
        </Tab>
      ))}
      </Tabs>
    );
  }
}
