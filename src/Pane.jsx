import React, { PropTypes, Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Tabs, Tab } from 'material-ui';
import PlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';

require('codemirror/mode/javascript/javascript');
require('codemirror/addon/hint/show-hint');
require('./codemirror-hint-extension');

require('codemirror/lib/codemirror.css');
require('codemirror/addon/hint/show-hint.css')
require('./css/codemirror-extension.css');


const PANE_CONTENT_CONTAINER = 'PANE_CONTENT_CONTAINER'; // classname

export default class Pane extends Component {

  static propTypes = {
    files: PropTypes.array.isRequired,
    updateFile: PropTypes.func.isRequired,
    onTabContextMenu: PropTypes.func.isRequired,
    tabVisible: PropTypes.bool.isRequired,
    style: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  handleCodemirror = (ref) => {
    const cm = ref.getCodeMirror();
    this.showHint(cm);
    this.setEnoughHeight(cm);
  }

  showHint(cm) {
    cm.on('change', (_cm, change) => {
      if (change.origin === 'setValue') return;
      const token = cm.getTokenAt(cm.getCursor());
      if (token.type !== null) {
        cm.showHint({ completeSingle: false });
      }
    });
  }

  getStyle() {
    if (!this.style) {
      const ref = document.querySelector('.' + PANE_CONTENT_CONTAINER);
      if (!ref) return { width: '100%', height: 300 };
      this.style = ref.currentStyle || document.defaultView.getComputedStyle(ref);
    }
    return this.style;
  }

  setEnoughHeight(cm) {
    const setSize = () => cm.setSize(this.getStyle().width, this.getStyle().height);
    setSize();
    addEventListener('resize', setSize); // TODO: Should remove event listener in file removed
  }

  handleContextMenu(event, file) {
    event.preventDefault();
    const { clientX, clientY } = event.nativeEvent;
    this.props.onTabContextMenu({ file, event: { absX: clientX, absY: clientY } });
  }

  render() {
    const { files, updateFile, tabVisible } = this.props;
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      indentUnit: 4,
      indentWithTabs: true,
    };

    const style = Object.assign({
      display: 'flex',
      flexDirection: 'column'
    }, this.props.style);

    const tabLabels = files.map(file => file.isEntryPoint ? (
      <span>
        <PlayCircleOutline color="white" style={{ position: 'absolute', marginLeft: '-1rem', marginTop: -4 }} />
          <span style={{ marginLeft: '1rem' }}>
            {file.filename}
          </span>
      </span>
    ) : file.filename);

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
          label={tabLabels[index]}
          style={{ textTransform: 'none' }}
          onContextMenu={(e) => this.handleContextMenu(e, file)}
        >
          <CodeMirror
            className={tabVisible ? 'ReactCodeMirror__tab-visible' : ''}
            ref={this.handleCodemirror}
            value={file.code}
            onChange={(code) => updateFile(file, { code })}
            options={options}
          />
        </Tab>
      ))}
      </Tabs>
    );
  }
}
