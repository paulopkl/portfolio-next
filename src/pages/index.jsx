import React, { useEffect, useState } from "react";
import CardHeader from "../components/cardHeader/CardHeader";
import CardBody from "../components/cardBody/CardBody";
import CardFooter from "../components/cardFooter/CardFooter";
import Image from "next/image";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

// Redux Action
import { changeLanguage } from "../redux/action";

// Redux Package
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Styled
import styled from "styled-components";

// Icons

const Card = styled.div`
  background-color: rgb(232, 231, 250);
  border-radius: 15px;
  box-shadow: 15px 15px 30px rgb(0, 5, 48);
  width: 60vw;
  margin: 20vh auto auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 900px) { width: 90vw; }
`;

const Main = styled.main`

  margin: 0;
  background: linear-gradient(135deg,rgb(80, 150, 255),rgb(40, 96, 179),rgb(12, 49, 94),
  rgb(0, 15, 58));
  -webkit-background: linear-gradient(135deg,rgb(80, 150, 255),rgb(40, 96, 179), rgb(12, 49, 94), 
  rgb(0, 15, 58));
  -moz-background: linear-gradient(135deg,rgb(80, 150, 255),rgb(40, 96, 179),rgb(12, 49, 94),
  rgb(0, 15, 58));
  padding-bottom: 4rem;

`;

const CardModal = styled(Modal)`

  display: flex;
  align-items: center;
  justify-content: center;

`;

const Content = styled.div`

    background-color: rgb(232, 231, 250);
    border-radius: 15px;
    border: 1px solid #999;
    padding: 0;
    max-width: 50vw;
    max-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media(max-width: 1120px) {
      max-width: 80vw;
      max-height: 65vh;
    }
    
    @media(max-width: 730px) {
      max-width: 90vw;
      max-height: 70vh;
    }
    
    @media(max-width: 360px) {
      max-width: 90vw;
      height: 50vh;
    }
`;

const ImageWrapper = styled.div`
    transition: 1s;
    cursor: pointer;

    box-sizing: border-box;

    display: flex;


    border: 4px solid #444;
    border-radius: 50%;
    box-shadow: ${props => props.isSelected ? '3px 10px 20px rgb(34, 89, 214), -1px -1px 40px rgb(160, 62, 177)' : ''};
    margin: ${props => props.isSelected ? '-10px 3px 10px -3px' : '' };

    &:hover {
        transition: 1s;
        border-radius: 50%;
        box-shadow: 3px 10px 10px rgb(34, 89, 214), -1px -1px 30px rgb(160, 62, 177);
        margin: -10px 3px 10px -3px;
    }
`;

const Img = styled(Image)`
    width: 100%;
    height: 100%;
`;

const Option = styled.li`
  list-style: none;
  align-items: center;
  padding: 3rem;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media(max-width: 720px) {
    padding: 1rem;
  }
  
  @media(max-width: 720px) {
    padding: 0rem;
  }
`;

const Select = styled.ul`
  padding: 0;
  display: flex;
  justify-content: space-evenly;
`;

const Title = styled.h1`
  text-align: center;
  padding-top: 2rem;
  font-size: 3rem;
  font-family: "Roboto";
  text-shadow: 1px 1px 1px rgb(34, 89, 214);
  color: ${props => props.color ? props.color : ''};

  @media(max-width: 510px) { font-size: 2rem; }
`;

const SubTitle = styled.p`
  font-size: 1.5rem;
  font-family: "Roboto";
  font-weight: 500;
  letter-spacing: 5px;
  color: ${props => props.color ? props.color : ''};

  @media(max-width: 470px) {
    font-size: 1rem;
    letter-spacing: 1px;
  }
`;

const ButtonLanguage = styled.button`
    cursor: pointer;
    font-size: 1.5rem;
    margin: 0rem 0rem 0rem 0rem;
    background-color: rgba(255, 255, 255, 0.0);
    border: none;
    height: 7.5vh;
    width: 5rem;
    padding: 0.2rem 0.5rem 0rem 0.5rem;
`;


const ImgIcon = styled(Image)`
    cursor: pointer;
    width: 78%;
    height: 87%;
    border: 2px solid #444;
    border-radius: 50%;
    box-shadow: ${props => props.isSelected ? 
      '3px 10px 20px rgb(34, 89, 214), -1px -1px 40px rgb(160, 62, 177)' : ''};
`;

const MainComponent = props => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeLang = (lang) => {
    console.log(lang);
    props.changeLanguage(lang);
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
        <Main>
            <div>
                <ButtonLanguage type="button" onClick={handleOpen}>
                    {/* <ImageWrapper> */}
                        <ImgIcon 
                            src={props.language === 'Portuguese' ? "/assets/brazil.png" : "/assets/united-states.png" } 
                            width={90}
                            height={80}
                            // layout='fill'
                        />
                    {/* </ImageWrapper> */}
                </ButtonLanguage>
            </div>
            <CardModal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <Content>
                        <Title color="#373F3F">
                            {props.language === "English" ? <>Select the language:</> 
                                : <>Selecione o idioma:</>}
                        </Title>
                        <Select>
                            <Option>
                                <ImageWrapper
                                    isSelected={props.language === 'Portuguese' ? true : false}
                                    onClick={() => changeLang("Portuguese")}
                                >       
                                    <Img
                                        src={"/assets/brazil.png"}
                                        alt="Brazil"
                                        width={96}
                                        height={96}
                                    />
                                </ImageWrapper>
                                <SubTitle color="#217B2C">PORTUGUÊS</SubTitle>
                            </Option>
                            <Option>
                                <ImageWrapper
                                    isSelected={props.language === 'English' ? true : false}
                                    onClick={() => changeLang("English")}
                                >
                                    <Img
                                        src={"/assets/united-states.png"}
                                        alt="United_State"
                                        width={90}
                                        height={90}
                                    />
                                </ImageWrapper>
                                <SubTitle color="#1D0072">ENGLISH</SubTitle>
                            </Option>
                        </Select>
                    </Content>
                </Fade>
            </CardModal>
            <Card>
                <CardHeader />
                <CardBody />
                <CardFooter />
            </Card>
        </Main>
    );
};

const mapStateToProps = state => ({ language: state.language.language });

const mapDispatchToProps = dispatch => bindActionCreators({ changeLanguage }, dispatch);

const Index = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

export default Index;
