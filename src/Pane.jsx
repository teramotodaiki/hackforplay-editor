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

  updateCode(code) {
    this.setState({code});
  }

  render() {
    const {code} = this.state;
    const option = {
      lineNumbers: true,
      mode: 'javascript'
    };

    return (
      <div>
        <CodeMirror
          value={code}
          onChange={this.updateCode}
          option={option}
        />
      </div>
    );
  }
}

Pane.propTypes = {
};
