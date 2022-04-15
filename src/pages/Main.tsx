import React from 'react';
import { NextPage } from 'next';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';
import Navbar from '../components/Navbar/Navbar';
import styled from 'styled-components';

const Template = styled.div`
    background-image: url(/assets/javascript_cup.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
`;

const Home: NextPage = () => {
    return (
        <Template>
            <Navbar />
            <Main />
            <Footer />
        </Template>
    );
}

export default Home;