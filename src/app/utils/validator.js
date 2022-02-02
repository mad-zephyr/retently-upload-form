export function validator(data, config) {
  const errors = {}
  function validate(validateMethod, currentData, config) {
    let statusValidate

    switch (validateMethod) {
      case 'isRequired': {
        if (typeof currentData === 'boolean') {
          statusValidate = currentData === false
        } else if ((typeof currentData === 'string')) {
          statusValidate = currentData.trim() === ''
        }
        break
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g
        statusValidate = !emailRegExp.test(currentData)
        break
      }
      default:
        break
    }
    if (statusValidate) return config.message
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }

  return errors
}
