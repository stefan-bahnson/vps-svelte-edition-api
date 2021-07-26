import { gql } from "apollo-server-express"

const typeDefs = gql`
  type Order {
    id: ID
    title: String
    description: String
    status: String
    tags: [String]
    created: String
  }

  input OrderInput {
    title: String
    description: String
    status: String
    tags: [String]
  }

  type Query {
    orders: [Order]
    order(id: ID): Order
  }

  type Mutation {
    createOrder(input: OrderInput): Order
    updateOrder(id: ID, input: OrderInput): Order
    deleteOrder(id: ID): String
  }
`

export default typeDefs
