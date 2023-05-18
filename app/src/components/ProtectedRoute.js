import React from 'react'
import { Route, redirect } from 'react-router-dom'
import auth from '../services/authService'

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      if(!auth.getCurrentUser()) return redirect("/")
      return Component ? <Component {...props}/> : render(props);
    }} />
  );
}

export default ProtectedRoute