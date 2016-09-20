import React from 'react';
import {render} from 'react-dom';


const CodeMirrorTabStyle = props => (
  <style type="text/css">
    {`
    .cm-tab:before {
      content: '----';
      position: absolute;
      color: #ccc;
      border-left: solid 1px;
      visibility: ${props.visibility ? 'visible' : 'hidden'};
    }
    `}
  </style>
);

export default CodeMirrorTabStyle;
