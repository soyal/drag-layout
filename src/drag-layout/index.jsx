import React, { Component } from 'react'
import Container from './container'
import Item from './item'

class DragLayout extends Component {
  isMouseDown = false
  // 被选择的item
  chosenItem = {
    index: -1,
    startOffsetLeft: 0,
    startOffsetTop: 0
  }
  startX = 0
  startY = 0

  state = {
    data: [
      {
        offsetTop: 0,
        offsetLeft: 0
      },
      {
        offsetTop: 0,
        offsetLeft: 0
      },
      {
        offsetTop: 0,
        offsetLeft: 0
      },
      {
        offsetTop: 0,
        offsetLeft: 0
      }
    ]
  }

  setChosenItem(index) {
    const chosenItem = this.chosenItem
    const dataIndexItem = this.state.data[index]
    chosenItem.index = index
    chosenItem.startOffsetLeft = dataIndexItem.offsetLeft
    chosenItem.startOffsetTop = dataIndexItem.offsetTop
  }

  __onMouseDown = e => {
    // 左键
    if(e.button === 0) {
      this.isMouseDown = true
      this.startX = e.pageX
      this.startY = e.pageY
    }
  }

  __onMouseMove = e => {
    const chosenItem = this.chosenItem
    if (this.isMouseDown && chosenItem.index > -1) {
      const nArr = this.state.data.slice()
      const dataIndexItem = nArr[chosenItem.index]
      const offsetLeft = e.pageX - this.startX
      const offsetTop = e.pageY - this.startY
      dataIndexItem.offsetLeft = chosenItem.startOffsetLeft + offsetLeft
      dataIndexItem.offsetTop = chosenItem.startOffsetTop + offsetTop

      this.setState({
        data: nArr
      })
    }
  }

  __onMouseUp = e => {
    if(e.button === 0) {
      console.log('mouseup')
      this.isMouseDown = false
      this.chosenItem.index = -1
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.__onMouseDown)
    document.addEventListener('mousemove', this.__onMouseMove)
    document.addEventListener('mouseup', this.__onMouseUp)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.__onMouseDown)
    document.removeEventListener('mousemove', this.__onMouseMove)
    document.removeEventListener('mouseup', this.__onMouseUp)
  }

  render() {
    const { data } = this.state

    return (
      <div className="drag-layout">
        <Container>
          {data.map((item, index) => (
            <Item
              key={index}
              offsetLeft={item.offsetLeft}
              offsetTop={item.offsetTop}
              onChosen={() => {
                console.log('chosen', index)
                this.setChosenItem(index)
              }}
            />
          ))}
        </Container>
      </div>
    )
  }
}

export default DragLayout
