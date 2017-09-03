import { merge } from 'lodash'

import date from '../scalars/date'
import profiles from './profiles'
import users from './users'

export default merge(
  date,
  profiles,
  users
)
