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

export default class Main extends Component {
  constructor(props) {
    super(props);

    new Model({})
      .then(parent => {
        this.parent = parent;
        const files = parent.model.files;
        this.setState({files});
      });

    this.state = {
      align: 'right',
      width: innerWidth / 2,
      files: []
    };
  }

  setDockSize = ({width}) => {
    this.setState({width});
  }

  setDockAlign = (align) => {
    this.setState({align});
  }

  updateFile = (index, file) => {
    const files = this.state.files.map((item, i) => index === i ? file : item);
    this.setState({files});
  }

  runRequest = () => {
    if (!this.parent) return;
    this.parent.emit('run', this.state.files);
  }

  render() {
    const {align, width, files} = this.state;

    return (
      <MuiThemeProvider>
        <Dock align={align} width={width} setDockSize={this.setDockSize}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Menu
              align={align}
              files={files}
              setDockAlign={this.setDockAlign}
              runRequest={this.runRequest}
              style={{ flex: '0 0 auto' }}
            />
            <Pane
              width={width}
              files={files}
              updateFile={this.updateFile}
              style={{ flex: '1 1 auto', overflowY: 'scroll' }}
            />
          </div>
        </Dock>
      </MuiThemeProvider>
    );
  }
}

Main.propTypes = {
};
