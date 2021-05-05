import React from 'react'

import styles from './styles.module.scss'

import CustomTable from '../../components/Table'

const MainPage = () => {
  return (
    <div className={styles.content}>
      <CustomTable />
    </div>
  )
}

export default MainPage
