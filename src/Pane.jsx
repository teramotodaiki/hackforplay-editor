import React, {PropTypes, Component} from 'react';
import CodeMirror from 'react-codemirror';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');

export default class Pane extends Component {
  constructor(props) {
    super(props);

    this.updateCode = this.updateCode.bind(this);
  }

  getStyle = (ref) => {
    this.style = ref.currentStyle || document.defaultView.getComputedStyle(ref);
  }

  setEnoughHeight = (ref) => {
    const cm = ref.getCodeMirror();
    window.addEventListener('resize', () => cm.setSize(this.style.width, this.style.height));
  }

  updateCode(index, code) {
    const {files, updateFile} = this.props;
    updateFile(index, Object.assign({}, files[index], {code}));
  }

  render() {
    const {style, files} = this.props;
    const options = {
      lineNumbers: true,
      mode: 'javascript'
    };

    return (
      <div ref={this.getStyle} style={style}>
        <div style={{ position: 'absolute' }}>
        {files.map((file, index) => (
          <CodeMirror
            key={file.filename}
            ref={this.setEnoughHeight}
            value={file.code}
            onChange={(code) => this.updateCode(index, code)}
            options={options}
          />
        ))}
        </div>
      </div>
    );
  }
}

Pane.propTypes = {
  style: PropTypes.object.isRequired,
  files: PropTypes.array.isRequired
};
