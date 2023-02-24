import { NextPage } from 'next';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { ILanguage } from '../../../redux/action';
import { IStateRedux } from '../../../redux/store';
import { MdDescription } from "react-icons/md";

interface IDescriptionProps {
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
    margin: 0 0 3vh 0;
`;

const Title = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const DescriptionIcon = styled(MdDescription)`
    margin-right: 0.4vw;
`;

const Description: NextPage<IDescriptionProps> = ({ language }) => {
    
    return (
        <div>
            <Title>
                <DescriptionIcon size="35" />
                {language === 'English' ? 'Description' : 'Descrição'}
            </Title>
            <Name>
                {language === 'English'
                    ? `I develop web and mobile applications, I like to work following the UI metrics, giving
                        preference to customer feedback and all approval protocols, I am a communicative 
                        person, I am always open to professional agreement and agreements, I am constantly 
                        evolving every day and I believe I can apply this growthfor your company too`
                    : `Desenvolvo aplicações web e Mobile, gosto de trabalhar seguindo as métricas do UI, 
                        dando preferência ao feedback do cliente e todos os protocolos de homologação, 
                        sou uma pessoa comunicativa, estou sempre aberto a negociações e acordos profissionais,
                        estou em constante evolução todos os dias e acredito que posso aplicar este crescimento
                        para sua empresa também!`}
            </Name>
        </div>
    );
}

const mapStateToProps = (state: IStateRedux) => ({ language: state.language.language });

export default connect(mapStateToProps, {})(Description);