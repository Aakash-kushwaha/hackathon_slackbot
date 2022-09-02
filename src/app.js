import { RTMClient }  from '@slack/rtm-api'
import { SLACK_OAUTH_TOKEN, BOT_SPAM_CHANNEL } from './constants'
import  { WebClient } from '@slack/web-api';
const packageJson = require('../package.json')

const rtm = new RTMClient(SLACK_OAUTH_TOKEN);
const web = new WebClient(SLACK_OAUTH_TOKEN);

rtm.start()
  .catch(console.error);

rtm.on('ready', async () => {
    console.log('Chitti 2.0 started')
    sendMessage(BOT_SPAM_CHANNEL, `Chitti 2.0 is online.`)
})

rtm.on('slack_event', async (eventType, event) => {
    // console.log(event)

    if (event && event.type === 'message'){
        if (event.text === 'hello') {
            hello(event.channel, event.user ,` how is your day`)
        }
    }

   if (event && event.type === 'user_typing'){
        hello(event.channel, event.user ,"seems like you have intersting in mind")
    
}

    if (event && event.type === 'member_joined_channel' || event && event.type === 'user_profile_changed' ){
            hello(event.channel, event.user ," I'm Chitti the Robot. Speed 1 terahertz, memory 1 zigabyte. ")
        
    }

  if (event && event.type === 'message'){
        if (event.text.split(" ").includes("code") && event.text.split(" ").includes("send")) {
            hello(event.channel, event.user ,`Do not encourage plagirism `)
        }
    }

    if (event && event.type === 'message'){
        if (event.text.split(" ").includes("problem") || event.text.split(" ").includes("error")) {
            hello(event.channel, event.user ,`please wait for some time instructor will get back to you soon.`)
        }
    }

    if (event && event.type === 'message'){
        if (event.text.split(" ").includes("evaluation") && event.text.split(" ").includes("marks")) {
            hello(event.channel, event.user ,`Your EC will connect to you soon ,meanwhile please raise a ticket`)
        }
    }
    else{
        return
    }
})


function hello (channelId, userId ,usermessage) {
    sendMessage(channelId, `Hi! <@${userId}>  ${usermessage}`)
}

async function sendMessage(channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text: message,
    })
}
