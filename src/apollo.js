import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "http://localhost:4000/" //"https://movieql.now.sh/" http://localhost:4000/
});

export default client;