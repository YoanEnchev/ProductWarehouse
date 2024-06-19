import React from 'react';
import * as ReactDOM from 'react-dom/client'
import App from './components/App';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import getAppBaseURL from './helpers/getAppBaseURL';

const client = new ApolloClient({
    uri: `${getAppBaseURL()}/graphql/`,
    cache: new InMemoryCache()
});

ReactDOM.createRoot(document.querySelector('#app'))
    .render(<ApolloProvider client={client}>
        <App />
    </ApolloProvider>);