export default class Channel {
  static Prep = new Channel("prep");
  static Oven = new Channel("oven");
  static StoveTop = new Channel("stovetop");

  constructor(name){
    this.name=name;
  }

  equals(obj){
    if(!obj instanceof Channel){return false;}
    if(obj.name!=this.name){return false;}
    return true;
  }
  
}

let channelSettings = {}
Object.keys(Channel).forEach(channel=>{
  // console.log("channel: ")
  // console.log(Channel[channel])
  channelSettings[Channel[channel].name] = 1;
})

export const defaultChannelSettings = channelSettings