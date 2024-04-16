const config = require("./config.json");
const process = require("process");
process.removeAllListeners("warning");
const prompt = require("prompt-sync")();
const { default: Cloudflare } = require("cloudflare");
const axios = require('axios')
const records = []
const ignored = config.ignore_list
class  Record {
  constructor(id,name,content,type,status,prune){
      this.id = id
      this.name = name
      this.content = content
      this.type = type
      this.status = status
      this.prune = prune
  }
}
const cloudflare = new Cloudflare({
  apiEmail: config.api_email,
  apiKey: config.api_key,
});
var zone = config.zone;

console.log("Cloudflare Stale DNS Checker");
console.log("Written by Walker Dick");

if (zone == "" || zone == undefined) {
  console.log(
    "Zone config is not set.\n Please set the `zone` parameter in config.json"
  );
}

cloudflare.dns.records.list({
  zone_id: zone,
  type: "CNAME"
}).then(async data => {
  console.log(data.result[0].zone_name)
  for (result in data.result ) {
    //console.log(data.result[result])
    records.push(new Record(data.result[result].id,data.result[result].name,data.result[result].content,data.result[result].type,0,false))
    console.log(`ID: ${data.result[result].id} -- Name: ${data.result[result].name} -- Content: ${data.result[result].content} -- Type: ${data.result[result].type}`)
    
  }
  console.log(`All records Processed. Total records: ${records.length}`)

  console.log("\n")

  console.log('Starting Site Tests')
  for (req in records){
    if (ignored.includes(`https://${records[req].name}`) == false){
    await axios.get(`https://${records[req].name}`).then((resp)=>{
      console.log(`https://${records[req].name} - ${resp.status}`)
    }).catch((error)=>{
      console.error(error)
      
      //console.error(`https://${records[req].name} - ${error.errno}`)
    })
  } else {
    console.log(`https://${records[req].name} - skipped`)
  }
} 

});
