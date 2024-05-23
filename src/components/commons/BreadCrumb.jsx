import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";

const breadCrumbRouters = [
  { path: "/", breadcrumb: "Home" },
  { path: "/properties", breadcrumb: "Properties" },
]
const BreadCrumb = () => {
  const breadcrumbs = useBreadcrumbs(breadCrumbRouters)
  return (
    <Fragment>
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <NavLink key={match.pathname} to={match.pathname}>
          <span className='hover:underline' >{breadcrumb}</span>
          {index < breadcrumbs.length - 1 && " / "}
        </NavLink>
      ))}
    </Fragment>
  )
}

export default BreadCrumb