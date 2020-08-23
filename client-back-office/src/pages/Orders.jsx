import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import OrderList from '../components/Order/OrderList'
import OrderForm from '../components/Order/OrderForm'
import OrderDel from '../components/Order/OrderDel'
import OrderRead from '../components/Order/OrderRead'

const Orders = () => {
  const path = useRouteMatch().path
  return (
    <>
      <div className='navbar has-background-grey-lighter'>
        <div className='navbar-start'>
          <div className='navbar-item'>
            &nbsp;
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='container'>
          <h2 className='title is-2'>Gestion des commandes</h2>
          <Switch>
            <Route exact path={path} key='list' component={OrderList} />
            <Route exact path={`${path}/modify/:id`} key='modify' component={OrderForm} />
            <Route exact path={`${path}/delete/:id`} component={OrderDel} />
            <Route exact path={`${path}/read/:id`} component={OrderRead} />
          </Switch>
        </div>
      </div>
    </>
  )
}

export default Orders
