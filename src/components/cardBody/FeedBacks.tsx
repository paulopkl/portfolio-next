import { NextPage } from 'next';
import React from 'react';
import { FaFlagUsa } from 'react-icons/fa';
import { GiBrazilFlag } from 'react-icons/gi';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { IStateRedux } from '../../redux/store';

interface IFeedBackProps {
    author: string;
    description: string;
    createdAt: string;
    language: string;
    globalLanguage: string;
}

const FeedbackContainer = styled.div`
    width: 100%;
    padding: 24px 20px;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: 4px 4px 10px grey;
    background: linear-gradient(120deg, #efeff8, #e3e3ff);
    box-sizing: border-box;
`;

const FeebackTitle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const FeebackIcon = styled.div`
    display: flex;
    align-items: center;
`;

const FeebackAuthor = styled.h3`
    margin: 0;
    font-family: "Roboto";
    color: rgb(30, 50, 104);
    text-decoration: underline;
    font-size: 1.25rem;
`;

const FeebackDescription = styled.p`
    font-family: "Roboto";
    margin: 0;
    margin-left: 16px;
`;

const BrazilFlag = styled(GiBrazilFlag)`
    font-size: 1.4rem;
    color: yellow;
    background-color: green;
    margin: 0 10px 0 14px;
    height: 20px;
`;

const UsaFlag = styled(FaFlagUsa)`
    font-size: 1.4rem;
    color: red;
    margin: 0 10px 0 14px;
    height: 20px;
`;

const FeedBacks: NextPage<IFeedBackProps> = ({ author, description, createdAt, language, globalLanguage }) => {

    const loadDate = () => {
        if (globalLanguage === "English") {
            return new Date(createdAt).toLocaleString("en-US");
        } else {
            const hourLocal = new Date(createdAt).getHours() - 3;
            const localDate = new Date(createdAt).setHours(hourLocal);
            const date = new Date(localDate);
            
            return date.toLocaleString("pt-BR");
        }
    }

    return (
        <FeedbackContainer>
            <FeebackTitle>
                <FeebackAuthor>
                    {author}
                </FeebackAuthor>
                <FeebackIcon>
                    {language === "English" ? <UsaFlag /> : <BrazilFlag />}
                </FeebackIcon>
                {loadDate()}
            </FeebackTitle>
            <FeebackDescription>
                {description}
            </FeebackDescription>
        </FeedbackContainer>
    );
}

const mapStateToProps = (state: IStateRedux) => ({ globalLanguage: state.language.language });
const mapDispatchToProps = ({});

export default connect(mapStateToProps, mapDispatchToProps)(FeedBacks);