import React, { PropTypes, Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Tabs, Tab } from 'material-ui';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');

import ContextMenu from './ContextMenu';

const PANE_CONTENT_CONTAINER = 'PANE_CONTENT_CONTAINER'; // classname

export default class Pane extends Component {

  static propTypes = {
    files: PropTypes.array.isRequired,
    updateFile: PropTypes.func.isRequired,
    style: PropTypes.object
  };

  state = {
    openContextMenu: {}
  };

  constructor(props) {
    super(props);

    this.updateCode = this.updateCode.bind(this);
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

  updateCode(index, code) {
    const {files, updateFile} = this.props;
    updateFile(index, Object.assign({}, files[index], {code}));
  }

  handleContextMenu(event, filename) {
    event.preventDefault();
    const { clientX, clientY } = event.nativeEvent;
    this.setState({
      openContextMenu: {
        [filename]: { absX: clientX, absY: clientY }
      }
    });
  }

  handleContextMenuClose() {
    this.setState({ openContextMenu: {} });
  }

  render() {
    const { files } = this.props;
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
        primaryText: '--right click menu--'
      }
    ];

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
          label={file.filename}
          style={{ textTransform: 'none' }}
          onContextMenu={(e) => this.handleContextMenu(e, file.filename)}
        >
          <ContextMenu
            menuList={menuList}
            openEvent={openContextMenu[file.filename]}
            onClose={this.handleContextMenuClose}
          />
          <CodeMirror
            ref={this.setEnoughHeight}
            value={file.code}
            onChange={(code) => this.updateCode(index, code)}
            options={options}
          />
        </Tab>
      ))}
      </Tabs>
    );
  }
}
