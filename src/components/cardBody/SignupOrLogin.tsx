import { Backdrop, Fade, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import { NextPage } from 'next';
import { connect } from 'react-redux';
import styled from 'styled-components';
import axios, { AxiosError } from 'axios';
import { changeLogin, IChangeLogin, ILanguage, IShowMessage, showErrorMessage, showSuccessMessage } from '../../redux/action';
import { IStateRedux } from '../../redux/store';

interface ISignupOrLoginProps {
    language: ILanguage;
    changeLogin: IChangeLogin;
    showErrorMessage: IShowMessage;
    showSuccessMessage: IShowMessage;
}

interface IDataState {
    name: string;
    email: string;
    password: string;
    language: string;
}

interface IButton {
    loading?: boolean;
}

export const ButtonAnimated = styled.button`
    transition: 1s;
    padding: 18px;
    margin: 10px 0 15px 0;
    border-radius: 10px;
    box-shadow: 4px 4px 10px grey;
    background: linear-gradient(120deg, #0080ff, #0000ff);
    color: #fff;
    font-weight: 900;
    font-size: 1.25rem;
    box-shadow: -2px 6px 1px #232323;
    border: none;

    @keyframes press {
        0% { background: linear-gradient(120deg, #0080ff, #0000ff); }
        25% { background: linear-gradient(120deg, #0048ff, #0033ff); }
        50% { background: linear-gradient(120deg, #004cff, #0062ff); }
        75% { background: linear-gradient(120deg, #002aff, #0066ff); }
        100% { background: linear-gradient(120deg, #0000ff, #0080ff); }
    }

    &:hover {
        transition: 1s;
        margin: 15px 10px 10px 0;
        cursor: pointer;
        box-shadow: 0px 0px 0px #232323;
        background: linear-gradient(120deg, #0000ff, #0080ff);
        animation: press 1s ease-in infinite;
    }
`;

const Button = styled.button<IButton>`
    

    transition: 1s;
    padding: 18px;
    margin: ${({ loading }) => loading ? "10px auto 0px auto" : "10px auto 10px auto"};
    border-radius: 10px;
    min-width: 90px;
    background: 
        ${({ loading }) => loading 
            ? "linear-gradient(120deg, #126eca, #00005a)" 
            : "linear-gradient(120deg, #0080ff, #0000ff)"};
    color: #fff;
    font-weight: 900;
    font-size: 1.25rem;
    box-shadow: ${({ loading }) => loading ? "none" : "-1px 4px 0px #232323"};
    border: none;
    cursor: ${({ loading }) => loading ? "wait" : "pointer"};
`;

const CardModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    background-color: rgb(243, 244, 255);
    border-radius: 15px;
    border: 1px solid #999;
    padding: 30px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 1120px) {
        max-width: 80vw;
        max-height: 65vh;
    }

    @media (max-width: 730px) {
        max-width: 90vw;
        max-height: 70vh;
    }

    @media (max-width: 360px) {
        max-width: 90vw;
        height: 50vh;
    }
`;

const Title = styled.h1`
    text-align: center;
    font-size: 1.75rem;
    font-family: "Roboto";

    @media (max-width: 510px) {
        font-size: 2rem;
    }
`;

const SignupOrLoginWrapper = styled.div`
    width: 100%;
`;

const InputSignupContent = styled.div`
    margin: 40px 0 20px 0;
`;

const InputSection = styled.div`
    margin: 0 0 16px 0;
    display: flex;
    justify-content: space-between;

    label {
        font-size: 1.25rem;
        font-weight: 500;
    }

    select {
        cursor: pointer;
        padding: 5px 10px;
        font-size: 1rem;
        font-weight: 500;
        border: none;
        background: transparent;
        box-shadow: 0px 0px 15px #f2f2ff inset;
    }
`;

const Input = styled.input`
    border: none;
    border-bottom: 1px solid black;
    background: transparent;
    border-radius: 3px;
    margin-left: 16px;
    padding: 5px 10px;
    font-size: 1rem;
    min-width: 12vw;
    box-shadow: 0px 0px 15px #f2f2ff inset;
`;

const FlexAligned = styled.div`
    display: flex;
    justify-content: center;
