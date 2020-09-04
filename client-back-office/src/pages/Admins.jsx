import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import AdminHeader from '../components/Admin/AdminHeader'
import AdminList from '../components/Admin/AdminList'
import AdminForm from '../components/Admin/AdminForm'
import AdminDel from '../components/Admin/AdminDel'

const Admins = () => {
  const path = useRouteMatch().path
  return (
    <>
      <AdminHeader />
      <div className='section'>
        <div className='container'>
          <h2 className='title is-2'>Gestion des comptes administrateurs</h2>
          <Switch>
            <Route exact path={path} key='list' component={AdminList} />
            <Route exact path={`${path}/new`} key='new' component={AdminForm} />
            <Route exact path={`${path}/delete/:id`} component={AdminDel} />
          </Switch>
        </div>
      </div>
    </>
  )
}

export default Admins
