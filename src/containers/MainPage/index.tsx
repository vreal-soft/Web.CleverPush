import React, { useCallback, useEffect, useState } from 'react'
import { Pagination, Table } from 'semantic-ui-react'
import { v4 as uuidv4 } from 'uuid'
import faker from 'faker'
import update from 'immutability-helper'
import styles from './styles.module.scss'
import TableRow from '../../components/TableRow'

import * as usersActions from '../../actions/users'
import { IUser } from '../../models'

const limit = 5

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<IUser[]>([])

  const load = async () => {
    try {
      const data = await usersActions.get()
      setData(data[0])
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    load()
  }, [])

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

  const renderCard = (item: IUser, index: any) => {
    return <TableRow key={item.id} index={index} {...item} moveCard={moveCard} />
  }

  const indexOfLastPost = currentPage * limit
  const indexOfFirstPost = indexOfLastPost - limit

  return (
    <div className={styles.content}>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Firs Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>E-mail</Table.HeaderCell>
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
              <Pagination defaultActivePage={1} totalPages={data.length / limit} onPageChange={handleChange} />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  )
}

export default MainPage
