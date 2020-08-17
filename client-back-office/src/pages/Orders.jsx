import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import OrderList from '../components/Order/OrderList'
import OrderForm from '../components/Order/OrderForm'
import OrderDel from '../components/Order/OrderDel'

const Orders = () => {
  const path = useRouteMatch().path
  return (
    <>
      <div>
        <Switch>
          <Route exact path={path} key='list' component={OrderList} />
          <Route exact path={`${path}/modify/:id`} key='modify' component={OrderForm} />
          <Route exact path={`${path}/delete/:id`} component={OrderDel} />
        </Switch>
      </div>
    </>
  )
}

export default Orders
