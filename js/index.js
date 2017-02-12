'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  App.prototype.render = function render() {
    return React.createElement(Calculator, null);
  };

  return App;
}(React.Component);

var Calculator = function (_React$Component2) {
  _inherits(Calculator, _React$Component2);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

    _this2.state = {
      negative: false,
      pressed: '',
      output: '',
      chained: '',
      operation: '',
      operations: [],
      modifiers: []
    };
    _this2.handlePress = _this2.handlePress.bind(_this2);
    _this2.handleNegative = _this2.handleNegative.bind(_this2);
    _this2.determineOutput = _this2.determineOutput.bind(_this2);
    _this2.determineChained = _this2.determineChained.bind(_this2);
    _this2.determineOperation = _this2.determineOperation.bind(_this2);
    _this2.parseChain = _this2.parseChain.bind(_this2);
    _this2.isNumeric = _this2.isNumeric.bind(_this2);
    return _this2;
  }

  Calculator.prototype.componentWillMount = function componentWillMount() {
    this.setState({
      negative: false,
      pressed: '',
      output: '0',
      chained: '',
      operation: '',
      operations: ['+', '-', '*', '/'],
      modifiers: ['.', 'n']
    });
  };

  Calculator.prototype.handlePress = function handlePress(event) {
    var newPress = event.target.value;
    this.setState({
      pressed: newPress,
      negative: this.handleNegative(newPress, this.state.negative),
      output: this.determineOutput(newPress, this.state.output, this.state.chained, this.state.operation, this.state.negative, this.state.percentage),
      chained: this.determineChained(newPress, this.state.output, this.state.chained, this.state.operation, this.state.negative, this.state.percentage),
      operation: this.determineOperation(newPress)
    });
  };

  Calculator.prototype.handleNegative = function handleNegative(pressed, previous) {
    if ('n' === pressed) {
      return !previous;
    }
  };

  Calculator.prototype.determineOutput = function determineOutput(pressed, output, chained, operation, negative, percentage) {
    if ('ac' === pressed || 'ce' === pressed) {
      return '';
    } else if ('.' === pressed) {
      return output.includes('.') ? output : output + pressed;
    } else if (this.isNumeric(pressed)) {
      return output === '0' ? pressed : output + pressed;
    } else if (this.state.operations.indexOf(pressed) >= 0) {
      return '';
    } else if ('=' === pressed) {
      return '';
    } else {
      return output;
    }
  };

  Calculator.prototype.determineChained = function determineChained(pressed, output, chained, operation, negative, percentage) {
    var adjOutput = Number(output).toString(); //Removes leading zeroes
    var val = negative ? percentage ? '-' + adjOutput + '%' : '-' + adjOutput : percentage ? adjOutput + '%' : adjOutput;
    if ('ac' === pressed) {
      return '';
    } else if ('' === pressed) {
      return chained;
    } else if ('ce' === pressed || this.isNumeric(pressed) || this.state.modifiers.indexOf(pressed) >= 0) {
      return '=' === operation ? '' : chained;
    } else if ('=' === pressed) {
      return this.parseChain(val, chained);
    } else {
      return chained ? chained + val + pressed : val + pressed;
    }
  };

  Calculator.prototype.determineOperation = function determineOperation(pressed) {
    if (this.state.operations.indexOf(pressed) >= 0) {
      return pressed;
    } else if ('ac' === pressed) {
      return '';
    } else if ('=' === pressed) {
      return '=';
    } else {
      return '';
    }
  };

  Calculator.prototype.parseChain = function parseChain(output, chained) {
    return eval(chained + output);
  };

  Calculator.prototype.isNumeric = function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  Calculator.prototype.render = function render() {
    var calculatorStyle = {
      fontFamily: 'monospace',
      margin: 'auto',
      width: 300,
      textAlign: 'center',
      marginTop: 40,
      borderRadius: '20',
      border: '1px solid #444',
      boxShadow: '0 -10px 50px #777 inset',
      backgroundColor: '#dfd8d0'
    };
    return React.createElement(
      'div',
      { className: 'well well-sm', style: calculatorStyle },
      React.createElement(Header, { text: 'Electronic Calculator' }),
      React.createElement(OutputsWrapper, {
        output: this.state.output,
        chained: this.state.chained,
        operation: this.state.operation,
        negative: this.state.negative }),
      React.createElement(Keys, {
        onPress: this.handlePress }),
      React.createElement(Footer, { text: 'Den Temple | Powered by ReactJS' })
    );
  };

  return Calculator;
}(React.Component);

