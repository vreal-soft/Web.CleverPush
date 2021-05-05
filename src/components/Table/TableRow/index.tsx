import React, { useRef } from 'react'
import { Table, Ref } from 'semantic-ui-react'
import { useDrag, useDrop } from 'react-dnd'

interface Item {
  id: string
  firstName: string
  lastName: string
  index: number
  moveCard(dragIndex: number, hoverIndex: number): void
}

const TableRow = ({ id, firstName, lastName, index, moveCard }: Item) => {
  const ref = useRef<any>(null)
  const [{ handlerId }, drop] = useDrop({
    accept: 'CARD',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current && ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      if (clientOffset) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        moveCard(dragIndex, hoverIndex)
        item.index = hoverIndex
      }
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: 'CARD',
      index: index,
      id: id,
    },
    collect: monitor => ({
      item: monitor.getItem(),
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <Ref innerRef={ref}>
      <Table.Row key={firstName} style={{ opacity }} data-handler-id={handlerId}>
        <Table.Cell>{firstName}</Table.Cell>
        <Table.Cell>{lastName}</Table.Cell>
      </Table.Row>
    </Ref>
  )
}

export default TableRow
