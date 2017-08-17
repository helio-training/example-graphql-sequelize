import Profile from './models/profile'
import User from './models/user'

Profile.belongsTo(User, { foreignKey: 'userId' })
