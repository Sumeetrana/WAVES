import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from './hoc/Layout'
import Home from './components/Home/Home'
import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register'
import UserDashboard from './components/User'

const routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/user/dashboard' exact component={UserDashboard} />
        <Route path='/register' exact component={Register} />
        <Route path='/register_login' exact component={RegisterLogin} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Layout>
  )
}

export default routes

