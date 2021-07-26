import Order from "./models/Order.model.js"

const resolvers = {
  Query: {
    orders: async () => {
      return await Order.find().sort({ created: -1 })
    },
    order: async (_, args) => {
      const { id } = args
      return await Order.findById(id)
    },
  },
  Mutation: {
    createOrder: async (parent, args, context, info) => {
      const { input } = args

      const order = new Order({ ...input, created: new Date() })
      await order.save()
      return order
    },
    updateOrder: async (_, args) => {
      const { id, input } = args

      return await Order.findOneAndUpdate(
        { _id: id },
        { ...input },
        { new: true }
      )
    },
    deleteOrder: async (_, args) => {
      const { id } = args

      await Order.deleteOne({ _id: id })
      return id
    },
  },
}

export default resolvers
