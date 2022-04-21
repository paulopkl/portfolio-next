import axios from 'axios';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { FaComment, FaRegCommentDots } from 'react-icons/fa';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeLogin, IChangeAction, ILanguage, ILoadComments, loadComments } from '../../redux/action';
import { IRatings } from '../../redux/reducer';
import { IStateRedux } from '../../redux/store';
import CommentComponent from './Comment';
import FeedBacks from './FeedBacks';
import Links from './Links/Links';
import SignupOrLogin from './SignupOrLogin';
import Skills from './Skills/Skills';

interface ICardBodyProps {
    language: ILanguage;
    isLogged?: boolean;
    changeLogin: IChangeAction;
    comments: IRatings[];
    loadComments: ILoadComments
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
    /* display: flex;
    flex-direction: column;
    align-items: center;

    @media(max-width: 766px) { width: 90%; } */
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

const CardBody: NextPage<ICardBodyProps> = ({ language, isLogged, comments, changeLogin, loadComments }) => {
    // const [ratings, setRatings] = useState<IRatings[]>([]);
    // const [comment, setComment] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ratings`)
            .then(res => {
                loadComments(res.data);
            })

        const token = (localStorage.getItem("token") || "");

        if (token.length > 0) changeLogin(true)
        else changeLogin(false);
    }

    return (
        <Body>
            <h1>Skills</h1>
            <Skills />
            <hr style={{ width: "80%", border: "1px solid #b2b2b2" }} />
            <h1>{language === "Portuguese" ? "Contato e redes sociais" : "Contact and social media"}</h1>
            <Links />
            {isLogged 
                ? <CommentComponent /> 
                : <SignupOrLogin />}
            <CommentsArea>
                <hr style={{ width: "100%", border: "1px solid #b2b2b2" }} />
                <CommentCount>
                    <Comment /> {language === "English" ? "Comments" : "Comentários"} ({comments.length})
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

const mapDispatchToProps = ({ changeLogin, loadComments });

// export const getInitialProps = async (ctx: any) => {
//     console.log("batata");
    
//     console.log({ ctx });
    
//     // await store.dispatch(loadComments());
// };

export default connect(mapStateToProps, mapDispatchToProps)(CardBody);