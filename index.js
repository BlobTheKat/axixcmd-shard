let fetch = require("node-fetch")
;(app=require("express")()).listen()
let fs = require("fs");
app.get("/",(req,res)=>res.end("hehehe"))
app.get("/reload", (req, res) => loadcmds().then(res.end.bind(res,"200")))
const Discord = require("discord.js")
function emd(txt,data){
  return txt.replace(/%(\d\d|\d*;|)/g, (a,b)=>data[(b.match(/\w+/)||["0"])[0].replace(/^0*(?=.)/,"")])
}
function lang(path, data){
  return emd(config.lang[path], data)
}
let wsdb = require("wsdb-client")
let db = a => wsdb(process.env.token,"https://axixshard-"+a+".axixbot.repl.co")
let guildDB = db("gdata")
let userDB = db("udata")

const client = new Discord.Client()
client.login(process.env.token)
let c = {}
let config = {}

async function loadcmds(){
  let id = process.env.shardID
  let cmds = await fetch("https://axixcmds.repl.co/cmds/"+id).then(a=>a.json())
  config = await fetch("https://axixcmds.repl.co/config").then(a=>a.json())
  for(var i in cmds){
    fs.writeFileSync("cmds/"+i,cmds[i])
    let cmd = new Function("fs, app, client, bot, Discord, fetch, db, guildDB, userDB, config",cmds[i]).call(client,fs,app,client, client, Discord, fetch, db, guildDB, userDB, config);
    [cmd.name,...(cmd.aliases||[])].map(a=>c[a]=cmd)
  }
}
loadcmds();
let cdcache = {}
client.on("message", (msg) => {
  let prefix = guildDB(msg.guild.id).prefix || config.prefix
  if(!msg.content.startsWith(prefix))return
  let re = msg.channel.send.bind(msg.channel)
  let str = msg.content.split(" ")
  let name = str[0].replace(prefix,"")
  if(!(name in c))return
  if(c[name].guildOnly && !msg.guild)return
  let args = str.slice(1)
  str = undefined;
  delete str;
  if(cdcache[msg.author.id+"@"+name]){
    let wait = Math.ceil(((c[name].cooldown*1000) + cdcache[msg.author.id+"@"+name] - Date.now()) / 1000)

    re(lang("error.cooldown", [wait, "<@!"+msg.author.id+">"])).then(a=>{try{setTimeout(a.delete.bind(a),3000)}catch(e){}})
    return
  }
  if(c[name].cooldown){
    cdcache[msg.author.id+"@"+name] = Date.now()
    setTimeout(a=>delete cdcache[msg.author.id+"@"+name],c[name].cooldown*1000)
  }
  c[name].execute(msg,args)
})
undefined;
