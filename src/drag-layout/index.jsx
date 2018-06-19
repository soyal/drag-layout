import React, { Component } from 'react'
import Container from './container'
import PropTypes from 'prop-types'
import Item from './item'

class DragLayout extends Component {
  static propTypes = {
    gridSize: PropTypes.number, // grid的边长，单位px
    width: PropTypes.number, // 横向长度，单位是grid
    height: PropTypes.number, // 纵向长度，单位grid
    gap: PropTypes.number, // 间隙宽度
    /**
     * [{ width: 10(单位:grid), height: 5(单位grid) }]
     */
    data: PropTypes.array
  }

  static defaultProps = {
    gridSize: 10,
    width: 20,
    height: 20,
    gap: 5,
    data: []
  }

  // 鼠标是否按下
  isMouseDown = false
  // 被选择的item
  chosenItem = {
    startOffsetLeft: 0,
    startOffsetTop: 0
  }
  // 记录鼠标按下的鼠标pageX,pageY
  startX = 0
  startY = 0

  state = {
    chosenIndex: -1, // 被选择的索引
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

  constructor(props) {
    super(props)
    // todo 思考布局策略
  }

  setChosenItem(index) {
    const chosenItem = this.chosenItem
    const dataIndexItem = this.state.data[index]
    this.setState({
      chosenIndex: index
    })
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
    const chosenIndex = this.state.chosenIndex
    if (this.isMouseDown && chosenIndex > -1) {
      const nArr = this.state.data
      const dataIndexItem = nArr[chosenIndex]
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
      this.isMouseDown = false
      this.setState({
        chosenIndex: -1
      })
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
    const { data, chosenIndex } = this.state

    return (
      <div className="drag-layout">
        <Container>
          {data.map((item, index) => (
            <Item
              key={index}
              offsetLeft={item.offsetLeft}
              offsetTop={item.offsetTop}
              isChosen={index === chosenIndex}
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
