import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Route } from 'react-router'

import {
  AdminConfig,
  AdminPages,
  AdminPagesEditForm,
  AdminPagesNewForm,
  AdminUsers,
  AdminUsersEditForm,
  AdminUsersNewForm,
} from './'

class Admin extends Component {
  render() {
    return (
      <div>
        <Route component={AdminUsers} path="/admin/users/all/:currentPageIndex" />
        <Route component={AdminUsersNewForm} path="/admin/users/new" />
        <Route component={AdminUsersEditForm} path="/admin/users/:resourceId/edit" />
        <Route component={AdminPages} path="/admin/pages/all/:currentPageIndex" />
        <Route component={AdminPagesNewForm} path="/admin/pages/new" />
        <Route component={AdminPagesEditForm} path="/admin/pages/:resourceId/edit" />
        <Route component={AdminConfig} path="/admin/config" />

        <section>
          <hr />
          <ul className="inline-navigation">
            <li className="inline-navigation__item">
              <strong>Admin</strong>
            </li>

            <li className="inline-navigation__item">
              <NavLink to="/admin/users/all/1">Users</NavLink>
            </li>

            <li className="inline-navigation__item">
              <NavLink to="/admin/pages/all/1">Pages</NavLink>
            </li>

            <li className="inline-navigation__item">
              <NavLink to="/admin/config">Config</NavLink>
            </li>
          </ul>
        </section>
      </div>
    )
  }
}

export default Admin
