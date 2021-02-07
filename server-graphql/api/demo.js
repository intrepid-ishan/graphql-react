const gql = require('graphql-tag');
const {ApolloServer} = require('apollo-server');

// Schema
const typeDefs = gql`
    type User{
        firstName: String!
        lastName: String!
        phoneNumber: Float!
    }

    type myFriendEmail{
        email: String
    }

    type Query{
        getUser: User!
        getFriendEmail :myFriendEmail
    }
`;

// Resolver 
const resolvers = {
    Query:{
        getUser(){
            return{
                firstName: "Anand",
                lastName: "Petikar",
                phoneNumber: 9664887661
            }
        },
        getFriendEmail(){
            return{ 
                email: "ish@mak.com"
            }
        }
    }
}

// Server
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000)
    .then(()=>console.log("on port 4000"))

//node api/demo.js