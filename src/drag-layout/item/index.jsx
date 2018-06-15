/**
 * 可拖拽，拉伸的单个item
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './index.less'

class Item extends PureComponent {
  static propTypes = {
    posLeft: PropTypes.number, // 确认定位的left
    posTop: PropTypes.number // 确认定位的top
  }

  static defaultPropsTypes = {
    posLeft: 0,
    posTop: 0
  }

  ctn = null // dom

  constructor(props) {
    super(props)

    this.state = {
      left: props.posLeft,
      top: props.posTop
    }
  }

  listenMouseEvent() {
    if(!this.ctn) return 
    this.ctn.addEventListener('mousedown', this.__onMouseDown)
    this.ctn.addEventListener('mousemove', this.__onMouseMove)
    this.ctn.addEventListener('mouseup', this.__onMouseUp)
  }

  removeMouseEvent() {
    if(!this.ctn) return
    this.ctn.removeEventListener('mousedown', this.__onMouseDown)
    this.ctn.removeEventListener('mousemove', this.__onMouseMove)
    this.ctn.removeEventListener('mouseup', this.__onMouseUp)
  }

  __onMouseDown = e => {
    console.log('mousedown')
  }

  __onMouseMove = e => {
    console.log('mousemove')
  }

  __onMouseUp = e => {
    console.log('mouseup')
  }

  componentWillUnmount() {
    this.removeEventListener()
  }

  componentDidMount() {
    this.listenMouseEvent()
  }

  componentDidUpdate(prevProps, prevState) {
    const { posLeft, posTop } = this.props
    // 定位位置发生变化，进行同步
    if(posLeft !== prevProps.posLeft || posTop !== prevProps.posTop) {
      this.setState({
        left: posLeft,
        top: posTop
      })
    }
  }

  render() {
    const { left, top } = this.props

    return (
      <div
        className="drag-layout__item"
        ref={dom => {
          this.ctn = dom
        }}
        style={{
          left: left + 'px',
          top: top + 'px'
        }}
      >
        item
      </div>
    )
  }
}

export default Item
