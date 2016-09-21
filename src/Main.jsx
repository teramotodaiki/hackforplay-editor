import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


import {Model} from './LoosePostmate';
import Menu from './Menu';
import Pane from './Pane';

import ContextMenu from './ContextMenu';
import SaveDialog from './SaveDialog';
import RenameDialog from './RenameDialog';
import DeleteDialog from './DeleteDialog';

export default class Main extends Component {
  constructor(props) {
    super(props);

    new Model({
      view: this.getViewState
    }).then(parent => {
      this.parent = parent;
      const { view, files } = parent.model;
      this.setState({ align: view.align, files });
    });

    this.state = {
      align: '',
      files: [],

      tabContextMenu: {},
      saveFile: null,
      renameFile: null,
      deleteFile: null,

      tabVisible: false

    };
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
    const { align } = this.state;
    return { align };
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
    const { align, files, saveFile, renameFile, deleteFile, tabContextMenu, tabVisible } = this.state;

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

    const style = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%',
    };

    return (
      <MuiThemeProvider>
        <div style={style}>
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
            tabVisible={tabVisible}
            style={{ flex: '1 1 auto' }}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

Main.propTypes = {
};
