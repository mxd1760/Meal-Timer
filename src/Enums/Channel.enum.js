export default class Channel {
  static Default = new Channel("Default");
  static Oven = new Channel("Oven");

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
  channelSettings[Channel[channel]] = 1;
})

export const defaultChannelSettings = channelSettings