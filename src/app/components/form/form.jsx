import React, { useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import validatorConfig from '../../utils/validatorConfig'

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

  const colors = ['#EC6630', '#DF5C9C', '#69EBD0', '#FFCF99', '#7E78D2', '#CFD11A', '#111D4A', '#3590F3', '#64BDED']

  const getRandomColors = () => {
    const randomNumber = Math.round(Math.random() * (colors.length - 2) + 2)
    return colors[randomNumber]
  }

  const getRandomProgress = () => {
    const randomNumber = Math.round(Math.random() * (330 - 2) + 2)
    return randomNumber
  }

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
    <form className={styles.form}>
      <Htag />
      <Input
        label={'Send files to this email:'}
        value={data.email}
        type={'mail'}
        onChange={handleChangeMail}
        placeholder={'Your mail'}
        name={'mail'}
        error={errors.email}
      />
      { data.files.length !== 0 &&
        <div className={styles.setFiles}>
        <div className={styles.setFiles__wrapper}>

            {data.files.map(files => {
              return (
                <UploadedFiles
                  key={files.name}
                  fileName={files?.name}
                  progress={getRandomProgress() || 100} // Progress
                  color={getRandomColors()}
                  onDelete={handleDelete}
                />
              )
            })}
        </div>
       </div>
      }
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
  )
}

export default Form
