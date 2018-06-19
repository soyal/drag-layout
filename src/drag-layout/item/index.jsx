/**
 * 可拖拽，拉伸的单个item
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './index.less'

class Item extends PureComponent {
  static propTypes = {
    offsetLeft: PropTypes.number, // 横向偏移量
    offsetTop: PropTypes.number, // 纵向偏移量
    isChosen: PropTypes.bool, // 是否被选中
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
    if (e.button === 0) {
      const { onChosen } = this.props

      onChosen && onChosen()
    }
  }

  render() {
    const { offsetLeft, offsetTop, isChosen } = this.props

    return (
      <div
        className={classnames('drag-layout__item', { chosen: isChosen })}
        onDragStart={this.__onDragStart}
        onMouseDown={this.__onMouseDown}
        style={{
          transform: `translate(${offsetLeft}px, ${offsetTop}px)`
        }}
      >
        item {isChosen ? '被选中' : ''}
      </div>
    )
  }
}

export default Item
