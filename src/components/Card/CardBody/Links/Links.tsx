import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { FaPaperclip } from 'react-icons/fa';
import { SiWhatsapp } from 'react-icons/si';
import { FiInstagram } from 'react-icons/fi';
import { GrLinkedinOption } from 'react-icons/gr';
import { GoMarkGithub } from 'react-icons/go';
import { HiDocumentReport } from 'react-icons/hi';
import { ILanguage } from '../../../../redux/action';
import { IStateRedux } from '../../../../redux/store';

interface ILinksProps {
    language: ILanguage,
}

const ListLinks = styled.ul`
    display: flex;
    margin: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0;

    @media(max-width: 420px) {
        margin: 0;
        justify-content: space-around;
    }
`;

const ListOption = styled.li`
    list-style: none;
    margin: 0rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(max-width: 380px) {
        width: 60px;
    }

    @media(max-width: 530px) {
        width: 25%;
    }
    
    @media(max-width: 510px) {
        width: 20%;
    }
`;

const ClipsIcon = styled(FaPaperclip)`
    transition: 0.5s;
    background: linear-gradient(45deg, rgb(37, 75, 199), rgb(2, 68, 167));
    box-shadow: 1px 4px 20px  rgb(37, 75, 199);
    color: white;
    padding: 12px;
    border-radius: 40%;
    margin: 1.25rem 0;

    &:hover {
        transition: 0.7s;
        margin-top: -5px;
        width: 60px;
        height: 60px;
        cursor: pointer;
    }
`;

const WhatssapIcon = styled(SiWhatsapp)`
    transition: 0.5s;
    background: linear-gradient(45deg, rgb(73, 170, 64), rgb(7, 129, 103));
    box-shadow: 1px 4px 20px rgb(99, 230, 87);
    color: white;
    padding: 12px;
    border-radius: 40%;
    margin: 1.25rem 0;

    &:hover {
        transition: 0.7s;
        margin-top: -5px;
        width: 60px;
        height: 60px;
        cursor: pointer;
    }
`;

const InstaIcon = styled(FiInstagram)`
    transition: 0.5s;
    background: linear-gradient(45deg, rgb(63, 80, 180), rgb(228, 41, 228), rgb(228, 41, 41));
    box-shadow: 1px 4px 20px rgb(139, 67, 180);
    color: white;
    padding: 12px;
    border-radius: 40%;
    margin: 1.25rem 0;

    &:hover {
        transition: 0.7s;
        margin-top: -5px;
        width: 60px;
        height: 60px;
        cursor: pointer;
    }
`;

const InIcon = styled(GrLinkedinOption)`
    transition: 0.5s;
    background: linear-gradient(45deg, rgb(67, 101, 211), rgb(26, 57, 196));
    box-shadow: 1px 4px 20px rgb(67, 101, 211);
    color: white;
    padding: 12px;
    border-radius: 40%;
    margin: 1.25rem 0;

    &:hover {
        transition: 0.7s;
        margin-top: -5px;
        width: 60px;
        height: 60px;
        cursor: pointer;
    }
`;

const GitIcon = styled(GoMarkGithub)`
    transition: 0.5s;
    background: linear-gradient(45deg, rgb(77, 77, 77), rgb(136, 136, 136));
    box-shadow: 1px 4px 20px rgb(136, 136, 136);
    color: white;
    padding: 12px;
    border-radius: 40%;
    margin: 1.25rem 0;

    &:hover {
        transition: 0.7s;
        margin-top: -5px;
        width: 60px;
        height: 60px;
        cursor: pointer;
    }
`;

const CurrIcon = styled(HiDocumentReport)`
    transition: 0.5s;
    background: linear-gradient(45deg, rgb(85, 85, 87), rgb(14, 39, 77));
    box-shadow: 1px 4px 20px rgb(85, 85, 87);
    color: white;
    padding: 12px;
    border-radius: 40%;
    margin: 1.25rem 0;

    &:hover {
        transition: 0.7s;
        margin-top: -5px;
        width: 60px;
        height: 60px;
        cursor: pointer;
    }
`;

const Links: NextPage<ILinksProps> = ({ language }) => {

    // const moveScroll = () => {
    //     document.documentElement.scrollTop = 0;
    // }

    return (
        <ListLinks>
            <ListOption>
                {/* <Link href="/Main" passHref> */}
                    <ClipsIcon size="50" />
                {/* </Link> */}
                Portifólio
            </ListOption>
            <ListOption>
                <a 
                    href="https://api.whatsapp.com/send?1=pt_BR&phone=5519983781727" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <WhatssapIcon size="50" />
                </a>
                Whatsapp
            </ListOption>
            <ListOption>
                <a 
                    href="https://www.instagram.com/paulo.ricardo.167189/" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                        <InstaIcon size="50" />
                </a>
                Instagram
            </ListOption>
            <ListOption>
                <a 
                    href="https://www.linkedin.com/in/pauloricardoalvesdealmeida" 
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <InIcon size="50" />
                </a>
                Linkedin
            </ListOption>
            <ListOption>
                <a 
                    href="https://github.com/paulopkl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <GitIcon size="50" />
                </a>
                Github
            </ListOption>
            <ListOption>
                <a 
                    href={language === "English"
                        ? "https://drive.google.com/file/d/10fqd9E9bn2xlZk1BP6i9H6KdqucKiiEn/view?usp=sharing"
                        : "https://drive.google.com/file/d/1Aj2PQNFAWB1w4-gGA3Oii0tXBnUPOJy1/view?usp=sharing"}
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <CurrIcon size="50"  />
                </a>
                Curriculum
            </ListOption>
        </ListLinks>
    );
}

const mapStateToProps = (state: IStateRedux) => ({ language: state.language.language });

export default connect(mapStateToProps, {})(Links);