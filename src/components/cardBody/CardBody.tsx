import { NextPage } from 'next';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ILanguage } from '../../redux/action';
import { IStateRedux } from '../../redux/store';
import Links from './Links/Links';
import Skills from './Skills/Skills';

interface ICardBodyProps {
    language: ILanguage,
}

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;

    @media(max-width: 766px) { width: 90%; }
`;

const CardBody: NextPage<ICardBodyProps> = ({ language }) => (
    <Body>
        <h1>Skills</h1>
        <Skills />
        <hr style={{ width: "80%" }} />
        <h1>{language === "Portuguese" ? "Contato e redes sociais" : "Contact and social media"}</h1>
        <Links />
    </Body>
);

const mapStateToProps = (state: IStateRedux) => ({ language: state.language.language });

export default connect(mapStateToProps)(CardBody);