/*
 * @Description: 
 * @Author: xuks
 * @Date: 2020-11-17 15:58:23
 * @LastEditTime: 2020-11-17 17:14:23
 */
import createApis from '../utils/requests'

const apis = createApis({
  /** Home */
  getNewSongs: {
    url: 'https://spinsha.re/api/songs/new/1',
    method: 'get'
  },
})

export default apis