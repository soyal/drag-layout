/**
 * 可拖拽，拉伸的单个item
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './index.less'

class Item extends PureComponent {
  static propTypes = {
    offsetLeft: PropTypes.number, // 横向偏移量
    offsetTop: PropTypes.number, // 纵向偏移量
    onChosen: PropTypes.func // 鼠标按下的回调
  }

  static defaultProps = {
    offsetLeft: 0,
    offsetTop: 0
  }

  __onDragStart = e => {
    e.preventDefault()
  }

  __onMouseDown = e => {
    if(e.button === 0) {
      const { onChosen } = this.props
  
      onChosen && onChosen()
    }
  }

  render() {
    const { offsetLeft, offsetTop } = this.props

    return (
      <div
        className="drag-layout__item"
        onDragStart={this.__onDragStart}
        onMouseDown={this.__onMouseDown}
        style={{
          transform: `translate(${offsetLeft}px, ${offsetTop}px)`
        }}
      >
        item
      </div>
    )
  }
}

export default Item