var Keys = function (_React$Component3) {
  _inherits(Keys, _React$Component3);

  function Keys() {
    _classCallCheck(this, Keys);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  Keys.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        Row,
        null,
        React.createElement(Key, { onPress: this.props.onPress, pressed: 'ac', symbol: 'ac' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: 'ce', symbol: 'ce' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: 'n', symbol: '±' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '/', symbol: '÷' })
      ),
      React.createElement(
        Row,
        null,
        React.createElement(Key, { onPress: this.props.onPress, pressed: '7', symbol: '7' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '8', symbol: '8' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '9', symbol: '9' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '*', symbol: 'x' })
      ),
      React.createElement(
        Row,
        null,
        React.createElement(Key, { onPress: this.props.onPress, pressed: '4', symbol: '4' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '5', symbol: '5' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '6', symbol: '6' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '-', symbol: '-' })
      ),
      React.createElement(
        Row,
        null,
        React.createElement(Key, { onPress: this.props.onPress, pressed: '1', symbol: '1' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '2', symbol: '2' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '3', symbol: '3' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '+', symbol: '+' })
      ),
      React.createElement(
        Row,
        null,
        React.createElement(Key, { onPress: this.props.onPress, pressed: '0', symbol: '0' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '00', symbol: '00' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '.', symbol: '.' }),
        React.createElement(Key, { onPress: this.props.onPress, pressed: '=', symbol: '=' })
      )
    );
  };

  return Keys;
}(React.Component);

var Key = function (_React$Component4) {
  _inherits(Key, _React$Component4);

  function Key() {
    _classCallCheck(this, Key);

    return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
  }

  Key.prototype.render = function render() {
    var keyStyle = {
      fontSize: 16,
      fontWeight: 'bold',
      borderRadius: 5,
      margin: 5,
      height: 50,
      width: 50,
      boxShadow: '0px 3px 0px 0px #222121, inset -1px -3px 10px 1px #515151'
    };
    return React.createElement(
      'button',
      {
        className: 'btn btn-primary raised',
        style: keyStyle,
        onClick: this.props.onPress,
        value: this.props.pressed },
      this.props.symbol
    );
  };

  return Key;
}(React.Component);

var OutputsWrapper = function (_React$Component5) {
  _inherits(OutputsWrapper, _React$Component5);

  function OutputsWrapper() {
    _classCallCheck(this, OutputsWrapper);

    return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
  }

  OutputsWrapper.prototype.render = function render() {
    var outputStyle = {
      padding: '0 auto',
      margin: '0 auto',
      textAlign: 'right',
      width: '80%'
    };
    return React.createElement(
      'div',
      { style: outputStyle },
      React.createElement(MainWindow, {
        main: this.props.output,
        negative: this.props.negative,
        addon: this.props.operation }),
      React.createElement(SubWindow, { show: this.props.chained })
    );
  };

  return OutputsWrapper;
}(React.Component);

var MainWindow = function (_React$Component6) {
  _inherits(MainWindow, _React$Component6);

  function MainWindow() {
    _classCallCheck(this, MainWindow);

    return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
  }

  MainWindow.prototype.render = function render() {
    var outputStyle = {
      padding: '0 auto',
      margin: '0 auto'
    };
    return React.createElement(
      'div',
      { className: 'input-group', style: outputStyle },
      React.createElement(AddonOutput, {
        show: this.props.addon }),
      React.createElement(MainOutput, {
        show: this.props.main,
        negative: this.props.negative })
    );
  };

  return MainWindow;
}(React.Component);

var AddonOutput = function (_React$Component7) {
  _inherits(AddonOutput, _React$Component7);

  function AddonOutput() {
    _classCallCheck(this, AddonOutput);

    return _possibleConstructorReturn(this, _React$Component7.apply(this, arguments));
  }

  AddonOutput.prototype.render = function render() {
    var outputStyle = {
      backgroundColor: '#FFF'
    };
    return React.createElement(
      'span',
      { className: 'input-group-addon', style: outputStyle },
      this.props.show
    );
  };

  return AddonOutput;
}(React.Component);

var MainOutput = function (_React$Component8) {
  _inherits(MainOutput, _React$Component8);

  function MainOutput() {
    _classCallCheck(this, MainOutput);

    return _possibleConstructorReturn(this, _React$Component8.apply(this, arguments));
  }

  MainOutput.prototype.printValue = function printValue() {
    var val = this.props.show;
    var chars = 15;
    return val.length > chars ? val.substr(val.length - chars) : val;
  };

  MainOutput.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'form-control input-lg' },
      this.props.negative ? '-' : '',
      this.printValue()
    );
  };

  return MainOutput;
}(React.Component);

var SubWindow = function (_React$Component9) {
  _inherits(SubWindow, _React$Component9);

  function SubWindow() {
    _classCallCheck(this, SubWindow);

    return _possibleConstructorReturn(this, _React$Component9.apply(this, arguments));
  }

  SubWindow.prototype.printValue = function printValue() {
    var val = this.props.show;
    var chars = 30;
    return val.length > chars ? val.substr(val.length - chars) : val;
  };

  SubWindow.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'form-control input-sm' },
      this.printValue()
    );
  };

  return SubWindow;
}(React.Component);

var Row = function (_React$Component10) {
  _inherits(Row, _React$Component10);

  function Row() {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, _React$Component10.apply(this, arguments));
  }

  Row.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(
        'div',
        { className: 'col-xs-12' },
        this.props.children
      )
    );
  };

  return Row;
}(React.Component);

function Header(props) {
  return React.createElement(
    'h4',
    null,
    props.text
  );
}

function Footer(props) {
  return React.createElement(
    'h6',
    null,
    props.text
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));