`;

const initialData: IDataState = {
    name: "",
    email: "",
    password: "",
    language: "Portuguese",
}

const Spinner = () => (
    <div className="spinner-border spinner-border-sm" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
);

const SignupOrLogin: NextPage<ISignupOrLoginProps> = ({ language, changeLogin, showErrorMessage, showSuccessMessage }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [signup, setSignup] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(false);
    const [data, setData] = useState<IDataState>(initialData);
    const [loadingEnter, setLoadingEnter] = useState<boolean>(false);
    const [loadingSignup, setLoadingSignup] = useState<boolean>(false);

    const handleOnSignup = async () => {
        if (data.name.length > 3 && data.email.length > 3 && data.password.length > 3) {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup` , data)
                .catch((res: AxiosError) => {
                    if(res.response?.data.message) {
                        showErrorMessage(res.response?.data.message);
                        setLoadingSignup(true);
                        setTimeout(() => setLoadingSignup(false), 3000);
                    }
                });


            if (response?.data?.token) {
                window.localStorage.setItem("token", response?.data?.token);

                showSuccessMessage("User registered successfully!");

                handleClose();

                changeLogin(true);
            }
        }
    }
    
    const handleOnLogin = async () => {
        if (data.email.length > 3 && data.password.length > 3) {
            const response: any = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                email: data.email,
                password: data.password,
            })
                .catch((res: AxiosError) => {
                    if(res.response?.data.message) {
                        showErrorMessage(res.response?.data.message);
                        setLoadingEnter(true);
                        setTimeout(() => setLoadingEnter(false), 3000);
                    }
                });
                        
            if (response?.data?.token) {
                window.localStorage.setItem("token", response?.data?.token);

                showSuccessMessage("User logged successfully!");

                handleClose();

                changeLogin(true);
            }
        }
    }

    const renderSignup = () => {
        return (
            <SignupOrLoginWrapper>
                <Title color="#373F3F">
                    {language === "English" ? "Create Account:" : "Criar Conta:" }
                </Title>
                <InputSignupContent>
                    <InputSection>
                        <label htmlFor="input_name">
                            {language === "English" ? "Name:" : "Nome:" }
                        </label>
                        <Input 
                            id="input_name"
                            type="text"
                            value={data.name}
                            onChange={ev => setData({ ...data, name: String(ev.target.value) })}
                        />
                    </InputSection>
                    <InputSection>
                        <label htmlFor="input_email">Email:</label>
                        <Input 
                            id="input_email"
                            type="email"
                            value={data.email}
                            onChange={ev => setData({ ...data, email: String(ev.target.value) })}
                        />
                    </InputSection>
                    <InputSection>
                        <label htmlFor="input_password">
                            {language === "English" ? "Password:" : "Senha:" }
                        </label>
                        <Input
                            id="input_password"
                            type="password"
                            value={data.password}
                            onChange={ev => setData({ ...data, password: String(ev.target.value) })}
                        />
                    </InputSection>
                    <InputSection>
                        <label htmlFor="input_language">
                            {language === "English" ? "Language:" : "Língua:" }
                        </label>
                        <select 
                            id="input_language" 
                            name="input_language" 
                            value={data.language} 
                            onChange={ev => { console.log(ev.target.value); setData({ ...data, language: String(ev.target.value) })}}
                        >
                            <option value="Portuguese">
                                {language === "English" ? "Portuguese:" : "Português:" }
                            </option>
                            <option value="English">
                                {language === "English" ? "English:" : "Ingles:" }
                            </option>
                        </select>
                    </InputSection>
                </InputSignupContent>
                <Button onClick={handleOnSignup} loading={loadingSignup} disabled={loadingSignup}>
                    {loadingSignup 
                        ? <Spinner />
                        : language === "English" ? "Create Account" : "Criar Conta"}
                </Button>
            </SignupOrLoginWrapper>
        );
    }
    
    const renderLogin = () => {
        return (
            <SignupOrLoginWrapper>
                <Title color="#373F3F">
                    {language === "English" ? "Do SignIn:" : "Fazer Login:" }
                </Title>
                <InputSignupContent>
                    <InputSection>
                        <label htmlFor="input_email">Email:</label>
                        <Input 
                            id="input_email"
                            type="email"
                            value={data.email}
                            onChange={ev => setData({ ...data, email: String(ev.target.value) })}
                        />
                    </InputSection>
                    <InputSection>
                        <label htmlFor="input_password">
                            {language === "English" ? "Password:" : "Senha:" }
                        </label>
                        <Input
                            id="input_password"
                            type="password"
                            value={data.password}
                            onChange={ev => setData({ ...data, password: String(ev.target.value) })}
                        />
                    </InputSection>
                </InputSignupContent>
                <FlexAligned>
                    <Button onClick={handleOnLogin} loading={loadingEnter} disabled={loadingEnter}>
                        {loadingEnter 
                            ? <Spinner />
                            : language === "English" ? "Enter" : "Entrar" }
                    </Button>
                </FlexAligned>
            </SignupOrLoginWrapper>
        );
    }
    
    const handleOpen = () => {
        setSignup(false);
        setLogin(false);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setData(initialData);
    }

    const swithLoginSignup = () => {
        return signup 
            ? renderSignup()
            : login 
                ? renderLogin()
                :
                    <>
                        <Title color="#373F3F">
                            {language === "English" ? "Select the language:" : "Como você deseja prosseguir:" }
                        </Title>
                        <Button onClick={() => { setSignup(true); setLogin(false); }}>
                            Quero criar uma conta
                        </Button>
                        <Button onClick={() => { setSignup(false); setLogin(true); }}>
                            Já tenho uma conta
                        </Button>
                    </>
    }

    return (
        <>
            <ButtonAnimated onClick={handleOpen}>
                DEIXAR UM FEEDBACK
            </ButtonAnimated>
            <CardModal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 50000 }}
            >
                <Fade in={open}>
                    <Content>
                        {swithLoginSignup()}
                    </Content>
                </Fade>
            </CardModal>
        </>
    );
}

const mapStateToProps = (state: IStateRedux) => ({ language: state.language.language });
const mapDispatchToProps = ({ changeLogin, showErrorMessage, showSuccessMessage });

export default connect(mapStateToProps, mapDispatchToProps)(SignupOrLogin);