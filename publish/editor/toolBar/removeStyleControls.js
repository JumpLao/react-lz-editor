'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RemoveStyleControls = function (_Component) {
  _inherits(RemoveStyleControls, _Component);

  function RemoveStyleControls(props) {
    _classCallCheck(this, RemoveStyleControls);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  RemoveStyleControls.prototype.render = function render() {
    var className = 'RichEditor-styleButton';
    return _react2.default.createElement(
      'div',
      { className: 'RichEditor-controls' },
      _react2.default.createElement(
        _antd.Popconfirm,
        { title: this.props.lang.confirmToRemove, onConfirm: this.props.onToggle, okText: this.props.lang.doRemove, cancelText: this.props.lang.doNotRemove },
        _react2.default.createElement(
          'span',
          { className: className },
          _react2.default.createElement(_antd.Icon, { key: 'empty_style', type: 'editor_empty_style' })
        )
      )
    );
  };

  return RemoveStyleControls;
}(_react.Component);

module.exports = RemoveStyleControls;