var React = require('React');
// var ReactDOMServer = require('react-dom/server');

var MyComponent = React.createClass({
  render: function() {
    return (<div><h1>My Component</h1><p>This is a Component rendered</p></div>);
  }
});

//We export to make this component accesible from outside
module.exports.MyComponent = MyComponent;
