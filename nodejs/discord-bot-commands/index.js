//AWS NodeJS Lambda Handler
require('dotenv').config()
const axios = require('axios').default;

const SLASH_COMMAND = 1
const USER_COMMAND = 2
const APPLICATION_COMMAND = 3
let DISCORD_API = `https://discord.com/api/v10/applications/${process.env.APP_ID}/guilds/${process.env.GUILD_ID}/commands`

const headers = {
  "Authorization": `Bot ${process.env.BOT_TOKEN}`,
  "Content-Type": "application/json"
}

//name: the name of command
//type: the type of command (1: slash, 2: user, 3: Application)
function CreateGuildCommand(commandData) {
  console.log("CreateGuildCommand:START")
  console.log(commandData)
  let url = DISCORD_API

  axios.post(url, JSON.stringify(commandData), {
    headers: headers,
  }).then(response => {
    //console.log(response)
    return response
  })
  console.log("CreateGuildCommand:END")

}

//returns list of guild application commands
async function GetGuildApplicationCommands() {
  let url = DISCORD_API
  return await axios.get(url, {
    headers: headers,
  }).then(response => {
    //console.log(response.data)
    return response
  })

}

async function GetGuildCommandByName(findName) {
  let url = DISCORD_API
  return await axios.get(url, {
    headers: headers,
  }).then(response => {
    commandsList = response.data
    //console.log(commandsList)
    for(var key in commandsList) {
      //console.log("key:"+key+", value:"+ JSON.stringify(commandsList[key]));
      if(commandsList[key].name == findName){
        //console.log("Found matching command:" + commandsList[key].name + ", ID: " + commandsList[key].id)
        return commandsList[key].id
      }
   }
  })

}

//pass in command ID to edit
function EditGuildApplicationCommands(command_id, commandData) {

  let url = DISCORD_API + `/${command_id}`

  axios.patch(url,JSON.stringify(commandData), {
    headers: headers,
  }).then(response => {
    //console.log(response)
    return response
  })

}

//delete a command
function DeleteGuildApplicationCommands(command_id) {

  let url = DISCORD_API + `/${command_id}`

  axios.delete(url, {
    headers: headers,
  }).then(response => {
    //console.log(response)
    return response
  })
}
  


exports.handler = async (event, context) => {

};


//UNCOMMENT FOR TESTING:
/* 
var event
exports.handler(event).then(result => {
  console.log(result)
});
*/
