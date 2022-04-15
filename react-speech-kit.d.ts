interface IISpeechSynthesisSpeak {
    text: string, 
    voice?: SpeechSynthesisVoice,
    onEnd?: any,
    rate?: number,
    volume?: number,
    pitch?: number,
}

interface ISpeechSynthesis {
    speak: (params: IISpeechSynthesisSpeak) => void,
    voices: SpeechSynthesisVoice[],
    speaking: boolean,
    cancel: () => void,
}

declare module "react-speech-kit" {
    export function useSpeechSynthesis(): ISpeechSynthesis
};