import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as Delete } from './assets/deleteIcon.svg'
import { ReactComponent as Done } from './assets/doneIcon.svg'
import { ReactComponent as File } from './assets/file.svg'

import styles from './uploadedFiles.module.sass'

const UploadedFiles = (props) => {
  const { fileName, progress, color, onDelete } = props

  const [show, setShow] = useState(false)
  const [progressUpload] = useState(progress)

  const MAX_LENGTH_STRING = 40
  const exec = fileName?.match(/\.\w+/gm).at(-1)
  const completedUpload = (progressUpload > 100)

  const setTitleLength = (string) => {
    const stingArr = string.split('')
    const stringStart = stingArr.filter((chr, index) => index < 20).join('')
    const stringEnd = stingArr.filter((chr, index) => index > stingArr.length - 10).join('')
    return `${stringStart} ... ${stringEnd}`
  }

  const statusControl = (show) => {
    return show
      ? <Delete />
      : <Done />
  }

  return (
    <div className={styles.files}>
      <div className={styles.files__icon}>
        <div className={styles.files__type}>{'{ }'}</div>
        <div className={styles.files__label} style={{ background: color }}>
          {exec}
        </div>
        <File />
      </div>

      <div className={styles.files__wrapper}>
        {
          fileName.length > MAX_LENGTH_STRING
            ? setTitleLength(fileName)
            : fileName
        }
        {
          !completedUpload
            ? <span className={styles.files__percent}
                style={{ color: color }}
                > {progressUpload} %
              </span>
            : <div
                onClick={() => onDelete(fileName)}
                className={styles.control}
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
            style={{ width: `${progressUpload}%`, background: color }}
          />
        </div> }
    </div>
  )
}

UploadedFiles.propTypes = {
  fileName: PropTypes.string,
  progress: PropTypes.number,
  onDelete: PropTypes.func,
  color: PropTypes.string
}

export default UploadedFiles
