const config = require("./config.json");
const { Select , Toggle} = require("enquirer");
const cloudflare = require("cloudflare");
const process = require("process");
process.removeAllListeners("warning");
const Mainprompt = new Select({
  name: "Main Menu",
  message: "Choose a menu item",
  choices: [
    {
      message: "1 - View DNS Entries",
      name: "1",
      value: "1",
    },
    {
      message: "2 - Test Credentials",
      name: "2",
      value: "2",
    },
    {
      message: "3 - Run Cleanup",
      name: "3",
      value: "3",
    },
    {
      message: "4 - Exit",
      name: "4",
      value: "4",
    },
  ],
});
const Continueprompt = new Toggle({
    message: "Return to main menu?",
    enabled: "Y",
    disabled: "N"
})
var cf = new cloudflare({
  token: config.api_token,
});

function ViewDns() {
  console.info("View Function Not implememnted");
  ShowStartMenu();
  return;
}

function TestCreds() {
  cf.console.info("Test Function Not implememnted");
  ShowStartMenu();
  return;
}

function RunCleaning() {
  console.info("Cleanup Function Not implememnted");
  ShowStartMenu();
  return;
}

function Exit() {
  console.info("Application now exiting");
  process.exit(0);
  return;
}


function ContinueRouter(answer) {
    
}

function MenuRouter(answer) {
  //console.log(parseInt(answer));
  switch (parseInt(answer)) {
    case 1:
      ViewDns();
      break;
    case 2:
      TestCreds();
      break;
    case 3:
      RunCleaning();
      break;
    case 4:
      Exit();
      break;
  }
}

function ShowStartMenu() {
    console.clear()
  Mainprompt.run().then((answer) => MenuRouter(answer));
}
//console.clear()
ShowStartMenu();
