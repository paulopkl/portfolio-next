import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeMute, IoMdVolumeOff } from "react-icons/io";
import { connect } from "react-redux";
import { useSpeechSynthesis } from "react-speech-kit";
import styled, { css } from "styled-components";
import { ILanguage } from "../redux/action";
import { IStateRedux } from "../redux/store";
import speaks from "./speaks.json";

interface ISpeakerProps {
    language: ILanguage,
}

const createAnimation = () => {
    let styles = "";
    let colors: string[] = ["red", "blue", "#bdbd16", "orange", "red", "blue", "#bdbd16", "orange", "red"];

    for (let i = 0; i <= 4; i++) {
        styles += `
            ${i * 25}% {
                box-shadow: 2px 2px 4px ${colors[i + 2]}, -2px -2px 4px ${colors[i + 0]}, 2px -2px 4px ${colors[i + 1]}, -2px 2px 4px ${colors[i + 3]};
                border-top-color: ${colors[i + 0]};
                border-right-color: ${colors[i + 1]};
                border-bottom-color: ${colors[i + 2]};
                border-left-color: ${colors[i + 3]};
            }
        `;
    }

    return css`${styles}`;
}

const everythingLined = (justified: boolean = false, alined: boolean = false) => {
    let style = " display: flex; ";

    if (justified) style += " justify-content: center; ";
    if (alined) style += " align-items: center; ";

    return css`${style}`;
}

const SpeakerBox = styled.div`
    position: fixed;
    right: 25px;
    bottom: 60px;
    height: 100px;
    width: 200px;
    border: 1px solid black;
    border-radius: 25px;
    background-color: rgb(232, 231, 250);
    ${everythingLined(true)}
    flex-direction: column;
    animation: BorderRGB 3s infinite;
    border: 1px solid;
    
    @keyframes BorderRGB {
        ${createAnimation()};
    }
`;

const FillPauseCircle = styled(AiFillPauseCircle)`
    font-size: 26pt;
    cursor: pointer;
    border-radius: 50px;
    
    &:hover {
        box-shadow: 0px 0px 2px rgba(0, 0, 0);
    }
`;

const Range = styled.input`
    overflow: hidden;
    display: block;
    appearance: none;
    margin: 0;
    cursor: pointer;
    width: 50px;
    background-color: rgb(232, 231, 250);

    &:focus {
        outline: none;
    }
    
    &::-moz-range-progress {
        width: 30%;
        height: 6px;
        border-radius: 5px;
        background: #6981eb;
    }

    &::-moz-range-track {
        height: 6px;
        background: #bdc9ff;
        border-radius: 5px;
    }

    &::-moz-range-thumb {
        width: 5px;
        border-radius: 2px;
        background: #000000;
    };
`;

const SpeedContainer = styled.div`
    ${everythingLined(false, true)}
    justify-content: space-around;
    flex-direction: column;
    height: 30px;
`;

const CardBody = styled.div`
    ${everythingLined()}
    justify-content: space-around;
`;

const VolumeContainer = styled.div`
    ${everythingLined(false, true)}
    justify-content: space-around;
    flex-direction: column;
`;

const RateText = styled.p`
    ${everythingLined(true)}
    cursor: pointer;
    margin: 0;
    width: 35px;
`;

const TextSubTitle = styled.p`
    font-size: 13pt;
    cursor: pointer;
    margin-top: 0;
    text-align: center;
    text-decoration: underline;
`;

const FillPlayCircle = styled(AiFillPlayCircle)`
    font-size: 26pt;
    cursor: pointer;
    border-radius: 50px;
    
    &:hover {
        box-shadow: 0px 0px 2px rgba(0, 0, 0);
    }
`;

const VolumeHigh = styled(IoMdVolumeHigh)` font-size: 20pt; cursor: pointer; `;
const VolumeOff = styled(IoMdVolumeOff)` font-size: 20pt; cursor: pointer; `;
const VolumeLow = styled(IoMdVolumeLow)` font-size: 20pt; cursor: pointer; `;
const VolumeMute = styled(IoMdVolumeMute)` font-size: 20pt; cursor: pointer; `;

const Speaker: NextPage<ISpeakerProps> = ({ language }) => {
    const [playing, setPlaying] = useState<boolean>(false);
    const [rate, setRate] = useState<number>(1);
    const [volume, setVolume] = useState<number>(1);

    const { speak, voices, speaking, cancel } = useSpeechSynthesis();

    useEffect(() => {
        cancel();
        setRate(1);
        setVolume(1);
    }, [language]);

    useEffect(() => {
        if (!speaking) {
            setPlaying(false);
        }
    }, [speaking]);

    const onPlaySpeaker = () => {
        if (window.speechSynthesis.speaking) {
            if (window.speechSynthesis.paused) window.speechSynthesis.resume();
            else window.speechSynthesis.pause();

            return setPlaying(!playing);;
        }

        let voiceToBeUsed = voices.find((v: any) => {
            if (language === "English") return v.lang == "en-US";
            else if (language === "Portuguese") return v.lang == "pt-BR";
        });

        if (voiceToBeUsed) {
            speak({ 
                text: speaks[language],
                voice: voiceToBeUsed,
                rate: rate,
                volume: volume,
            });

            setPlaying(!playing);
        }
    }
    
    const onPauseSpeaker = () => {
        window.speechSynthesis.pause();

        setPlaying(!playing);
    }
    
    const onChangeRate = () => {
        if (rate == 2) setRate(0.25);    
        else setRate(rate + 0.25);

        if (window.speechSynthesis.speaking) {
            cancel();
            setPlaying(false);
        }
    }
    
    const onChangeVolume = (ev: ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(ev.target.value));

        if (window.speechSynthesis.speaking) {
            cancel();
            setPlaying(false);
        }
    }

    const changeVolume = (volume: number) => {
        setVolume(volume);

        if (window.speechSynthesis.speaking) {
            cancel();
            setPlaying(false);
        }
    }

    return (
        <SpeakerBox>
            <TextSubTitle>
                {language === "English" ? "Spoken resume" : "Currículo falado"}.
            </TextSubTitle>
            <CardBody>
                <VolumeContainer>
                    <Range type="range" name="volume" value={volume} min={0} max={1} step={0.1} onChange={onChangeVolume} />  
                    {volume == 0
                            ? <VolumeOff onClick={() => changeVolume(1)} />
                            : volume > 0.7 
                                ? <VolumeHigh onClick={() => changeVolume(0)} />
                                : volume > 0.4 
                                    ? <VolumeLow onClick={() => changeVolume(0)} />
                                    : <VolumeMute onClick={() => changeVolume(0)} />}
                </VolumeContainer>
                {playing ? <FillPauseCircle onClick={onPauseSpeaker} /> : <FillPlayCircle onClick={onPlaySpeaker} />}
                <SpeedContainer>
                    <span>Vel.</span>    
                    <RateText onClick={onChangeRate}>
                        {rate.toFixed(2)[rate.toFixed(2).length -1] == "0" ? rate.toFixed(1) : rate.toFixed(2)}x
                    </RateText>
                </SpeedContainer>
            </CardBody>
        </SpeakerBox>
    );
}


const mapStateToProps = (state: IStateRedux) => ({ language: state.language.language });
// const mapDispatchToProps = () => ({ changeLanguage });

export default connect(mapStateToProps, {})(Speaker);