import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { IoMdSchool } from 'react-icons/io';
import { NextPage } from 'next';
import { ILanguage } from '../../redux/action';
import { IStateRedux } from '../../redux/store';

interface ISchoolingProps {
    language: ILanguage,
}

const Name = styled.h1`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: justify;
    font-size: 1.3rem;
    font-weight: 100;
    color: rgb(70, 70, 70);
    margin: 0 0 0 0;
`;

const Title = styled.h1`
    display: flex; 
    text-align: center;
    justify-content: center;
`;

const SchoolSharp = styled(IoMdSchool)`
  margin-right: 1.2vh;
  vertical-align: baseline;
  color: rgb(76, 76, 76);
`;

const SchoolText = styled.p`
    margin-top: 0;
    font-size: 1.3rem;
`;

const Schooling: NextPage<ISchoolingProps> = ({ language }) => {

    return (
        <div>
            <Title>
                <SchoolSharp size="40" />
                {language === 'English' 
                    ? 'Schooling' 
                    : 'Escolaridade'}
            </Title>
            <Name>
                <SchoolText>
                    {language === 'Portuguese' 
                        ? "Studying Computer Science at UNIP"
                        : "Cursando Ciência da Computação na UNIP"}
                </SchoolText>
            </Name>
        </div>
    );
}

const mapStateToProps = (state: IStateRedux) => ({ language: state.language.language });

export default connect(mapStateToProps, {})(Schooling);