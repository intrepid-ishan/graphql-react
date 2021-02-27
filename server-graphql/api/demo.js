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

    type Gadget{
        brand: String!
        price: Int!
    }

    input GadgetInput{
        brand: String
        price: Int
    }

    type Query{
        getUser: User!
        getFriendEmail: myFriendEmail
        getGadget(input: GadgetInput): [Gadget]
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
        },
        getGadget(_, {input}){
            return [
                // brand: 'apple', price:1200
                {brand: 'apple', price: 1200},
                {brand: 'samsung', price: 700}
            ].filter(shoe => shoe.brand === input.brand)
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