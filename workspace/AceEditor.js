System.register(['ace', 'react', 'lodash'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var ace_1, react_1, lodash_1;
    var Range, editorOptions, AceEditor;
    return {
        setters:[
            function (ace_1_1) {
                ace_1 = ace_1_1;
            },
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }],
        execute: function() {
            Range = ace_1["default"].require('ace/range').Range;
            editorOptions = [
                'minLines',
                'maxLines',
                'readOnly',
                'highlightActiveLine',
                'tabSize',
                'enableBasicAutocompletion',
                'enableLiveAutocompletion',
                'enableSnippets',
            ];
            AceEditor = (function (_super) {
                __extends(AceEditor, _super);
                function AceEditor(props) {
                    var _this = this;
                    _super.call(this, props);
                    [
                        'onChange',
                        'onFocus',
                        'onBlur',
                        'onCopy',
                        'onPaste',
                        'onScroll',
                        'handleOptions',
                    ]
                        .forEach(function (method) {
                        _this[method] = _this[method].bind(_this);
                    });
                }
                AceEditor.prototype.componentDidMount = function () {
                    var _this = this;
                    var _a = this.props, name = _a.name, className = _a.className, onBeforeLoad = _a.onBeforeLoad, mode = _a.mode, focus = _a.focus, theme = _a.theme, fontSize = _a.fontSize, value = _a.value, defaultValue = _a.defaultValue, cursorStart = _a.cursorStart, showGutter = _a.showGutter, wrapEnabled = _a.wrapEnabled, showPrintMargin = _a.showPrintMargin, keyboardHandler = _a.keyboardHandler, onLoad = _a.onLoad, commands = _a.commands, annotations = _a.annotations, markers = _a.markers;
                    this.editor = ace_1["default"].edit(this.refs.editor);
                    if (onBeforeLoad) {
                        onBeforeLoad(ace_1["default"]);
                    }
                    var editorProps = Object.keys(this.props.editorProps);
                    for (var i = 0; i < editorProps.length; i++) {
                        this.editor[editorProps[i]] = this.props.editorProps[editorProps[i]];
                    }
                    this.editor.getSession().setMode("ace/mode/" + mode);
                    this.editor.setTheme("ace/theme/" + theme);
                    this.editor.setFontSize(fontSize);
                    this.editor.setValue(defaultValue === undefined ? value : defaultValue, cursorStart);
                    this.editor.renderer.setShowGutter(showGutter);
                    this.editor.getSession().setUseWrapMode(wrapEnabled);
                    this.editor.setShowPrintMargin(showPrintMargin);
                    this.editor.on('focus', this.onFocus);
                    this.editor.on('blur', this.onBlur);
                    this.editor.on('copy', this.onCopy);
                    this.editor.on('paste', this.onPaste);
                    this.editor.on('change', this.onChange);
                    this.editor.session.on('changeScrollTop', this.onScroll);
                    this.handleOptions(this.props);
                    this.editor.getSession().setAnnotations(annotations || []);
                    this.handleMarkers(markers || []);
                    // get a list of possible options to avoid 'misspelled option errors'
                    var availableOptions = this.editor.$options;
                    for (var i = 0; i < editorOptions.length; i++) {
                        var option = editorOptions[i];
                        if (availableOptions.hasOwnProperty(option)) {
                            this.editor.setOption(option, this.props[option]);
                        }
                    }
                    if (Array.isArray(commands)) {
                        commands.forEach(function (command) {
                            _this.editor.commands.addCommand(command);
                        });
                    }
                    if (keyboardHandler) {
                        this.editor.setKeyboardHandler('ace/keyboard/' + keyboardHandler);
                    }
                    if (className) {
                        this.refs.editor.className += ' ' + className;
                    }
                    if (focus) {
                        this.editor.focus();
                    }
                    if (onLoad) {
                        onLoad(this.editor);
                    }
                };
                AceEditor.prototype.componentWillReceiveProps = function (nextProps) {
                    var oldProps = this.props;
                    for (var i = 0; i < editorOptions.length; i++) {
                        var option = editorOptions[i];
                        if (nextProps[option] !== oldProps[option]) {
                            this.editor.setOption(option, nextProps[option]);
                        }
                    }
                    if (nextProps.className !== oldProps.className) {
                        var appliedClasses = this.refs.editor.className;
                        var appliedClassesArray_1 = appliedClasses.trim().split(' ');
                        var oldClassesArray = oldProps.className.trim().split(' ');
                        oldClassesArray.forEach(function (oldClass) {
                            var index = appliedClassesArray_1.indexOf(oldClass);
                            appliedClassesArray_1.splice(index, 1);
                        });
                        this.refs.editor.className = ' ' + nextProps.className + ' ' + appliedClassesArray_1.join(' ');
                    }
                    if (nextProps.mode !== oldProps.mode) {
                        this.editor.getSession().setMode('ace/mode/' + nextProps.mode);
                    }
                    if (nextProps.theme !== oldProps.theme) {
                        this.editor.setTheme('ace/theme/' + nextProps.theme);
                    }
                    if (nextProps.keyboardHandler !== oldProps.keyboardHandler) {
                        if (nextProps.keyboardHandler) {
                            this.editor.setKeyboardHandler('ace/keyboard/' + nextProps.keyboardHandler);
                        }
                        else {
                            this.editor.setKeyboardHandler(null);
                        }
                    }
                    if (nextProps.fontSize !== oldProps.fontSize) {
                        this.editor.setFontSize(nextProps.fontSize);
                    }
                    if (nextProps.wrapEnabled !== oldProps.wrapEnabled) {
                        this.editor.getSession().setUseWrapMode(nextProps.wrapEnabled);
                    }
                    if (nextProps.showPrintMargin !== oldProps.showPrintMargin) {
                        this.editor.setShowPrintMargin(nextProps.showPrintMargin);
                    }
                    if (nextProps.showGutter !== oldProps.showGutter) {
                        this.editor.renderer.setShowGutter(nextProps.showGutter);
                    }
                    if (!lodash_1["default"](nextProps.setOptions, oldProps.setOptions)) {
                        this.handleOptions(nextProps);
                    }
                    if (!lodash_1["default"](nextProps.annotations, oldProps.annotations)) {
                        this.editor.getSession().setAnnotations(nextProps.annotations || []);
                    }
                    if (!lodash_1["default"](nextProps.markers, oldProps.markers)) {
                        this.handleMarkers(nextProps.markers || []);
                    }
                    if (this.editor && this.editor.getValue() !== nextProps.value) {
                        // editor.setValue is a synchronous function call, change event is emitted before setValue return.
                        this.silent = true;
                        var pos = this.editor.session.selection.toJSON();
                        this.editor.setValue(nextProps.value, nextProps.cursorStart);
                        this.editor.session.selection.fromJSON(pos);
                        this.silent = false;
                    }
                    if (nextProps.focus && !oldProps.focus) {
                        this.editor.focus();
                    }
                    if (nextProps.height !== this.props.height) {
                        this.editor.resize();
                    }
                };
                AceEditor.prototype.componentWillUnmount = function () {
                    this.editor.destroy();
                    this.editor = null;
                };
                AceEditor.prototype.onChange = function () {
                    if (this.props.onChange && !this.silent) {
                        var value = this.editor.getValue();
                        this.props.onChange(value);
                    }
                };
                AceEditor.prototype.onFocus = function () {
                    if (this.props.onFocus) {
                        this.props.onFocus();
                    }
                };
                AceEditor.prototype.onBlur = function () {
                    if (this.props.onBlur) {
                        this.props.onBlur();
                    }
                };
                AceEditor.prototype.onCopy = function (text) {
                    if (this.props.onCopy) {
                        this.props.onCopy(text);
                    }
                };
                AceEditor.prototype.onPaste = function (text) {
                    if (this.props.onPaste) {
                        this.props.onPaste(text);
                    }
                };
                AceEditor.prototype.onScroll = function () {
                    if (this.props.onScroll) {
                        this.props.onScroll(this.editor);
                    }
                };
                AceEditor.prototype.handleOptions = function (props) {
                    var setOptions = Object.keys(props.setOptions);
                    for (var y = 0; y < setOptions.length; y++) {
                        this.editor.setOption(setOptions[y], props.setOptions[setOptions[y]]);
                    }
                };
                AceEditor.prototype.handleMarkers = function (markers) {
                    var _this = this;
                    // remove foreground markers
                    var currentMarkers = this.editor.getSession().getMarkers(true);
                    for (var i in currentMarkers) {
                        if (currentMarkers.hasOwnProperty(i)) {
                            this.editor.getSession().removeMarker(currentMarkers[i].id);
                        }
                    }
                    // remove background markers
                    currentMarkers = this.editor.getSession().getMarkers(false);
                    for (var i in currentMarkers) {
                        if (currentMarkers.hasOwnProperty(i)) {
                            this.editor.getSession().removeMarker(currentMarkers[i].id);
                        }
                    }
                    // add new markers
                    markers.forEach(function (_a) {
                        var startRow = _a.startRow, startCol = _a.startCol, endRow = _a.endRow, endCol = _a.endCol, className = _a.className, type = _a.type, _b = _a.inFront, inFront = _b === void 0 ? false : _b;
                        var range = new Range(startRow, startCol, endRow, endCol);
                        _this.editor.getSession().addMarker(range, className, type, inFront);
                    });
                };
                AceEditor.prototype.render = function () {
                    var _a = this.props, name = _a.name, width = _a.width, height = _a.height, style = _a.style;
                    var divStyle = { width: width, height: height, style: style };
                    return (react_1["default"].createElement("div", {ref: "editor", id: name, style: divStyle}));
                };
                return AceEditor;
            }(react_1.PureComponent));
            exports_1("default", AceEditor);
            AceEditor.propTypes = {
                mode: react_1.PropTypes.string,
                focus: react_1.PropTypes.bool,
                theme: react_1.PropTypes.string,
                name: react_1.PropTypes.string,
                className: react_1.PropTypes.string,
                height: react_1.PropTypes.string,
                width: react_1.PropTypes.string,
                fontSize: react_1.PropTypes.oneOfType([
                    react_1.PropTypes.number,
                    react_1.PropTypes.string,
                ]),
                showGutter: react_1.PropTypes.bool,
                onChange: react_1.PropTypes.func,
                onCopy: react_1.PropTypes.func,
                onPaste: react_1.PropTypes.func,
                onFocus: react_1.PropTypes.func,
                onBlur: react_1.PropTypes.func,
                onScroll: react_1.PropTypes.func,
                value: react_1.PropTypes.string,
                defaultValue: react_1.PropTypes.string,
                onLoad: react_1.PropTypes.func,
                onBeforeLoad: react_1.PropTypes.func,
                minLines: react_1.PropTypes.number,
                maxLines: react_1.PropTypes.number,
                readOnly: react_1.PropTypes.bool,
                highlightActiveLine: react_1.PropTypes.bool,
                tabSize: react_1.PropTypes.number,
                showPrintMargin: react_1.PropTypes.bool,
                cursorStart: react_1.PropTypes.number,
                editorProps: react_1.PropTypes.object,
                setOptions: react_1.PropTypes.object,
                annotations: react_1.PropTypes.array,
                markers: react_1.PropTypes.array,
                keyboardHandler: react_1.PropTypes.string,
                wrapEnabled: react_1.PropTypes.bool,
                enableBasicAutocompletion: react_1.PropTypes.oneOfType([
                    react_1.PropTypes.bool,
                    react_1.PropTypes.array,
                ]),
                enableLiveAutocompletion: react_1.PropTypes.oneOfType([
                    react_1.PropTypes.bool,
                    react_1.PropTypes.array,
                ]),
                commands: react_1.PropTypes.array
            };
            AceEditor.defaultProps = {
                name: 'brace-editor',
                focus: false,
                mode: '',
                theme: '',
                height: '500px',
                width: '500px',
                value: '',
                fontSize: 12,
                showGutter: true,
                onChange: null,
                onPaste: null,
                onLoad: null,
                onScroll: null,
                minLines: null,
                maxLines: null,
                readOnly: false,
                highlightActiveLine: true,
                showPrintMargin: true,
                tabSize: 4,
                cursorStart: 1,
                editorProps: {},
                setOptions: {},
                wrapEnabled: false,
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false
            };
        }
    }
});
//# sourceMappingURL=AceEditor.js.map