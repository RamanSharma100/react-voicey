declare global {
  interface Window {
    speechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

if (typeof window !== "undefined") {
  window.speechRecognition =
    window.speechRecognition || window.webkitSpeechRecognition;
}

const speechRecognition =
  (window as any).speechRecognition ||
  (window as any).webkitSpeechRecognition ||
  null;

export const recognition = speechRecognition ? new speechRecognition() : null;
