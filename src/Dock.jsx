import React, {PropTypes, Component} from 'react';
import {Drawer} from 'material-ui';

const SizerWidth = 4;

export default class Dock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      align: 'left',
      width: innerWidth / 2
    };

    this.setSize = this.setSize.bind(this);
  }

  setSize(event) {
    const x = event.nativeEvent.x;
    const width = this.state.align === 'right' ? innerWidth - x : x + SizerWidth;
    this.setState({width});
  }

  render() {
    const {align, width} = this.state;

    const style = {
      display: 'flex',
      justifyContent: 'stretch',
      flexDirection: align === 'right' ? 'row' : 'row-reverse'
    };

    return (
      <Drawer open={true} openSecondary={align === 'right'} width={width}>
        <div style={style}>
          <Sizer
            onDragEnd={this.setSize}
            align={align}
          ></Sizer>
          <div style={{ flex: '1 1 auto' }}>
            {this.props.children}
          </div>
        </div>
      </Drawer>
    );
  }
}

Dock.propTypes = {
};

const Sizer = ({onDragEnd, align}) => (
  <div
    draggable="true"
    style={{
      width: SizerWidth,
      height: '100vh',
      cursor: align === 'right' ? 'w-resize' : 'e-resize'
    }}
    onDragEnd={onDragEnd}
  >
  </div>
);
