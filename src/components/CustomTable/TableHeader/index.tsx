import React from 'react'
import { Table } from 'semantic-ui-react'

const TableHeader = ({ columns }: { columns: any[] }) => {
  return (
    <Table.Header>
      <Table.Row>
        {columns.map(el => {
          return <Table.HeaderCell key={el.id}>{el.name}</Table.HeaderCell>
        })}
      </Table.Row>
    </Table.Header>
  )
}

export default TableHeader
