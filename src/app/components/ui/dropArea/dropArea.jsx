/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as UploadIcon } from './assets/cloud-upload.svg'

import cn from 'classnames'
import styles from './dropArea.module.sass'

const DropArea = (props) => {
  const { label, value, onChange, type, name, error } = props
  const [drag, setDrag] = useState(false)

  const dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }
  const dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }
  const handlerDrop = (e) => {
    onChange(e)
    setDrag(false)
  }

  return (
    <label className={cn(styles.file, drag ? styles.file__drag : '')}
      onDragStart={dragStartHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragStartHandler}
      onDrop={handlerDrop}
    >
      <input
        onChange={handlerDrop}
        type="file"
        name="fileUpload"
        multiple
        accept="*"
      />
      <span><UploadIcon /></span>
      <div className={styles.file__title}> Drag and drop files here </div>
      <div className={styles.file__subtitle}> or </div>
      <div className={styles.file__btn}> browse </div>
    </label>
  )
}

DropArea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default DropArea
