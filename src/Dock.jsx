import React, {PropTypes, Component} from 'react';
import {Drawer} from 'material-ui';

const SizerWidth = 4;

export default class Dock extends Component {
  constructor(props) {
    super(props);
  }

  sizerMoved = (event) => {
    const {align, setDockSize} = this.props;
    const {clientX, clientY} = event.nativeEvent;
    const offset = align === 'left' || align === 'top' ? SizerWidth : 0;

    if (align === 'left' || align === 'right') {
      setDockSize({
        x: (
          typeof clientX !== 'undefined' ? clientX :
          event.nativeEvent.screenX - screenX // issue #16
        ) + offset
      });
    } else {
      setDockSize({
        y: (
          typeof clientY !== 'undefined' ? clientY :
          event.nativeEvent.screenY - screenY // issue #16
        ) + offset
      });
    }
  }

  render() {
    const {align, edge} = this.props;

    const style = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%',
    };

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Sizer
          align={align}
          edge={edge}
          onDragEnd={this.sizerMoved}
        />
        <div style={style}>
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

const Sizer = ({onDragEnd, align, edge}) => {

  const top_btm = align === 'top' || align === 'bottom';
  const cursor = { top: 's', right: 'w', left: 'e', bottom: 'n' }[align] + '-resize';

  return (
    <div
      draggable="true"
      style={{
        position: 'absolute',
        zIndex: 100,
        height: top_btm ? SizerWidth : '100%',
        width: !top_btm ? SizerWidth : '100%',
        top: align === 'top' ? edge.y - SizerWidth : 0,
        left: align === 'left' ? edge.x - SizerWidth : 0,
        cursor
      }}
      onDragEnd={onDragEnd}
      onDragStart={setDummyDataTransfer}
    />
  );
};

const setDummyDataTransfer = (event) => {
  event.nativeEvent.dataTransfer.setData('text/plane', '');
};
