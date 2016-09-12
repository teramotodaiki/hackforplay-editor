import React, {PropTypes, Component} from 'react';
import {Dialog, FlatButton, TextField} from 'material-ui';

export default class SaveDialog extends Component {
  constructor(props) {
    super(props);
    const file = this.props;

    this.state = {
      value: null
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({value});
  }

  handleSave = () => {
    const {file, onRequestClose} = this.props;
    // download
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    const elem = document.createElement('a');
    elem.download = this.state.value || file.filename;
    elem.href = URL.createObjectURL(new Blob([file.code]));
    elem.dispatchEvent(event);

    this.handleClose();
  }

  handleClose = () => {
    this.setState({ value: null });
    this.props.onRequestClose();
  }

  render() {
    const {open, file, onRequestClose} = this.props;
    const {value} = this.state;

    const filename = value !== null ? value : file.filename;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onTouchTap={this.handleSave}
      />
    ];

    return (
      <Dialog
        title="Save as"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={this.handleClose}
      >
        <TextField
          value={filename}
          onChange={this.handleChange}
        />
      </Dialog>
    );
  }
}

SaveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  file: PropTypes.object.isRequired,
  onRequestClose: PropTypes.func.isRequired
};
