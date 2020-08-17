import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import ClientList from '../components/Client/ClientList'
import ClientForm from '../components/Client/ClientForm'
import ClientDel from '../components/Client/ClientDel'

const Clients = () => {
  const path = useRouteMatch().path
  return (
    <>
      <div className='section'>
        <div className='container'>
          <Switch>
            <Route exact path={path} key='list' component={ClientList} />
            <Route exact path={`${path}/modify/:id`} key='modify' component={ClientForm} />
            <Route exact path={`${path}/delete/:id`} component={ClientDel} />
          </Switch>
        </div>
      </div>
    </>
  )
}

export default Clients
