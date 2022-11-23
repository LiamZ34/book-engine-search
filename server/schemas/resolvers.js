const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({
                    _id: context.user._id
                }).select('-__v -password')
                return foundUser
            }
            throw new AuthenticationError('Not logged in')
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user}
        },
        login: async (parent, args) => {
            const user = await User.findOne({email: args.email});
            if (!user) {
                 throw new AuthenticationError("Can't find this user");
              }
              const correctPw = await user.isCorrectPassword(args.password);
              if (!correctPw) {
                throw new AuthenticationError('Wrong password!');
              } 
              const token = signToken(user);
              return (token, user)
        },
        saveBook: async (parent, args) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: args } },
                { new: true, runValidators: true }
              ); 
              return {updatedUser}
        },
        removeBook: async (parent, args) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
              );
              if (!updatedUser) {
                throw new AuthenticationError("Couldn't find user with this id!" );
              }
        }

    }
}


module.exports = resolvers;