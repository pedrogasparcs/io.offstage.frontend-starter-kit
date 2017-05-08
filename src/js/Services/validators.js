/* eslint-disable no-unused-vars */

/**
 * Created by PedroGaspar on 30/03/2017.
 */
import checkVATNumber from './../external/helpers/jsvat'
import moment from 'moment'

/*
 == GENERIC ==
 */
const required = value => {
  return !(value === null || value === '')
}

const min = (value, options) => { // applyable to arrays and strings
  if (!value) return false
  return value.length >= options[0]
}

const max = (value, options) => { // applyable to arrays and strings
  if (!value) return false
  return value.length <= options[0]
}

const exactValue = (value, options) => {
  let match = (options[1]) ? eval(options[1])(options[0]) : options[0] // eslint-disable-line no-eval
  let val = (options[1]) ? eval(options[1])(value) : value // eslint-disable-line no-eval
  return value === match
}

/*
 == TYPES ==
 */

// https://github.com/prometheusresearch/react-forms/blob/develop/src/JSONSchema/compileValidator.js
const any = value => true
const boolean = value => typeof value === 'boolean'
const array = value => Array.isArray(value)
const integer = value => typeof value === 'number' && (Math.floor(value) === value || value > 9007199254740992 || value < -9007199254740992) // eslint-disable-line max-len

/*
const array = (value) => {
    return Array.isArray(value); //typeof value === "object" && value !== null && !isNaN(value.length);
}
*/

const number = (value, options) => {
  let isNumber = !isNaN(value)
  if (options) {
    let minValid = !options[0] || options[0] === -1 || value >= options[0]
    let maxValid = !options[1] || value <= options[1]
    return isNumber && minValid && maxValid
  }
  return isNumber
}

const text = (value, options) => {
  return typeof value === 'string' && value !== null && isNaN(value)
}

const date = (value, options) => {
    /*
     https://momentjs.com/docs/#/parsing/is-valid/
     */
  return moment(
        value,
        options && options[0] ? options[0] : null // format, otherwise moment will try to guess
        // options && options[1]?options[1]:null, // locale,
    ).isValid()
}

/*
 == FORMATS ==
 */
const cellphone = (value, options) => {
  if (!options) return false
  let re = null
  switch (options[0]) {
    case 'pt':
      re = /^(9[1-36][0-9])[0-9]{6}$/
      break
  }
  if (re) return re.test(value)
  return false
}

const landline = (value, options) => {
  if (!options) return false
  let re = null
  switch (options[0]) {
    case 'pt':
      re = /^(2[12][0-9]|2[35][1-689]|24[1-59]|26[1-35689]|27[1-9]|28[1-69]|29[1256])[0-9]{6}$/
      break
  }
  if (re) return re.test(value)
  return false
}

const anyphone = (value, options) => {
  if (!options) return false
  let re = null
  switch (options[0]) {
    case 'pt':
            /*
             http://www.portugal-a-programar.pt/forums/topic/60689-resolvido-express%C3%A3o-preg_match-para-verificar-n%C3%BAmero-telefone/
             */
            /* primeiro valida os primeiros 3 numeros para as várias hipóteses */
      re = /^(9[1-36][0-9]|2[12][0-9]|2[35][1-689]|24[1-59]|26[1-35689]|27[1-9]|28[1-69]|29[1256])[0-9]{6}$/
      break
  }
  if (re) return re.test(value)
  return false
}

const zipcode = (value) => {
  const re = /^\d{4}-\d{3}?$/
  return re.test(value)
}

const email = (value) => {
    // http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(value)
}

const vat = (value, options) => {
  const countryCode = options && options[0] ? (options[0] === 'user' ? '' : options[0].toUpperCase()) : 'PT'
  return checkVATNumber(countryCode + value)
}

/*
 == DATE SPECIFIC ==
 */
const year = (value, options) => {
  let lengthValid = String(year).length === 4
  if (options) {
    let minValid = !options[0] || (options[0] === -1 && value >= 1900) || value >= options[0]
    let maxValid = !options[1] || value <= options[1]
    return lengthValid && minValid && maxValid
  }
  return lengthValid && value >= 1900 && value <= new Date().getFullYear()
}

/*
 == FILES ==
 */
const file = (value) => {
  return value instanceof File // eslint-disable-line no-undef
}

const fileType = (value, types) => {
  if (!value) return false
  let isFile = file(value)
  let isAnyOfType = types.reduce((acc, item) => {
    return acc || value.type === item
  }, false)
  return isFile && isAnyOfType
}

const fileMaxSize = (value, options) => {
  if (!value) return false
  let isFile = file(value)
  return isFile && value.size <= options[0]
}

const fileMinSize = (value, options) => {
  if (!value) return false
  let isFile = file(value)
  return isFile && value.size >= options[0]
}

export default {
  required,
  min,
  max,
  exactValue,
  exact_value: exactValue,
  array,
  number,
  text,
  date,
  email,
  vat,
  zipcode,
  cellphone,
  landline,
  anyphone,
  year,
  file,
  fileType,
  file_type: fileType,
  fileMinSize,
  file_min_size: fileMinSize,
  fileMaxSize,
  file_max_size: fileMaxSize
}
/* eslint-disable no-unused-vars */
