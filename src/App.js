import React from 'react'
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import MainPage from './MainPage';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  //state of the books; data is fetched from external data source
    state ={
      books:[]
    }

    componentDidMount(){
      BooksAPI.getAll().then((books) => {
        this.setState({books:books})
      })
    }

    moveShelf = (book,shelf) => {
       BooksAPI.update(book,shelf);
       // set the current status of the books
       BooksAPI.getAll().then((books) => {
        this.setState({books:books})
      })
      
    }
  
  render() {
    //console.log(this.state.books);
   // rendered page is getting the current state of the books
    return (
      <div className="app"> 
        <Route exact path ="/" render ={()=>(
          <MainPage 
            books ={this.state.books}
            moveShelf ={this.moveShelf}
          /> 
          )} />

          <Route  path ="/search" render ={()=>(
          <SearchPage
            moveShelf ={this.moveShelf}
            books ={this.state.books}
           /> 
          )} />          
        }    
        </div>
    )
  }
}

export default BooksApp
