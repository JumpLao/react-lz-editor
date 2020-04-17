'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _businessComponents = require('../../global/components/businessComponents');

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImgStyleControls = function (_Component) {
  _inherits(ImgStyleControls, _Component);

  function ImgStyleControls(props) {
    _classCallCheck(this, ImgStyleControls);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      provisible: false,
      previsible: false,
      images: [],
      loadingRemoteImageFun: null,
      pfopImages: []
    };
    _this.successedCount = 0;

    _this.onImgToggle = _this.onImgToggle.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.prepareToSendImageToEditor = _this.prepareToSendImageToEditor.bind(_this);
    _this.getImgObject = _this.getImgObject.bind(_this);

    _this.groupAppend = _this.groupAppend.bind(_this);
    _this.failureLoading = _this.failureLoading.bind(_this);
    _this.reloadPfopingPictrue = _this.reloadPfopingPictrue.bind(_this);
    _this.successLoading = _this.successLoading.bind(_this);

    _this.handleCancelUploading = _this.handleCancelUploading.bind(_this);
    _this.realLoading = _this.realLoading.bind(_this);
    _this.reloadUploadingPictrue = _this.reloadUploadingPictrue.bind(_this);
    return _this;
  }

  ImgStyleControls.prototype.getImgObject = function getImgObject(fileObj) {
    this.state.images = fileObj;
    if (!!this.state.images) {
      this.setState({ disabled: false });
    }
    this.forceUpdate();
  };

  ImgStyleControls.prototype.prepareToSendImageToEditor = function prepareToSendImageToEditor() {
    if (!!this.state.images.length) {
      this.state.loadingRemoteImageFun = _antd.message.loading(this.props.lang.inPreviewProgress, 0);
    }
  };

  ImgStyleControls.prototype.successLoading = function successLoading(type) {
    if (type == "fromImg") {
      if (this.successedCount + 1 < this.state.images.length) {
        this.successedCount += 1;
        return false;
      }
      this.successedCount = 0;
      setTimeout(this.state.loadingRemoteImageFun, 500);
    }
    console.log('successLoading this.state.images', this.state.images);
    var pfopImages = this.state.images && this.state.images.map(function (item) {
      item.url = item.url && item.url.substr(0, ~item.url.lastIndexOf("?t=") ? item.url.lastIndexOf("?t=") : item.url.length) + "?t=foreditor";
      return item;
    });

    var validPfopImages = (0, _cloneDeep2.default)(pfopImages, function (item) {
      return !!item.url;
    });
    if (validPfopImages.length) {
      this.setState({ provisible: false, pfopImages: validPfopImages, previsible: true });
    } else {
      console.warn('Invalid uploading images, please check your uploading object again!');
    }
  };

  ImgStyleControls.prototype.realLoading = function realLoading(type) {
    var images = (0, _cloneDeep2.default)(this.state.pfopImages);

    this.setState({ provisible: false, images: [], pfopImages: [], previsible: false });
    this.props.receiveImage(images);
  };

  ImgStyleControls.prototype.failureLoading = function failureLoading(event, index) {
    var _this2 = this;

    var picture = this.state.images[index].url;
    if (!!picture && picture != "reset") {
      setTimeout(function () {
        _this2.reloadPfopingPictrue(picture, index);
      }, 300);
    }
  };

  ImgStyleControls.prototype.reloadPfopingPictrue = function reloadPfopingPictrue(picture, index) {
    var thePicture = picture.substr(0, ~picture.lastIndexOf("?t=") ? picture.lastIndexOf("?t=") : picture.length);
    var n = picture.substr((~picture.lastIndexOf("?t=") ? picture.lastIndexOf("?t=") : picture.length) + 3);
    picture = thePicture + "?t=" + (parseInt(!!n ? n : "0") + 1);
    this.state.images[index].url = picture;
    this.forceUpdate();
  };

  ImgStyleControls.prototype.reloadUploadingPictrue = function reloadUploadingPictrue(picture, index) {
    var thePicture = picture.substr(0, ~picture.lastIndexOf("?t=") ? picture.lastIndexOf("?t=") : picture.length);
    var n = picture.substr((~picture.lastIndexOf("?t=") ? picture.lastIndexOf("?t=") : picture.length) + 3);
    picture = thePicture + "?t=" + (parseInt(!!n ? n : "0") + 1);
    if (!!this.state.pfopImages[index]) {
      this.state.pfopImages[index].url = picture;
    }
    this.forceUpdate();
  };

  ImgStyleControls.prototype.groupAppend = function groupAppend(pictureList) {
    var _this3 = this;

    if (!pictureList.length) {
      console.warn("ERROR: no pictureList sent to me, see pictureList", pictureList);
      return false;
    }
    var images = pictureList.map(function (item) {
      return { "url": item };
    });


    this.setState({ images: [], pfopImages: [] });
    setTimeout(function () {
      _this3.setState({ provisible: false, previsible: false });
    }, 1000);
    this.props.receiveImage((0, _cloneDeep2.default)(images));
    pictureList = [];
  };

  ImgStyleControls.prototype.onImgToggle = function onImgToggle() {
    this.setState({ provisible: true, previsible: false, disabled: true, images: [] });
  };

  ImgStyleControls.prototype.handleCancel = function handleCancel(e) {
    this.setState({ provisible: false, previsible: false, images: [] });
  };

  ImgStyleControls.prototype.handleCancelUploading = function handleCancelUploading(e) {
    this.setState({ provisible: false, previsible: false, pfopImages: [] });
  };

  ImgStyleControls.prototype.render = function render() {
    var _this4 = this;

    var className = 'RichEditor-styleButton';
    var that = this;
    return _react2.default.createElement(
      'div',
      { className: 'RichEditor-controls' },
      _react2.default.createElement(
        _businessComponents.GroupUpload,
        {
          limitCount: 50,
          imageList: this.state.images && this.state.images.map(function (item) {
            item.url;
          }),
          atuoSize: [650, 0],
          receiveSelectedPictures: this.groupAppend,
          uploadConfig: this.props.uploadConfig,
          uploadProps: this.props.uploadProps,
          watermarkImage: this.props.watermarkImage,
          lang: this.props.lang },
        _react2.default.createElement(
          'span',
          { className: className },
          _react2.default.createElement(_antd.Icon, { type: 'editor_image_masker', title: this.props.lang.imageMasker })
        )
      ),
      _react2.default.createElement(
        'span',
        { className: className, onClick: that.onImgToggle },
        _react2.default.createElement(_antd.Icon, { type: 'editor_image', title: this.props.lang.originalImage })
      ),
      _react2.default.createElement(
        'div',
        {
          style: {
            width: 0,
            height: 0,
            display: "inline",
            overflow: "hidden",
            position: "absolute"
          } },
        this.state.images && this.state.images.map(function (item, index) {
          return _react2.default.createElement('img', { style: { width: "100px" }, src: item.url + "?t=10",
            onError: function onError(event) {
              return _this4.failureLoading(event, index);
            },
            onLoad: function onLoad() {
              return _this4.successLoading("fromImg");
            } });
        })
      ),
      _react2.default.createElement(
        _antd.Modal,
        {
          title: this.props.lang.insertImageModalTitle,
          visible: that.state.provisible,
          closable: false,
          footer: [_react2.default.createElement(
            _antd.Button,
            { key: 'back', size: 'large', onClick: that.handleCancel },
            ' ',
            this.props.lang.cancelText,
            ' '
          ), _react2.default.createElement(
            _antd.Button,
            { key: 'submit', type: 'primary', size: 'large', disabled: that.state.disabled, onClick: function onClick() {
                return that.successLoading("fromOld");
              } },
            ' ',
            this.props.lang.OKText,
            ' '
          )] },
        _react2.default.createElement(_businessComponents.UploadImage, {
          isMultiple: true,
          fileList: that.state.images,
          isOpenModel: that.state.provisible,
          cbReceiver: that.getImgObject,
          uploadConfig: this.props.uploadConfig,
          uploadProps: this.props.uploadProps,
          lang: this.props.lang,
          limit: 10,
          fileType: 'image' })
      ),
      _react2.default.createElement(
        _antd.Modal,
        {
          title: this.props.lang.previewImageModalTitle,
          visible: that.state.previsible,
          width: 800,
          closable: false,
          footer: [_react2.default.createElement(
            _antd.Button,
            { key: 'back', size: 'large', onClick: that.handleCancelUploading },
            ' ',
            this.props.lang.cancelText,
            ' '
          ), _react2.default.createElement(
            _antd.Button,
            { key: 'submit', type: 'primary', size: 'large', disabled: that.state.pfopImages.length == 0, onClick: function onClick() {
                return that.realLoading("fromOld");
              } },
            ' ',
            this.props.lang.validatedImage,
            ' '
          )] },
        _react2.default.createElement(
          'div',
          { className: 'uploadingImagies' },
          that.state.pfopImages.map(function (item, index) {
            var url = item.url;
            return _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'a',
                { onClick: function onClick() {
                    return that.reloadUploadingPictrue(url, index);
                  }, title: _this4.props.lang.refreshImage },
                _react2.default.createElement(_antd.Icon, { type: 'reload' })
              ),
              _react2.default.createElement('img', { src: url })
            );
          })
        )
      )
    );
  };

  return ImgStyleControls;
}(_react.Component);

ImgStyleControls.defaultProps = {};
module.exports = ImgStyleControls;