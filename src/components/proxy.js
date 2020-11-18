/*
 * @Description: 
 * @Author: xuks
 * @Date: 2020-11-17 15:58:23
 * @LastEditTime: 2020-11-18 12:16:59
 */
import createApis from '../utils/requests'

const baseUrl = 'https://spinsha.re'

const apis = createApis({
  /** Home */
  getNewSongs: {
    url: `${baseUrl}/api/songs/new/`,
    method: 'get'
  },
  getHotSongs: {
    url: `${baseUrl}/api/songs/hot/`,
    method: 'get'
  },
  getPopularSongs: {
    url: `${baseUrl}/api/songs/popular/`,
    method: 'get'
  },
})

export default apis