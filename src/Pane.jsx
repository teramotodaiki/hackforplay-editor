import React, {PropTypes, Component} from 'react';
import CodeMirror from 'react-codemirror';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');

export default class Pane extends Component {
  constructor(props) {
    super(props);

    this.updateCode = this.updateCode.bind(this);
  }

  setEnoughHeight(ref) {
    ref.getCodeMirror().setSize(null, '100vh');
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
      <div style={style}>
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
    );
  }
}

Pane.propTypes = {
  style: PropTypes.object.isRequired,
  files: PropTypes.array.isRequired
};
