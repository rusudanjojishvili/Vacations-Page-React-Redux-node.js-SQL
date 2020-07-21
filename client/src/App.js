import React from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import './App.css';
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar'
import VacationsContainer from './components/VacationsContainer';
import VacChartsContainer from './components/VacChartsContainer'
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux"




function App(props) {

  return (
    <div className="App">
     <BrowserRouter>
     <section>
     <header>
     <Navbar/>
     </header>
     <main>
     <Route exact path="/">{ <Redirect to="/login" />}</Route>
       <Route path="/login" component={LoginForm}/>
       <Route path="/register" component={RegisterForm}/>
       <Route path="/reports" component={VacChartsContainer}/>
       <Route path="/vacations" component={VacationsContainer}/>
       </main>
       </section>
       </BrowserRouter>
    </div>
  );
}

export default connect()(App);


