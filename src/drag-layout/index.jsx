import React, { Component } from 'react'
import Container from './container'
import Item from './item'

class DragLayout extends Component {
  render() {
    return (
      <div className="drag-layout">
        <Container>
          <Item left={10} top={10}/>
        </Container>
      </div>
    )
  }
}

export default DragLayout
