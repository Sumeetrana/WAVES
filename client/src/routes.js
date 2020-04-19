import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Layout from './hoc/Layout'
import Home from './components/Home/Home'
import RegisterLogin from './components/Register_login'

const routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/register_login' exact component={RegisterLogin} />
        <Route path='/' exact component={Home} />
      </Switch>
    </Layout>
  )
}

export default routes

