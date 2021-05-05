import React, { useEffect, useState } from 'react'
import { Pagination, Table } from 'semantic-ui-react'
import faker from 'faker'
import { v4 as uuidv4 } from 'uuid'

import styles from './styles.module.scss'

import TableHeader from '../../components/CustomTable/TableHeader'
import TableFooter from '../../components/CustomTable/TableFooter'
import TableBody from '../../components/CustomTable/TableBody'

const fakeData: any[] = []
for (let i = 0; i <= 20; i++) {
  fakeData.push({
    id: uuidv4(),
    firstName: faker.name.findName(),
    lastName: faker.name.lastName(),
  })
}

const limit = 5

const MainPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [data, setData] = useState<any[]>(fakeData)

  useEffect(() => {
    setData(fakeData)
  }, [])

  const handleChange = (event: any, data: any) => {
    setCurrentPage(data.activePage)
  }

  const columns = [
    {
      id: uuidv4(),
      name: 'First Name',
    },
    {
      id: uuidv4(),
      name: 'Last Name',
    },
  ]

  return (
    <div className={styles.content}>
      <Table celled>
        <TableHeader columns={columns} />
        <TableBody data={data} currentPage={currentPage} />
        <TableFooter>
          <Pagination defaultActivePage={1} totalPages={data.length / limit} onPageChange={handleChange} />
        </TableFooter>
      </Table>
    </div>
  )
}

export default MainPage
