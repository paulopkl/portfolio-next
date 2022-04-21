// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from "next/document";
import { NextPageContext } from "next";
import styled, { ServerStyleSheet } from "styled-components";

interface IMyDocumentProps {
    styleTags: any;
}

interface Context extends NextPageContext {
    renderPage: any;
}

export default class MyDocument extends Document<IMyDocumentProps> {

    static getInitialProps({ renderPage }: Context) {
        // Returns an object like: { html, head, errorHtml, chunks, styles }

        // Step 1: Create an instance of ServerStyleSheet
        const sheet = new ServerStyleSheet();

        // Step 2: Retrieve styles from components in the page
        // eslint-disable-next-line react/display-name
        const page = renderPage((App: any) => (props: any) => { return sheet.collectStyles(<App {...props} />) });

        // Step 3: Extract the styles as <style> tags
        const styleTags = sheet.getStyleElement();

        // Step 4: Pass styleTags as a prop
        return { ...page, styleTags };
    }

    render() {
        return (
            <Html>
                <Head>
                    {/* Step 5: Output the styles in the head  */}
                    {this.props.styleTags}
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;1,100&display=swap"
                    />
                    {/* <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap"
                    /> */}
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" 
                    /> 
                    <meta
                        name="description"
                        content="Portfolio created to expose my projects, created using ReactJS and Redux and other technologies"
                    />
                    <title>Paulo Ricardo - Dev Web</title>
                </Head>
                <body style={{ margin: 0, fontFamily: "Roboto, sans-serif" }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
