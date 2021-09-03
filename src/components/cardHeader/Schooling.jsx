import React, { Component } from 'react'
import { connect } from 'react-redux';

import styled from 'styled-components';

import { IoMdSchool } from 'react-icons/io';

const Name = styled.h1`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: justify;
    font-size: 1.3rem;
    font-weight: 100;
    color: rgb(70, 70, 70);
    margin: 0 0 3vh 0;
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

class Schooling extends Component {
    render() {
        let { language } = this.props;

        return (
            <div>
                <Title>
                    <SchoolSharp size="35" />
                    {language === 'Portuguese' ? 'Escolaridade' : 'Schooling'}
                </Title>
                <Name>
                    <SchoolText>
                        {language === 'Portuguese' 
                            ? `Cursando Ciência da Computação na UNIP`
                            : `Studying Computer Science at UNIP`
                        }
                    </SchoolText>
                </Name>
            </div>
        )
    }
}

const mapStateToProps = state => ({ language: state.language.language });

const schooling = connect(mapStateToProps, null)(Schooling);

export default schooling;