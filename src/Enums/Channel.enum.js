export default class Channel {
  static Default = new Channel("default");
  static Oven = new Channel("oven");

  constructor(name){
    this.name=name;
  }

  equals(obj){
    if(!obj instanceof Channel){return false;}
    if(obj.name!=this.name){return false;}
    return true;
  }
  
}