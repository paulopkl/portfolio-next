import axios, { AxiosError } from 'axios';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { changeLogin, IChangeLogin, ILanguage, ILoadComments, IShowMessage, loadComments, showErrorMessage, showSuccessMessage } from '../../../redux/action';
import { IStateRedux } from '../../../redux/store';

interface ICommentProps {
    language: ILanguage;
    changeLogin: IChangeLogin;
    loadComments: ILoadComments;
    showSuccessMessage: IShowMessage;
    showErrorMessage: IShowMessage;
}

const CommentWrapper = styled.div`
    width: 82%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Textarea = styled.textarea`
    resize: none;
    width: 100%;
    padding: 20px 20px;
    border-radius: 10px;
    border: 1px solid #a8a8a8;
    box-shadow: 0px 0px 3px #989dcf inset;
    font-size: 1rem;
    box-sizing: border-box;
`;

const ButtonComment = styled.button`
    width: 100%;
    transition: 1s;
    padding: 18px;
    margin: 10px 0 15px 0;
    border-radius: 10px;
    box-shadow: 4px 4px 10px grey;
    background: linear-gradient(120deg, #0080ff, #0000ff);
    color: #fff;
    font-weight: 900;
    font-size: 1.25rem;
    border: none;

    &:hover {
        transition: 1s;
        cursor: pointer;
    }
`;

const ExitButton = styled.p`
    border-radius: 10px;
    margin: 0;
    text-decoration: underline;
    color: red;

    &:hover {
        cursor: pointer;
    }
`;

const Comment: NextPage<ICommentProps> = ({ language, changeLogin, loadComments, showSuccessMessage, showErrorMessage }) => {
    const [description, setDescription] = useState("");

    const postComment = async () => {
        const scriptXSS = (/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi).test(description);
        const SQLInject = (/<[^\w<>]*(?:[^<>"'\s]*:)?[^\w<>]*(?:\W*s\W*c\W*r\W*i\W*p\W*t|\W*f\W*o\W*r\W*m|\W*s\W*t\W*y\W*l\W*e|\W*s\W*v\W*g|\W*m\W*a\W*r\W*q\W*u\W*e\W*e|(?:\W*l\W*i\W*n\W*k|\W*o\W*b\W*j\W*e\W*c\W*t|\W*e\W*m\W*b\W*e\W*d|\W*a\W*p\W*p\W*l\W*e\W*t|\W*p\W*a\W*r\W*a\W*m|\W*i?\W*f\W*r\W*a\W*m\W*e|\W*b\W*a\W*s\W*e|\W*b\W*o\W*d\W*y|\W*m\W*e\W*t\W*a|\W*i\W*m\W*a?\W*g\W*e?|\W*v\W*i\W*d\W*e\W*o|\W*a\W*u\W*d\W*i\W*o|\W*b\W*i\W*n\W*d\W*i\W*n\W*g\W*s|\W*s\W*e\W*t|\W*i\W*s\W*i\W*n\W*d\W*e\W*x|\W*a\W*n\W*i\W*m\W*a\W*t\W*e)[^>\w])|(?:<\w[\s\S]*[\s\0\/]|['"])(?:formaction|style|background|src|lowsrc|ping|on(?:d(?:e(?:vice(?:(?:orienta|mo)tion|proximity|found|light)|livery(?:success|error)|activate)|r(?:ag(?:e(?:n(?:ter|d)|xit)|(?:gestur|leav)e|start|drop|over)?|op)|i(?:s(?:c(?:hargingtimechange|onnect(?:ing|ed))|abled)|aling)|ata(?:setc(?:omplete|hanged)|(?:availabl|chang)e|error)|urationchange|ownloading|blclick)|Moz(?:M(?:agnifyGesture(?:Update|Start)?|ouse(?:PixelScroll|Hittest))|S(?:wipeGesture(?:Update|Start|End)?|crolledAreaChanged)|(?:(?:Press)?TapGestur|BeforeResiz)e|EdgeUI(?:C(?:omplet|ancel)|Start)ed|RotateGesture(?:Update|Start)?|A(?:udioAvailable|fterPaint))|c(?:o(?:m(?:p(?:osition(?:update|start|end)|lete)|mand(?:update)?)|n(?:t(?:rolselect|extmenu)|nect(?:ing|ed))|py)|a(?:(?:llschang|ch)ed|nplay(?:through)?|rdstatechange)|h(?:(?:arging(?:time)?ch)?ange|ecking)|(?:fstate|ell)change|u(?:echange|t)|l(?:ick|ose))|m(?:o(?:z(?:pointerlock(?:change|error)|(?:orientation|time)change|fullscreen(?:change|error)|network(?:down|up)load)|use(?:(?:lea|mo)ve|o(?:ver|ut)|enter|wheel|down|up)|ve(?:start|end)?)|essage|ark)|s(?:t(?:a(?:t(?:uschanged|echange)|lled|rt)|k(?:sessione|comma)nd|op)|e(?:ek(?:complete|ing|ed)|(?:lec(?:tstar)?)?t|n(?:ding|t))|u(?:ccess|spend|bmit)|peech(?:start|end)|ound(?:start|end)|croll|how)|b(?:e(?:for(?:e(?:(?:scriptexecu|activa)te|u(?:nload|pdate)|p(?:aste|rint)|c(?:opy|ut)|editfocus)|deactivate)|gin(?:Event)?)|oun(?:dary|ce)|l(?:ocked|ur)|roadcast|usy)|a(?:n(?:imation(?:iteration|start|end)|tennastatechange)|fter(?:(?:scriptexecu|upda)te|print)|udio(?:process|start|end)|d(?:apteradded|dtrack)|ctivate|lerting|bort)|DOM(?:Node(?:Inserted(?:IntoDocument)?|Removed(?:FromDocument)?)|(?:CharacterData|Subtree)Modified|A(?:ttrModified|ctivate)|Focus(?:Out|In)|MouseScroll)|r(?:e(?:s(?:u(?:m(?:ing|e)|lt)|ize|et)|adystatechange|pea(?:tEven)?t|movetrack|trieving|ceived)|ow(?:s(?:inserted|delete)|e(?:nter|xit))|atechange)|p(?:op(?:up(?:hid(?:den|ing)|show(?:ing|n))|state)|a(?:ge(?:hide|show)|(?:st|us)e|int)|ro(?:pertychange|gress)|lay(?:ing)?)|t(?:ouch(?:(?:lea|mo)ve|en(?:ter|d)|cancel|start)|ime(?:update|out)|ransitionend|ext)|u(?:s(?:erproximity|sdreceived)|p(?:gradeneeded|dateready)|n(?:derflow|load))|f(?:o(?:rm(?:change|input)|cus(?:out|in)?)|i(?:lterchange|nish)|ailed)|l(?:o(?:ad(?:e(?:d(?:meta)?data|nd)|start)?|secapture)|evelchange|y)|g(?:amepad(?:(?:dis)?connected|button(?:down|up)|axismove)|et)|e(?:n(?:d(?:Event|ed)?|abled|ter)|rror(?:update)?|mptied|xit)|i(?:cc(?:cardlockerror|infochange)|n(?:coming|valid|put))|o(?:(?:(?:ff|n)lin|bsolet)e|verflow(?:changed)?|pen)|SVG(?:(?:Unl|L)oad|Resize|Scroll|Abort|Error|Zoom)|h(?:e(?:adphoneschange|l[dp])|ashchange|olding)|v(?:o(?:lum|ic)e|ersion)change|w(?:a(?:it|rn)ing|heel)|key(?:press|down|up)|(?:AppComman|Loa)d|no(?:update|match)|Request|zoom))[\s\0]*=/gi).test(description);

        if (description.length > 3 && !scriptXSS && !SQLInject) {
            const token = window.localStorage.getItem("token") || "";

            const authorization = `Bearer ${token}`;

            if (token?.length > 0) {    
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ratings`, 
                    { description }, 
                    { 
                        headers: { 
                            'Content-Type': 'application/json', 
                            authorization
                        }
                    }
                )
                    .then(res => {
                        showSuccessMessage("Comment posted successfully!");
                    })
                    .catch((res: AxiosError) => {
                        if(res.response?.data.message) {
                            showErrorMessage(res.response?.data.message);
                        }
                    });

                await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ratings`)
                    .then(res => {
                        if(res.data) loadComments(res.data);
                    })
                    .catch((res: AxiosError) => {
                        if(res.response?.data.message) {
                            showErrorMessage(res.response?.data.message);
                        }
                    });

                setDescription("");
            }
        }
    }

    const logout = () => {
        window.localStorage.removeItem("token");

        changeLogin(false);
    }

    return (
        <CommentWrapper>
            <Textarea
                id=""
                name=""
                placeholder={language === "English" ? "Add a comment..." : "Adicionar um comentário..."}
                cols={20}
                rows={8}
                value={description}
                onChange={ev => setDescription(ev.target.value)}
            ></Textarea>
            <ButtonComment onClick={postComment}>
                {language === "English" ? "Post" : "Comentar"}
            </ButtonComment>
            <ExitButton onClick={logout}>
                {language === "English" ? "Exit" : "Sair"}
            </ExitButton>
        </CommentWrapper>
    );
}

const mapStateToProps = (state: IStateRedux) => ({ language: state.language.language });
const mapDispatchToProps = ({ changeLogin, loadComments, showSuccessMessage, showErrorMessage })

export default connect(mapStateToProps, mapDispatchToProps)(Comment);