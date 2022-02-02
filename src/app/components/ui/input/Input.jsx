/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as Alerticon } from './assets/alert.svg'
import cn from 'classnames'
import styles from './input.module.sass'

const Input = (props) => {
  const { label, value, onChange, type, placeholder, name, error } = props
  const [touched, setTouched] = useState(false)
  const [drag, setDrag] = useState(false)

  const dragStartHandler = (e) => {
    e.preventDefault()
    setDrag(true)
  }
  const dragLeaveHandler = (e) => {
    e.preventDefault()
    setDrag(false)
  }

  if (type === 'mail' || type === 'text') {
    return (
      <label
        htmlFor={name}
        className={styles.input}>
        <span className={styles.input__label}> {label} </span>
        <span className={cn(styles.input__input,
          (error && touched) && styles.input__alert_bar
        )}>
        <span className={cn(styles.input__alert,
          (error && touched)
            ? styles.input__alert
            : styles.input__alert_hidden
          )}
        > <Alerticon /> </span>
          <input
            value={value}
            name={name}
            placeholder={placeholder}
            type={type}
            onClick={() => setTouched(true)}
            onChange={onChange}
          />
        </span>
        <span className={cn(styles.error, (error && touched) ? styles.invalid : styles.valid)}>{error}</span>
      </label>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default Input
