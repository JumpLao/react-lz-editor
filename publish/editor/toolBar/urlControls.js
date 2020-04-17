"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _antd = require("antd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddUrl = function (_Component) {
  _inherits(AddUrl, _Component);

  function AddUrl(props) {
    _classCallCheck(this, AddUrl);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  AddUrl.prototype.render = function render() {
    return _react2.default.createElement(
      "div",
      { className: "RichEditor-controls" },
      _react2.default.createElement(
        "span",
        { className: "RichEditor-styleButton", onClick: this.props.onToggle, title: this.props.lang.addLink },
        _react2.default.createElement(_antd.Icon, { type: "editor_link" })
      )
    );
  };

  return AddUrl;
}(_react.Component);

var CloseUrl = function (_Component2) {
  _inherits(CloseUrl, _Component2);

  function CloseUrl(props) {
    _classCallCheck(this, CloseUrl);

    return _possibleConstructorReturn(this, _Component2.call(this, props));
  }

  CloseUrl.prototype.render = function render() {
    return _react2.default.createElement(
      "div",
      { className: "RichEditor-controls" },
      _react2.default.createElement(
        "span",
        { className: "RichEditor-styleButton", onClick: this.props.onToggle, title: this.props.lang.removeLink },
        _react2.default.createElement(_antd.Icon, { type: "editor_unlink" })
      )
    );
  };

  return CloseUrl;
}(_react.Component);

module.exports = {
  AddUrl: AddUrl,
  CloseUrl: CloseUrl
};