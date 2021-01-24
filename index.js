const ds=require("discord.js")
const client=new ds.Client();
const fs=require("fs");

const config=require("./config.json");

client.login(config.token);

client.on('ready',()=>{
    console.log(`${client.user.tag} is ready!`);
    setTimeout(()=>{
        console.log(`Ping: ${client.ws.ping}`);
    },1000);
});

client.on('message',message=>{
    if(message.author.bot) return;
    let latest=message.content.toLowerCase();
    let oldest=JSON.parse(fs.readFileSync(`./messages/${message.member.id}.json`,'utf-8'));
    oldest=oldest.msg.toLowerCase();
    fs.writeFileSync(`./messages/${message.member.id}.json`,`{"msg":"${message.content}"}`)

    if(latest==oldest){
        message.delete();
        let embed=new ds.MessageEmbed()
            .setTitle("NoSpam")
            .setDescription(`${message.member} per favore non mandare sempre lo stesso messaggio!`)
            .setFooter(message.guild.name,message.guild.iconURL());
        message.reply(embed)
    }else if(latest.includes(oldest)){
        message.delete();
        let embed=new ds.MessageEmbed()
            .setTitle("NoSpam")
            .setDescription(`${message.member} per favore non mandare sempre lo stesso messaggio!`)
            .setFooter(message.guild.name,message.guild.iconURL());
        message.reply(embed)
    }
});