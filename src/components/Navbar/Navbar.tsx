import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IStateRedux } from '../../redux/store';
import { ILanguage } from '../../redux/action';
import { NextPage } from 'next';

interface INavbarComponentProps {
    language: ILanguage,
}

const Navbar = styled.nav`
    width: 100%;
    background: linear-gradient(150deg, #0A210C, #08415C);
    height: 12vh;
    box-shadow: 0px -3px 10px #adaa0d;
    top: 0;
    padding: 0 5rem 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    
    @media(max-width: 590px) {
        padding: 0 1rem 0 0;
    }
`;

const Title = styled.h1`
    margin: 0;
    color: rgba(0, 0, 0, 0.1);
    text-shadow: 1px -1px 0px #D6FFD9, -1px 1px 4px #1FB836, -1px 4px 5px #1F85B8;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    height: 100%;
`;

const ComeBack = styled.a`
    transition: 1s;
    text-decoration: none;
    font-size: 1.3rem;
    border: 1.5px solid #fdfde5;
    border-radius: 5px;
    color: #fdfde5;
    padding: 2px 10px;
    cursor: pointer;

    &:hover {
        transition: 1s;
        background-color: rgba(253, 253, 229, 0.5);
    }
`;

const Img = styled(Image)`
`;

const ImageWrapper = styled.div`
    width: 15vw;
    height: 100%;
    margin: 0 2rem;

    @media(max-width: 590px) {
        width: 33vw;
        margin: 0 0.5rem 0 0;
    }
`;

const NavbarComponent: NextPage<INavbarComponentProps> = ({ language }) => {
    return (
        <header>
            <Navbar className="navbar">
                <Title>
                    <ImageWrapper>
                        <Img 
                            src={"/assets/javascript.jpg"} 
                            alt="Code" 
                            width={200}
                            height={90}
                        />
                    </ImageWrapper>
                    Web Developer
                </Title>
                <Link href="/" passHref>
                    <ComeBack>
                        {language === 'English' ? <>Back</> : <>Voltar</>}
                    </ComeBack>
                </Link>
            </Navbar>
        </header>
    );
}

const mapStateToProps = (state: IStateRedux) => ({ language: state.language.language });;

export default connect(mapStateToProps)(NavbarComponent);