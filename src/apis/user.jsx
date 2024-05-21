import axios from '../../axios'

export const apiGetcurrent = () => axios({
  url: '/user/current',
  method: 'get',
})
export const apiGetRoles = () => axios({
  url: '/user/roles',
  method: 'get',
})