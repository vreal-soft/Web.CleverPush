import React from 'react'
import { Table } from 'semantic-ui-react'

const TableFooter: React.FunctionComponent = ({ children }) => {
  return (
    <Table.Footer>
      {children && (
        <Table.Row>
          <Table.HeaderCell colSpan="2">{children}</Table.HeaderCell>
        </Table.Row>
      )}
    </Table.Footer>
  )
}

export default TableFooter
