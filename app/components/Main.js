'use strict'

var React = require('react');
var Box = require('./Box');
require('../main.css');

//Main component
var Main = React.createClass({

  render: function(){
    return (
      <div className="jumbotron wrapper">
        <div className="container-fluid banner" >
          <h2>RecipeBox</h2>
        </div>
        <Box/> {/*insert box component*/}
      </div>
     )
  }


});

module.exports = Main;
