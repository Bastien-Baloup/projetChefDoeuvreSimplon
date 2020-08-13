import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import ArticleHeader from '../components/Article/ArticleHeader'
import ArticleList from '../components/Article/ArticleList'
import ArticleForm from '../components/Article/ArticleForm'
import ArticleDel from '../components/Article/ArticleDel'

const Articles = () => {
  const path = useRouteMatch().path
  return (
    <>
      <ArticleHeader />
      <div>
        <Switch>
          <Route exact path={path} component={ArticleList} />
          <Route exact path={`${path}/new`} key='new' component={ArticleForm} />
          <Route exact path={`${path}/modify/:title`} key='modify' component={ArticleForm} />
          <Route exact path={`${path}/delete/:title`}>
            <ArticleDel />
            <ArticleList />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default Articles
