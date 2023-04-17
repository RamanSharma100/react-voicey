import {
  DEFAULT_NAVIGATION_COMMANDS,
  DEFAULT_SCROLLING_COMMANDS,
} from "../constants";

export interface ICommandType {
  commandType: string;
  cmd: string;
  cmdName: string;
}

export const checkCommandType = (
  commandsList: any,
  command: string
): ICommandType => {
  let cmdName: string = "",
    cmdType: string = "";
  commandsList.scrolling = [
    ...new Set([
      ...DEFAULT_SCROLLING_COMMANDS,
      ...(commandsList.scrolling || []),
    ]),
  ];
  commandsList.navigation = [
    ...new Set([
      ...DEFAULT_NAVIGATION_COMMANDS,
      ...(commandsList.navigation || []),
    ]),
  ];
  const keys: string[] = Object.keys(commandsList);

  for (let i in keys) {
    const cType: string = keys[i];

    const commandName = commandsList[cType.toLowerCase()].find(
      (cmd: string) => command.toLowerCase().includes(cmd.toLowerCase()) && cmd
    );

    if (commandName && cType) {
      cmdType = cType;
      cmdName = commandName;
    } else {
      continue;
    }
  }

  return {
    commandType: cmdType,
    cmd: command,
    cmdName,
  };
};
