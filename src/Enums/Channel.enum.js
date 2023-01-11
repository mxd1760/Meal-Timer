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