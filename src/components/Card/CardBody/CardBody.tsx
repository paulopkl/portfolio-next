import axios, { AxiosError } from 'axios';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { FaBrain, FaComment } from 'react-icons/fa';
import { GiOpenBook } from 'react-icons/gi';
import { RiContactsFill } from 'react-icons/ri';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeLogin, IChangeLogin, ILanguage, ILoadComments, IShowMessage, loadComments, showErrorMessage } from '../../../redux/action';
import { IRatings } from '../../../redux/reducer';
import { IStateRedux } from '../../../redux/store';
import CommentComponent from './Comment';
import FeedBacks from './FeedBacks';
import Links from './Links/Links';
import SignupOrLogin from './SignupOrLogin';
import Skills from './Skills/Skills';

interface ICardBodyProps {
    language: ILanguage;
    isLogged?: boolean;
    changeLogin: IChangeLogin;
    comments: IRatings[];
    loadComments: ILoadComments;
    showErrorMessage: IShowMessage;
}

interface IHr {
    width: string;
}

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;

    @media(max-width: 766px) { width: 90%; }
`;

const CommentsArea = styled.div`
    width: 82%;
    /* @media(max-width: 766px) { width: 90%; } */
`;

const CommentCount = styled.p`
    color: #0177fd;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
`;

const Comment = styled(FaComment)`
    color: #0177fd;
    font-size: 16pt;
    margin-right: 10px;
`;

const OpenBook = styled(GiOpenBook)`
    margin-right: 15px;
`;

const Title = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContactsFill = styled(RiContactsFill)`
    margin-right: 15px;
`;

const Hr = styled.hr<IHr>`
    width: ${({ width }) => width};
    border: 1px solid #b2b2b2;
`;

const CardBody: NextPage<ICardBodyProps> = ({ language, isLogged, comments, changeLogin, loadComments, showErrorMessage }) => {

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ratings`)
            .then(res => {
                loadComments(res.data);
            })
            .catch((res: AxiosError) => {
                if(res.response?.data.message) {
                    showErrorMessage(res.response?.data.message);
                }
            });

        const token = (localStorage.getItem("token") || "");

        if (token.length > 0) changeLogin(true)
        else changeLogin(false);
    }

    return (
        <Body>
            <Title>
                <OpenBook size={35} />
                Skills
            </Title>
            <Skills />
            <Hr width={"80%"} />
            <Title>
                <ContactsFill size={35} />
                {language === "Portuguese" ? "Contato e redes sociais" : "Contact and social media"}
            </Title>
            <Links />
            {isLogged 
                ? <CommentComponent /> 
                : <SignupOrLogin />}
            <CommentsArea>
                <Hr width={"100%"} />
                <CommentCount>
                    <Comment /> {language === "English" ? "Comments" : "Comentários"} ({ comments.length })
                </CommentCount>
                {comments.map(rating => (
                    <FeedBacks
                        key={rating.created_at} 
                        author={rating.author}
                        description={rating.description}
                        createdAt={rating.created_at}
                        language={rating.language}
                    />
                ))}
            </CommentsArea>
        </Body>
    );
}

const mapStateToProps = (state: IStateRedux) => ({
    language: state.language.language,
    isLogged: state.isLogged.isLogged,
    comments: state.comments.comments
});

const mapDispatchToProps = ({ changeLogin, loadComments, showErrorMessage });

export default connect(mapStateToProps, mapDispatchToProps)(CardBody);