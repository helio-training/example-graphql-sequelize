import express from 'express'
import bodyParser from 'body-parser'

import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import chalk from 'chalk'

import db from './db'
import schemaDef from './schema.graphqls'
import resolvers from './resolvers'
import logger from './logger'

const app = express()
const port = 3000
const schema = makeExecutableSchema({
  resolvers,
  typeDefs: [schemaDef]
})

app.use('/graphql', bodyParser.json(), graphqlExpress((req) => ({
  schema,
  context: { someFutureAuth: 'someFutureToken' }
})))
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

db
  .authenticate()
  .then(() => {
    app.listen(port, () => {
      logger.info(chalk.cyan(`Server running on port ${port}`))
      logger.info(chalk.cyan(`Access graphiql: http://localhost:${port}/graphiql`))
    })
  })
  .catch((err) => {
    logger.error(chalk.red(`Unable to connect to SQL server.`))
    throw err
  })
