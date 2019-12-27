import axios from 'axios'
import { address } from './default.js'

export function getTeacherClassInfo (params) {
  return axios
    .post(address + 'v1/user', params)
}
