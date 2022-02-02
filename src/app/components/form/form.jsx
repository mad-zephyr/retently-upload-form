import React, { useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import validatorConfig from '../../utils/validatorConfig'

import { ReactComponent as HTMLicon } from './icons/html_icon.svg'
import { ReactComponent as CSSicon } from './icons/css_icon.svg'

import Htag from '../htag/htag'
import Input from '../ui/input/Input'
import DropArea from '../ui/dropArea/dropArea'
import UploadedFiles from '../files/uploadedFiles'

import styles from './form.module.sass'

const Form = () => {
  const [data, setData] = useState(
    {
      email: '',
      files: []
    })
  const [errors, setErrors] = useState({})

  const handleChangeMail = (e) => {
    setData(prevState => {
      return {
        ...prevState,
        email: e.target.value
      }
    })
  }

  const handleDelete = (name) => {
    setData(prevState => {
      const curretnFiles = prevState.files.filter(file => file.name !== name)
      return {
        ...prevState,
        files: curretnFiles
      }
    })
    console.log(name)
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validate()
  }, [data])

  const isValid = Object.keys(errors).length === 0

  const handleUpload = (e) => {
    e.preventDefault()
    const curretnFiles = e.target.files || e.dataTransfer.files
    setData(prevState => {
      const [...prevFiles] = [...prevState.files]
      return {
        ...prevState,
        files: [...prevFiles, ...curretnFiles]
      }
    })
  }

  return (
    <div className={styles.form}>
      <Htag />
      <form className={styles.form__content}>
        <Input
          label={'Send files to this email:'}
          value={data.email}
          type={'mail'}
          onChange={handleChangeMail}
          placeholder={'Your mail'}
          name={'mail'}
          error={errors.email}
        />
        <div className={styles.setFiles}>
          <div className={styles.setFiles__wrapper}>

          <UploadedFiles
            fileName='smart-layur-ui.css'
            progress={100}
            onDelete={handleDelete}
          > <CSSicon/></UploadedFiles>
          <UploadedFiles
            fileName='ruddy-cream-task1.html'
            progress={50}
            onDelete={handleDelete}
          > <HTMLicon/>  </UploadedFiles>
          </div>
        </div>
        <DropArea
          label={'Drag and drop file here'}
          onChange={handleUpload}
          type={'file'}
          name={'file'}
        />
        <button
          disabled={!isValid}
        >Send</button>
      </form>
    </div>
  )
}

export default Form
