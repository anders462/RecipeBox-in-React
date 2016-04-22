'use strict'

var React = require('react');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var PropTypes = React.PropTypes;


var RecipeModal = React.createClass({

  getInitialState: function() {
      return {
        name: '',
        ingredients: "",
        edit: false
      };
    },

    componentDidMount: function(){
      if(this.props.edit){
        this.setState({
          name: this.props.recipes[this.props.indexToEdit].name,
          ingredients: this.props.recipes[this.props.indexToEdit].ingredients
        })
      }
    },


    handleNameChange: function(e){
        this.setState({
          name: e.target.value
        })
    },

    handleIngredientChange: function(e){
        this.setState({
          ingredients: e.target.value
        })
    },

    handleSaveRecipe: function(e){
      e.preventDefault();
      var recipe = {
        name: this.state.name,
        ingredients: this.state.ingredients
      }
      console.log(recipe.name)
      this.props.saveRecipe(recipe,this.props.indexToEdit);
    },


  render: function(){
    //  console.log(this.state)
    //  console.log(this.props)
     //
    return (
      <div>
      <Modal show={this.props.modalOpen}>
        <Modal.Header>
          <Modal.Title>{this.props.header}</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" onSubmit={this.handleSaveRecipe} >
                  <div className="form-group">
                    <label  className="col-sm-2 control-label">Recipe Name</label>
                    <div className="col-sm-10">
                      <input type="text" className="form-control" value={this.state.name} onChange={this.handleNameChange} placeholder="Steak and potatoes"/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Ingredients</label>
                    <div className="col-sm-10">
                      <textarea className="form-control" name="ingredient" value={this.state.ingredients} onChange={this.handleIngredientChange} placeholder="Steak, Potatoes,...."/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <Button type="submit" bsStyle="primary">Save</Button>
                    </div>
                  </div>
            </form>
        </Modal.Body>

      <Modal.Footer>
        <Button onClick={this.props.closeModal}>Close</Button>
      </Modal.Footer>
      </Modal>
    </div>
    )
  }

});

RecipeModal.PropTypes = {
    recipes: PropTypes.array,
    closeModal: PropTypes.func.isRequired,
    modalOpen: PropTypes.bool.isRequired,
    recipes: PropTypes.array.isRequired,
    saveRecipe: PropTypes.func.isRequired

};

module.exports = RecipeModal;
