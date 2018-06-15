import React, { PureComponent } from 'react'
import './index.less'

class Container extends PureComponent {
  render() {
    const { children } = this.props

    return <div className="drag-layout__container">{children}</div>
  }
}

export default Container
