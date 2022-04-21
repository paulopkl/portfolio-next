import App from 'next/app';
import React from 'react';
import { createWrapper } from "next-redux-wrapper";
import store from '../redux/store';
import { Provider } from "react-redux";

class MyApp extends App {

    render() {
        //Information that was returned  from 'getInitialProps' are stored in the props i.e. pageProps
        const { Component, pageProps } = this.props;
        
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
