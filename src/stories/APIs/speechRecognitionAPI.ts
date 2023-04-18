declare global {
  interface Window {
    speechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const speechRecognition =
  (window as any).speechRecognition ||
  (window as any).webkitSpeechRecognition ||
  null;

export const recognition = speechRecognition ? new speechRecognition() : null;
