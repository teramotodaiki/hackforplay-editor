import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


import Dock from './Dock';
import Menu from './Menu';
import Pane from './Pane';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      align: 'right',
      width: innerWidth / 2
    };
  }

  setDockSize = ({width}) => {
    this.setState({width});
  }

  setDockAlign = (align) => {
    this.setState({align});
  }

  render() {
    const {align, width} = this.state;

    return (
      <MuiThemeProvider>
        <Dock align={align} width={width} setDockSize={this.setDockSize}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Menu
              align={align}
              setDockAlign={this.setDockAlign}
              style={{ flex: '0 0 auto' }}
            />
            <Pane
              width={width}
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
