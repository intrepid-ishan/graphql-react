import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';

const typeDefs = gql`
    extend type User{
        age: Int
    }
    extend type Pet{
        vaccinated: Boolean!
    }
`;

const resolvers = {
    User: {
        age() {
            return 35;
        }
    },
    Pet: {
        vaccinated: () => true
    }
};

const http = new HttpLink({ uri: 'http://localhost:4000/' });

const delay = setContext(
    request =>
        new Promise((success, fail) => {
            setTimeout(() => {
                success();
            }, 800);
        })
);

const cache = new InMemoryCache();

const link = ApolloLink.from([
    delay,
    http
]);

const client = new ApolloClient({
    link,
    cache,
    resolvers,
    typeDefs
});

export default client;

// https://rickandmortyapi.com/graphql
// const query = gql`
//     {
//         characters{
//             results{
//                 name
//                 __typename
//             }
//         }
//     }
// `;
// client.query({ query })
//     .then(result => console.log(result));