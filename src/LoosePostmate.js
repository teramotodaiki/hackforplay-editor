var Postmate = require('postmate/build/postmate.min');

/**
 * The type of messages our frames our sending
 * @type {String}
 */
var MESSAGE_TYPE = 'application/x-postmate-v1+json';

// Loose handshake
var sendHandshakeReply = Postmate.Model.prototype.sendHandshakeReply;
Postmate.Model.prototype.sendHandshakeReply = function () {
  return sendHandshakeReply.apply(this, arguments)
    .then(function (info) {
      // ====> ANY ORIGIN CAN RECIEVE THIS REPLY
      info.parentOrigin = '*';
      info.parent.postMessage({
        postmate: 'handshake-reply',
        type: MESSAGE_TYPE,
      }, info.parentOrigin);

      return info;
    });
};

module.exports = Postmate;
