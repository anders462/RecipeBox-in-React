'use strict'

var React = require('react');
var Table = require('./Table');
var PropTypes = React.PropTypes;

require('../main.css');


var Details = React.createClass({

  render: function(){

    return (
         <Table header="Ingredients">
                  {this.props.ingredients.split(',').map(function(ingredient,index){
                     return (
                        <tr key={index}><td>{ingredient}</td></tr>
                      )
                  })}
         </Table>
     )
  }


});

Details.PropTypes = {
  ingredients: PropTypes.string.isRequired,
}

module.exports = Details;
