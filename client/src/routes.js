import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from './hoc/Layout'
import Auth from './hoc/auth'

import Home from './components/Home/Home'
import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register'
import UserDashboard from './components/User'

const routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/user/dashboard' exact component={Auth(UserDashboard, true)} />
        <Route path='/register' exact component={Auth(Register, false)} />
        <Route path='/register_login' exact component={Auth(RegisterLogin, false)} />
        <Route path='/' exact component={Auth(Home, null)} />
      </Switch>
    </Layout>
  )
}

export default routes

