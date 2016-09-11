import React, {PropTypes, Component} from 'react';
import CodeMirror from 'react-codemirror';

require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');

export default class Pane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '// code'
    };

    this.updateCode = this.updateCode.bind(this);
  }

  componentDidMount() {
    const cm = this.editor && this.editor.getCodeMirror();
    if (!cm) return;
    cm.setSize(null, '100vh');
  }

  updateCode(code) {
    this.setState({code});
  }

  render() {
    const {code} = this.state;
    const {style} = this.props;
    const options = {
      lineNumbers: true,
      mode: 'javascript'
    };

    return (
      <div style={style}>
        <CodeMirror
          ref={(ref) => this.editor = ref}
          value={code}
          onChange={this.updateCode}
          options={options}
        />
      </div>
    );
  }
}

Pane.propTypes = {
  style: PropTypes.object.isRequired
};
