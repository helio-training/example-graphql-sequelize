import { merge } from 'lodash'

import profiles from './profiles'
import users from './users'

export default merge(
  profiles,
  users
)
