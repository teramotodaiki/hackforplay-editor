import React, { PropTypes, Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Tabs, Tab } from 'material-ui';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');

const PANE_CONTENT_CONTAINER = 'PANE_CONTENT_CONTAINER'; // classname

export default class Pane extends Component {
  constructor(props) {
    super(props);

    this.updateCode = this.updateCode.bind(this);
  }

  componentDidMount() {
    const ref = document.querySelector('.' + PANE_CONTENT_CONTAINER);
    if (!ref) return;
    this.style = ref.currentStyle || document.defaultView.getComputedStyle(ref);
  }

  setEnoughHeight = (ref) => {
    const cm = ref.getCodeMirror();
    addEventListener('resize', () => this.style && cm.setSize(this.style.width, this.style.height));
  }

  updateCode(index, code) {
    const {files, updateFile} = this.props;
    updateFile(index, Object.assign({}, files[index], {code}));
  }

  render() {
    const {files} = this.props;
    const options = {
      lineNumbers: true,
      mode: 'javascript'
    };

    const style = Object.assign({
      display: 'flex',
      flexDirection: 'column'
    }, this.props.style);

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
        >
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

Pane.propTypes = {
  style: PropTypes.object.isRequired,
  files: PropTypes.array.isRequired
};
