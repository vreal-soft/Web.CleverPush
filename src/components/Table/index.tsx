import React, { useCallback, useState } from 'react'
import { Pagination, Table } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid'
import faker from 'faker'
import update from 'immutability-helper'

import TableRow from './TableRow'

const fakeData: any[] = []
const limit = 5

for (let i = 0; i <= 20; i++) {
  fakeData.push({ id: uuidv4(), firstName: faker.name.findName(), lastName: faker.name.lastName() })
}

const CustomTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState(fakeData)

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = data[dragIndex]
      setData(
        update(data, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        })
      )
    },
    [data]
  )

  const handleChange = (event: any, data: any) => {
    setCurrentPage(data.activePage)
  }

  const renderCard = (card: any, index: any) => {
    return <TableRow key={card.id} index={index} id={card.id} {...card} moveCard={moveCard} />
  }

  const indexOfLastPost = currentPage * limit
  const indexOfFirstPost = indexOfLastPost - limit

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Firs Name</Table.HeaderCell>
          <Table.HeaderCell>Last Name</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data
          .slice(indexOfFirstPost, indexOfLastPost)
          .map((item, index) => renderCard(item, (currentPage - 1) * limit + index))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell floated="right" colSpan="3">
            <Pagination defaultActivePage={1} totalPages={fakeData.length / limit} onPageChange={handleChange} />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default CustomTable
