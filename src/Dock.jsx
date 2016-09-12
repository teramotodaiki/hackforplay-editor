import React, {PropTypes, Component} from 'react';
import {Drawer} from 'material-ui';

const SizerWidth = 4;

export default class Dock extends Component {
  constructor(props) {
    super(props);
  }

  sizerMoved = (event) => {
    const {align, setDockSize} = this.props;
    const x = event.nativeEvent.clientX + (align === 'left' ? SizerWidth : 0);
    const y = event.nativeEvent.clientY + (align === 'top' ? SizerWidth : 0);
    setDockSize({x, y});
  }

  render() {
    const {align, edge} = this.props;

    const style = {
      height: '100vh'
    };

    return (
      <div style={style}>
        <Sizer
          align={align}
          edge={edge}
          onDragEnd={this.sizerMoved}
        ></Sizer>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Dock.propTypes = {
  align: PropTypes.string.isRequired,
  edge: PropTypes.object.isRequired,
  setDockSize: PropTypes.func.isRequired
};

const Sizer = ({onDragEnd, align, edge}) => (
  <div
    draggable="true"
    style={{
      position: 'absolute',
      zIndex: 100,
      height: '100%',
      width: SizerWidth,
      left: align === 'right' ? 0 : edge.x - SizerWidth,
      cursor: align === 'right' ? 'w-resize' : 'e-resize'
    }}
    onDragEnd={onDragEnd}
  >
  </div>
);
