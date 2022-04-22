import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { GrLocation } from 'react-icons/gr';
import { GiBrazil } from 'react-icons/gi';
import Description from './Description';
import Schooling from './Schooling';
import { NextPage } from 'next';
import { IStateRedux } from '../../redux/store';
import { ILanguage } from '../../redux/action';

interface ICardHeader {
    language: ILanguage,
}

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;

    @media(max-width: 700px) { width: 80%; }
`;

const Name = styled.h1`
    text-align: center;
    color: rgb(52, 111, 201);
    font-size: 1.5rem;
    margin-top: 3vh;
    font-weight: 700;
`;

const Sub = styled.p`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 100;
    color: rgb(70, 70, 70);
    margin: 0;

    strong {
        font-weight: bold;
        margin-left: 7px;
        margin-right: 7px;
    }
`;

const Location = styled.p`
    font-size: 1.2rem;
    margin: 0;
`;

const LocationIcon = styled(GrLocation)`
    margin: 0 0.5vw;
    color: rgb(76, 76, 76);
`;

const Image = styled.img`
    width: 16.5rem;
    height: 17rem;
    border-radius: 50%;
    border: 7px solid rgb(96, 126, 143);
    margin-top: -6.5rem;
    box-shadow: 0px 4px 20px rgb(137, 140, 196);
`;

const Flex = styled.div`
    margin-top: 5px;
    display: flex;
    align-items: center;
`;

const BrIcon = styled(GiBrazil)`
    color: green;
    font-size: 2rem;
`;

const Hr = styled.hr`
    width: 100%;
    border: 1px solid #b2b2b2;
`;

const CardHeader: NextPage<ICardHeader> = ({ language }) => {
  return (
    <Header>
        <Image src={"/assets/Autor.jpg"} alt="Author" />
        <Name>Paulo Ricardo A. de Almeida</Name>
        <Flex>
            {language === 'English' 
                ? <Sub>Web Developer from<strong>Brazil</strong></Sub>
                : <Sub>Desenvolvedor Web do<strong>Brasil</strong></Sub>}
            <BrIcon />
        </Flex>
        <Flex>
            <LocationIcon size="30" />
            <Location>Campinas, São Paulo</Location>
        </Flex>
        <Hr />
        <Schooling />
        <Hr />
        <Description />
        <Hr />
    </Header>
  );
}

const mapStateToProps = (state: IStateRedux) => ({ language: state.language.language });

export default connect(mapStateToProps, {})(CardHeader);