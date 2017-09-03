import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize: (value) => {
      // What we send to the client
      try {
        const theDate = new Date(value)
        return `${theDate.getFullYear()}/${theDate.getDay()}`
      } catch (e) {
        throw e
      }
    },
    parseValue: (value) => {
      // What we got from the client
      try {
        return new Date(value)
      } catch (e) {
        throw e
      }
    },
    parseLiteral: (valueAST) => {
      // What we got from the client AST form
      if (valueAST.kind === Kind.INT) {
        return parseInt(valueAST.value, 10) // ast value is always in string format
      }
      return null
    }
  })
}
