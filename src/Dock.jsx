import React, {PropTypes, Component} from 'react';
import {Drawer} from 'material-ui';

const SizerWidth = 4;

export default class Dock extends Component {
  constructor(props) {
    super(props);
  }

  sizerMoved = (event) => {
    const x = event.nativeEvent.x;
    const width = this.props.align === 'right' ? innerWidth - x : x + SizerWidth;
    this.props.setDockSize({width});
  }

  render() {
    const {align, width} = this.props;

    const style = {
      display: 'flex',
      justifyContent: 'stretch',
      flexDirection: align === 'right' ? 'row' : 'row-reverse'
    };

    return (
      <Drawer open={true} openSecondary={align === 'right'} width={width}>
        <div style={style}>
          <Sizer
            onDragEnd={this.sizerMoved}
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
  align: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  setDockSize: PropTypes.func.isRequired
};

const Sizer = ({onDragEnd, align}) => (
  <div
    draggable="true"
    style={{
      flex: `0 0 ${SizerWidth}px`,
      height: '100vh',
      cursor: align === 'right' ? 'w-resize' : 'e-resize'
    }}
    onDragEnd={onDragEnd}
  >
  </div>
);
