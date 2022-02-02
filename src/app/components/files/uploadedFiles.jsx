import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as Delete } from './assets/deleteIcon.svg'
import { ReactComponent as Done } from './assets/doneIcon.svg'

import styles from './uploadedFiles.module.sass'
import cn from 'classnames'

const UploadedFiles = (props) => {
  const { fileName, progress, onDelete, children } = props

  const [show, setShow] = useState(false)
  const completedUpload = (progress === 100)

  const statusControl = (show) => {
    return show
      ? <Delete />
      : <Done />
  }

  return (
    <div className={styles.files}>
      <div className={styles.files__icon}>
        {children}
      </div>

      <div className={cn(styles.files__wrapper, !completedUpload && styles.active__text)}>
        {fileName}
        { !completedUpload
            ? <span
                className={styles.files__percent}
                > {progress}%
              </span>
            : <div
                className={styles.control}
                onClick={() => onDelete(fileName)}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
              >
                {statusControl(show)}
              </div>
        }
      </div>

      { !completedUpload && <div className={styles.progress}>
          <div
            className={styles.active}
            style={{ width: `${progress}%` }}
          />
        </div> }
    </div>
  )
}

UploadedFiles.propTypes = {
  fileName: PropTypes.string,
  progress: PropTypes.number,
  onDelete: PropTypes.func,
  color: PropTypes.string,
  children: PropTypes.array
}

export default UploadedFiles
