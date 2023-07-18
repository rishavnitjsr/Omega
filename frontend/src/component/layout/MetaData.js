import React from 'react'
import Helmet from 'react-helmet';

//To set the page title passed in it.

const MetaData = ({title}) => {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

export default MetaData