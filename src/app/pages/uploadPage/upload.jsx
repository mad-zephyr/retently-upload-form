import React from 'react'
import Form from '../../components/form/form'

import styles from './upload.module.sass'

const Upload = () => {
  return (
    <div className={styles.upload}>
      <div className="container">
        <div className="wrapper">
          <Form />
          <div className={styles.heroImg} />
        </div>
      </div>
    </div>
  )
}

export default Upload
