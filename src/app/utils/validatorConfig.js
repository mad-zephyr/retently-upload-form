const validatorConfig = {
  email: {
    isRequired: {
      message: 'Email is required'
    },
    isEmail: {
      message: 'Email entered incorrectly'
    }
  }
}

export default validatorConfig
