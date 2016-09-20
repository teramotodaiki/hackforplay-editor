import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


import {Model} from './LoosePostmate';
import Dock from './Dock';
import Menu from './Menu';
import Pane from './Pane';

import ContextMenu from './ContextMenu';
import SaveDialog from './SaveDialog';
import RenameDialog from './RenameDialog';
import DeleteDialog from './DeleteDialog';

import CodeMirrorTabStyle from './CodeMirrorTabStyle';

export default class Main extends Component {
  constructor(props) {
    super(props);

    new Model({
      view: this.getViewState
    }).then(parent => {
      this.parent = parent;
      const {align, edge, files} = parent.model;
      this.setState({align, edge, files});
    });

    this.state = {
      align: '',
      edge: { x: 0, y: 0 },
      files: [],

      tabContextMenu: {},
      saveFile: null,
      renameFile: null,
      deleteFile: null,

      tabVisible: false

    };
  }

  setDockSize = ({x, y}) => {
    const edge = {
      x: typeof x === 'number' ? x : this.state.edge.x,
      y: typeof y === 'number' ? y : this.state.edge.y
    };
    this.setState({edge}, this.renderRequest);
  }

  setDockAlign = (align) => {
    this.setState({align}, this.renderRequest);
  }

  updateFile = (file, updated) => {
    const nextFile = Object.assign({}, file, updated);
    const files = this.state.files.map((item) => item === file ? nextFile : item);
    this.setState({ files });
  }

  removeFile = (file) => {
    const files = this.state.files.filter((item) => item !== file);
    this.setState({ files });
  }

  switchEntryPoint = (file) => {
    const files = this.state.files.map((item) =>
      Object.assign({}, item, { isEntryPoint: item === file }));
    this.setState({ files });
  }

  runRequest = () => {
    if (!this.parent) return;
    this.parent.emit('run', this.state.files);
  }


  toggleTabVisible = () => {
      this.setState({ tabVisible: !this.state.tabVisible });
  }


  renderRequest = () => {
    if (!this.parent) return;
    this.parent.emit('render', this.getViewState());
  }

  getViewState = () => {
    const {align, edge} = this.state;
    return {align, edge};
  }

  closeSaveDialog = () => {
    this.setState({ saveFile: null });
  }

  closeRenameDialog = () => {
    this.setState({ renameFile: null });
  }

  closeDeleteDialog = () => {
    this.setState({ deleteFile: null });
  }

  handleTabContextMenu = (tabContextMenu) => {
    this.setState({ tabContextMenu })
  }

  handleContextMenuClose() {
    this.setState({ tabContextMenu: {} });
  }

  handleSave = () => {
    const saveFile = this.state.tabContextMenu.file;
    if (!saveFile) return;
    this.setState({ saveFile, tabContextMenu: {} });
  }

  handleRename = () => {
    const renameFile = this.state.tabContextMenu.file;
    if (!renameFile) return;
    this.setState({ renameFile, tabContextMenu: {} });
  }

  handleSwitch = () => {
    const switchFile = this.state.tabContextMenu.file;
    if (!switchFile) return;
    this.switchEntryPoint(switchFile);
    this.setState({ tabContextMenu: {} });
  }

  handleDelete = () => {
    const deleteFile = this.state.tabContextMenu.file;
    if (!deleteFile) return;
    this.setState({ deleteFile, tabContextMenu: {} });
  }

  render() {
    const { align, edge, files, saveFile, renameFile, deleteFile, tabContextMenu, tabVisible } = this.state;

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

    return (
      <MuiThemeProvider>
        <Dock align={align} edge={edge} setDockSize={this.setDockSize}>
          <CodeMirrorTabStyle visibility={tabVisible} />
          <ContextMenu
            menuList={menuList}
            openEvent={tabContextMenu.event}
            onClose={this.handleContextMenuClose}
          />
          <SaveDialog
            open={!!saveFile}
            file={saveFile}
            onRequestClose={this.closeSaveDialog}
          />
          <RenameDialog
            open={!!renameFile}
            file={renameFile}
            updateFilename={(filename) => this.updateFile(renameFile, { filename })}
            onRequestClose={this.closeRenameDialog}
          />
          <DeleteDialog
            open={!!deleteFile}
            file={deleteFile}
            deleteFile={this.removeFile}
            onRequestClose={this.closeDeleteDialog}
          />
          <Menu
            align={align}
            files={files}
            setDockAlign={this.setDockAlign}
            runRequest={this.runRequest}
            toggleTabVisible={this.toggleTabVisible}
            style={{ flex: '0 0 auto' }}
          />
          <Pane
            files={files}
            updateFile={this.updateFile}
            onTabContextMenu={this.handleTabContextMenu}
            style={{ flex: '1 1 auto' }}
          />
        </Dock>
      </MuiThemeProvider>
    );
  }
}

Main.propTypes = {
};
