import React, { useCallback, useState } from 'react'
import { Table } from 'semantic-ui-react'
import update from 'immutability-helper'

import TableRow from '../TableRow'

const limit = 5

interface ITableBody {
  data: any[]
  currentPage: number
}

const TableBody = ({ data, currentPage }: ITableBody) => {
  const indexOfLastPost = currentPage * limit
  const indexOfFirstPost = indexOfLastPost - limit

  const [localData, setData] = useState(data)

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = data[dragIndex]
      setData(
        update(data, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]],
        })
      )
    },
    [data]
  )

  const renderCard = (item: any, index: any) => {
    return <TableRow key={item.id} index={index} id={item.id} {...item} moveCard={moveCard} />
  }

  return (
    <Table.Body>
      {localData
        .slice(indexOfFirstPost, indexOfLastPost)
        .map((item, index) => renderCard(item, (currentPage - 1) * limit + index))}
    </Table.Body>
  )
}

export default TableBody
