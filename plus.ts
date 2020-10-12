#!/bin/node
import { cliConfig } from "./CLIConfig"
import { nickname } from "./ContractAPI"
import { options } from "./CLIOptions"
import { CommandLineArgs, ShowHelpPage } from "./util/CommandLineArgs"
/*+import { OptionDeclaration } from "./util/CommandLineArgs"+*/
import * as color from "./util/color"
import { ExtensionAPI } from "./ExtensionAPI"
import { saveConfig } from "./util/saveConfig"

// default accountId
options.accountId.value = cliConfig.userAccount

// process command line args
const args = new CommandLineArgs(options /*+as unknown as Record<string,OptionDeclaration>+*/)

// command is the 1st positional argument
const command = args.getCommand()

// Show config info if requested
// Set config if requested
if (options.cliConfig.value) {
    saveConfig(options.accountId.value, options.contractName.value)
    process.exit(0)
}
if (options.info.value) {
    console.log(`config.js:`)
    console.log(`  Your account    : ${color.yellow}${cliConfig.userAccount}${color.normal}`)
    console.log(`  Contract account: ${color.yellow}${cliConfig.contractAccount}${color.normal}`)
    process.exit(0)
}

// TODO configure
// if (command=="configure") {
//     args.requireOptionString(options.accountId,"default account Id")
//     process.exit(0);
// }

// -------------------
// PROCESS COMMAND //
// -------------------

// get contract API + Extensions
const API = new ExtensionAPI()

// check the command is in the API
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (command && typeof (API /*+as any+*/)[command] !== "function") {
    color.logErr("unknown command " + color.yellow + command + color.normal)
    console.log(`${nickname} --help to see a list of commands`)
    process.exit(1)
}

// Show help if requested or if no command
if (options.help.value || !command) {
    ShowHelpPage(command, API /*+as unknown as Record<string,unknown>+*/, options /*+as unknown as Record<string,OptionDeclaration>+*/)
    process.exit(0)
}

// call the contract API function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(API /*+as any+*/)[command](args)
