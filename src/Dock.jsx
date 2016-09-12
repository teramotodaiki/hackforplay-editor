import React, {PropTypes, Component} from 'react';
import {Drawer} from 'material-ui';

const SizerWidth = 4;

export default class Dock extends Component {
  constructor(props) {
    super(props);
  }

  sizerMoved = (event) => {
    const {align, setDockSize} = this.props;
    if (align === 'left' || align === 'right') {
      setDockSize({
        x: event.nativeEvent.clientX + (align === 'left' ? SizerWidth : 0)
      });
    } else {
      setDockSize({
        y: event.nativeEvent.clientY + (align === 'top' ? SizerWidth : 0)
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
    />
  );
};
