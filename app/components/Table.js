'use strict'

var React = require('react');
require('../main.css');



function Table(props){
    return (
      <div>
        <table className="table table-striped text-left">
          <caption className="text-center">{props.header}</caption>
              <tbody>
                  {props.children}
              </tbody>
        </table>
      </div>
     )
  }


module.exports = Table;
