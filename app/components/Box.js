'use strict'

var React = require('react');
var PropTypes = React.PropTypes;
var Details = require('./Details');
var RecipeModal = require('./RecipeModal');
require('../main.css');

var def = [{name:"Steak Frites",ingredients:'Steak, Potatoes, Salt'},{name:"Pancakes",ingredients:'Flour,Eggs,Water'},{name:"Oatmeal",ingredients:'Oatmeal,Water, Salt'}];


var Box = React.createClass({

  getInitialState: function(){
    console.log("getInitialState");
   return {
     isLoading: true,
     recipes: [],
     showDetails: false,
     clicked: null,
     modalOpen: false,
     edit: false,
     indexToEdit: null,
     modalHeader: "Add a new Recipe!"
   }

  },

  componentDidMount: function(){
    console.log("componentDidMount");
        this.setState({
          isLoading: false,
          recipes: JSON.parse(localStorage.getItem('_recipes')) || def  //replace with load from LocalStorage
        });
  },

  toggle: function(e){
    console.log(e.target.value)
    console.log("click")
    this.setState({
      showDetails: this.state.clicked===e.target.value?!this.state.showDetails:true,
      clicked: e.target.value
    });

  },

  handleOpenModal: function(){
    this.setState({
      modalOpen: true,
      showDetails: false
    })

  },

  handleCloseModal: function(){
    console.log("close")
    this.setState({
      modalOpen:false
    })
  },

  handleSaveRecipe: function(recipe,index){
   if (this.state.edit){
     this.state.recipes[index] = recipe;
     } else {
    this.state.recipes.push(recipe)
     }
     console.log(this.state.recipes)
     localStorage.setItem('_recipes',JSON.stringify(this.state.recipes))
    this.setState({
      modalOpen: false,
      edit: false,
      modalHeader: "Add a newRecipe!"
    });
    console.log(this.state.recipes);
  },

  handleDelete: function(name){
    this.state.recipes = this.state.recipes.filter(function(elem,i){
      return elem.name !== name? elem: null;
    });
    localStorage.setItem('_recipes',JSON.stringify(this.state.recipes))
    this.setState({
      showDetails: false
    })

  },

  handleEdit: function(index){
    this.setState({
      modalOpen: true,
      edit: true,
      indexToEdit: index,
      modalHeader: "Edit Recipe!"
    })

  },


  render: function(){
    console.log("modalOpen ",this.state.modalOpen);
    console.log("showDetails ",this.state.showDetails);

    return (
        <div>  {/*show modal component if either edit or add recipe is clicked*/}
              {this.state.modalOpen ? <RecipeModal header={this.state.modalHeader}
               closeModal={this.handleCloseModal}
               modalOpen={this.state.modalOpen}
               recipes={this.state.recipes}
               saveRecipe={this.handleSaveRecipe}
               edit={this.state.edit}
               indexToEdit={this.state.indexToEdit}
              />: null}
          <div>
          {this.state.recipes.map(function(recipe,index){
            return <div className="ingredients" key={index}>
                      <button type='button' onClick={this.toggle} value={index} className="btn btn-block recipeHeader">
                      {recipe.name}
                      </button>
                      {this.state.showDetails && (index==this.state.clicked) ?
                      <div><Details Component ingredients={recipe.ingredients}/>
                      <button className="btn btn-danger btn-sm delete" onClick={this.handleDelete.bind(this,recipe.name)}>Delete</button>
                      <button className="btn btn-warning btn-sm edit" onClick={this.handleEdit.bind(this,index)}>Edit</button>
                      </div>:null}
                   </div>
          }.bind(this))}
          </div>
            <button type="button" className="btn btn-lg btn-primary" onClick={this.handleOpenModal}>Add Recipe</button>
       </div>
      )
    }

});




module.exports = Box;


// <button className="btn btn-warning btn-sm edit" value={recipe.name} onClick={this.onEdit}>Edit</button>
// {this.state.edit? <AddRecipeModal editName={recipe} recipes={this.props.recipes} index={index} edit={this.state.edit}/>:null}
