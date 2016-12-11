var React = require('react');
var ReactDOM = require('react-dom');
var ShoutBack = React.createFactory(require('./components/shoutback.jsx'));

ReactDOM.render(ShoutBack() , document.getElementById('container'));
