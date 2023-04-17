import React, { FunctionComponent as FC } from "react";
import { toast, ToastContainer } from "react-toastify";

import { recognition } from "../../APIs/speechRecognitionAPI";

import { Button } from "../Button/Button";

import "react-toastify/dist/ReactToastify.css";
import "./InitializeVoiceControls.css";
import { IVoiceCommandsProps } from "../../interfaces";
import { checkCommandType, ICommandType } from "../../methods/checkCommandType";
import VoiceControlsInstructionTable from "../VoiceControlsInstructionTable/VoiceControlsInstructionTable";
import MicrophoneIcon from "../Icons/MicrophoneIcon";
import MicrophoneIconSlash from "../Icons/MicrophoneIconSlash";
import CommandListIcon from "../Icons/CommandListIcon";
import detectRoutes from "../../methods/detectRoutes";
import domToJson from "../../methods/domToJson";
import useSpeechSynthesis from "../../../hooks/useSpeechSynthesis";

interface InitializeVoiceControlsProps {
  commands: IVoiceCommandsProps;
  enableNavigationControls: boolean;
  enableScrollingControls: boolean;
}

export const InitializeVoiceControls: FC<InitializeVoiceControlsProps> = ({
  commands = {
    navigation: [],
    scrolling: [],
  },
  enableNavigationControls = false,
  enableScrollingControls = false,
}) => {
  const [isListening, setIsListening] = React.useState<boolean>(false);
  const [isInstructionTableOpened, setIsInstructionTableOpened] =
    React.useState<boolean>(false);
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] =
    React.useState<boolean>(false);
  const [routes, setRoutes] = React.useState<string[]>([]);
  const [domJSON, setDomJSON] = React.useState<any>();
  const [text, setText] = React.useState<string>("");
  const [gretted, setGretted] = React.useState<boolean>(false);

  const { speak, speaking, supported } = useSpeechSynthesis({
    callbackFunctions: [setText, setGretted],
    states: [gretted],
  });

  // useEffect(() => {
  //   if (!isSpeaking) {
  //     setIsSpeaking(false);
  //     // setTimeout(() => setText(""), 5000);
  //   }
  // }, [speaking]);

  const maxScroll =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const startRecognition = (): void => {
    recognition.start();
    toast.info("Started Listening Commands!");
    setText("Started Listening Commands!");
    speak({
      text: "Started Listening Commands!",
    });
    setIsListening(true);
    if (window.localStorage) {
      localStorage.setItem("isListening", "true");
    }
  };

  const stopRecognition = (): void => {
    recognition.stop();
    toast.info("Stopped Listening Commands!");
    setText("Stopped Listening Commands!");
    speak({
      text: "Stopped Listening Commands!",
    });
    setIsListening(false);
    if (window.localStorage) {
      localStorage.removeItem("isListening");
    }
  };

  recognition.onstart = (): void => {
    console.log("Voice commands activated.");
  };

  recognition.onresult = (event: any): void => {
    const command: string = event.results[0][0].transcript.replace(".", "");
    const { commandType, cmd, cmdName }: ICommandType = checkCommandType(
      commands,
      command
    );

    // console.log({ commandType, cmd, cmdName });
    //stop taking commands

    if (isListening && command.toLowerCase().includes("stop taking commands")) {
      stopRecognition();
      return;
    }

    // open commands table commands
    if (
      isListening &&
      (command.toLowerCase().includes("open commands table") ||
        command.toLowerCase().includes("open command table") ||
        command.toLowerCase().includes("open instruction table") ||
        command.toLowerCase().includes("close command table") ||
        command.toLowerCase().includes("close instruction table") ||
        command.toLowerCase().includes("close commands table"))
    ) {
      if (
        command.toLowerCase().includes("open commands table") ||
        command.toLowerCase().includes("open command table") ||
        command.toLowerCase().includes("open instruction table")
      ) {
        if (!isInstructionTableOpened) {
          setIsInstructionTableOpened(true);
          toast.info("Opened Commands Table!");
          setText("Opened Commands Table!");
          speak({
            text: "Opened Commands Table!",
          });
        } else {
          toast.info("Commands Table is already opened!");
          toast.info("Try, Close Commands Table Command");
          speak({
            text: "Commands Table is already opened!, Try, Close Commands Table Command",
          });
          setText(
            "Commands Table is already opened!, Try, Close Commands Table Command"
          );
        }
      }

      if (
        command.toLowerCase().includes("close command table") ||
        command.toLowerCase().includes("close instruction table") ||
        command.toLowerCase().includes("close commands table")
      ) {
        if (isInstructionTableOpened) {
          setIsInstructionTableOpened(false);
          toast.info("Closed Commands Table!");
          setText("Closed Commands Table!");
          speak({
            text: "Closed Commands Table!",
          });
        } else {
          toast.info("Commands Table is already closed!");
          toast.info("Try, Open Commands Table Command");
          setText(
            "Commands Table is already closed!, Try, Open Commands Table Command"
          );
          speak({
            text: "Commands Table is already closed!, Try, Open Commands Table Command",
          });
        }
      }
    }

    // navigation commands
    if (enableNavigationControls) {
      if (commandType === "navigation") {
        if (routes.length > 0) {
          let route: string = "";
          if (commands.navigation?.includes(cmdName.toLowerCase())) {
            if (command.split(" ")[command.split(" ").length - 1] === "page") {
              route = cmd.split(" ")[cmd.split(" ").indexOf("page") - 1];
            }
            if (command.split(" ")[command.split(" ").length - 1] === "route") {
              route = cmd.split(" ")[cmd.split(" ").indexOf("route") - 1];
            }

            if (route && route !== "") {
              if (route === "home" || route === "index") {
                window.location.href = "/";
                return;
              }

              if (routes.includes("#" + route)) {
                // bring #+ route to top
                document.querySelectorAll("a").forEach((a) => {
                  if (a.getAttribute("href") === "#" + route) {
                    a.click();
                  }
                });
                return;
              }

              if (routes.includes("/" + route)) {
                window.location.href = "/" + route;
                return;
              } else {
                toast.error("This route is not available!");
                speak({
                  text: "This route is not available!",
                });
                setText("This route is not available!");
                return;
              }
            }
          }
        } else {
          toast.error("There are no routes available!");
          speak({
            text: "There are no routes available!",
          });
          setText("There are no routes available!");
        }
      }
    }

    // scrolling commands
    if (enableScrollingControls) {
      if (commandType === "scrolling") {
        if (commands.scrolling?.includes(cmdName.toLowerCase())) {
          if (cmdName === "scroll to top" || cmdName === "move to top") {
            window.scrollTo(0, 0);
            setText("Scrolled to top!");
            speak({
              text: "Scrolled to top!",
            });
            return;
          }
          if (cmdName === "scroll to bottom" || cmdName === "move to bottom") {
            window.scrollTo(0, maxScroll);
            setText("Scrolled to bottom!");
            speak({
              text: "Scrolled to bottom!",
            });
            return;
          }
          if (cmdName === "scroll to middle" || cmdName === "move to middle") {
            window.scrollTo(0, maxScroll / 2);
            setText("Scrolled to middle of the page!");
            speak({
              text: "Scrolled to middle of the page!",
            });
            return;
          }

          if (cmdName === "scroll down" || cmdName === "move down") {
            window.scrollBy(0, 100);
            setText("Scrolled down by 100 pixels!");
            speak({
              text: "Scrolled down by 100 pixels!",
            });
            return;
          }

          if (cmdName === "scroll up" || cmdName === "move up") {
            window.scrollBy(0, -100);
            setText("Scrolled up by 100 pixels!");
            speak({
              text: "Scrolled up by 100 pixels!",
            });
            return;
          }

          if (
            command.toLowerCase().includes("px") ||
            command.toLowerCase().includes("pixels") ||
            command.toLowerCase().includes("pixel") ||
            command.toLowerCase().includes("%") ||
            command.toLowerCase().includes("percent") ||
            command.toLowerCase().includes("percentage")
          ) {
            const px_per: number =
              Number(
                command.split(" ")[command.split(" ").indexOf("px") - 1]
              ) ||
              Number(
                command.split(" ")[command.split(" ").indexOf("pixels") - 1]
              ) ||
              Number(
                command.split(" ")[command.split(" ").indexOf("pixel") - 1]
              ) ||
              Number(command.split(" ")[command.split(" ").indexOf("%") - 1]) ||
              Number(
                command.split(" ")[command.split(" ").indexOf("percent") - 1]
              ) ||
              Number(
                command.split(" ")[command.split(" ").indexOf("percentage") - 1]
              );
            console.log(command);
            if (command.toLowerCase().includes("by")) {
              window.scrollBy(0, px_per);
              setText(
                "Scrolled by " +
                  px_per +
                  `${
                    command.toLowerCase().includes("px") ||
                    command.toLowerCase().includes("pixels") ||
                    command.toLowerCase().includes("pixel")
                      ? " pixels!"
                      : "percentage!"
                  }`
              );
              speak({
                text:
                  "Scrolled by " +
                  px_per +
                  `${
                    command.toLowerCase().includes("px") ||
                    command.toLowerCase().includes("pixels") ||
                    command.toLowerCase().includes("pixel")
                      ? " pixels!"
                      : "percentage!"
                  }`,
              });
              return;
            }
            if (command.toLowerCase().includes("to")) {
              window.scrollTo(0, px_per);
              setText("Scrolled to " + px_per + " pixels!");
              speak({
                text: "Scrolled to " + px_per + " pixels!",
              });
              return;
            }
          }
        }
      }
    }
  };

  recognition.onend = (): void => {
    if (isListening) {
      recognition.start();
      if (window.localStorage) {
        localStorage.setItem("isListening", "true");
      }
    } else {
      console.log("Voice recognition deactivated.");

      recognition.stop();
      if (window.localStorage) {
        localStorage.removeItem("isListening");
      }
    }
  };

  React.useEffect(() => {
    if ("speechRecognition" in window || "webkitSpeechRecognition" in window) {
      setIsSpeechRecognitionSupported(true);
    } else {
      setIsSpeechRecognitionSupported(false);
      alert("Speech Recognition is not available on this browser!");
      alert("Please switch to Chromium based browsers or Safari!");
    }

    if (window.localStorage) {
      if (localStorage.getItem("isListening")) {
        setIsListening(true);
        startRecognition();
      }
    }
  }, []);

  React.useEffect(() => {
    // window.addEventListener("DOMContentLoaded", () => {
    //   console.log("DOMContentLoaded event fired!");
    // });
    const domJSON = domToJson(document.body);
    setDomJSON(domJSON);
    const allRoutes = detectRoutes(domJSON);
    setRoutes(allRoutes);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  return (
    <>
      <ToastContainer />

      {isInstructionTableOpened && isSpeechRecognitionSupported && (
        <VoiceControlsInstructionTable
          commands={commands}
          enableNavigationControls={enableNavigationControls}
          enableScrollingControls={enableScrollingControls}
          setIsInstructionTableOpened={setIsInstructionTableOpened}
          routes={routes}
          startRecognition={startRecognition}
          isListening={isListening}
        />
      )}

      {isSpeechRecognitionSupported && (
        <div className="initialize-voice-controls-box-layer">
          <div
            className={`${
              text && speaking ? "microphone-icon" : "micro-icon"
            } relative`}
            data-text={text}
          >
            <Button
              className={`icon-button ${
                isListening ? "button-unmute" : "button-mute"
              }`}
              FaIcon={() =>
                isListening ? <MicrophoneIcon /> : <MicrophoneIconSlash />
              }
              onClick={() => {
                isListening ? stopRecognition() : startRecognition();
              }}
            />
            <p className="speech-text"></p>
          </div>
          <Button
            className={`icon-button ${
              isInstructionTableOpened ? "button-unmute" : "button-mute"
            }`}
            FaIcon={() => <CommandListIcon />}
            onClick={() => {
              setIsInstructionTableOpened(!isInstructionTableOpened);
              toast.info(
                isInstructionTableOpened
                  ? "Closed Instruction Table"
                  : "Opened Instruction Table"
              );
            }}
          />
        </div>
      )}
    </>
  );
};

export default InitializeVoiceControls;
