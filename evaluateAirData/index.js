const fs = require('fs')

let raw_data = fs.readFileSync('10052021-data.json')
let data = JSON.parse(raw_data)

let result = []
let flag = true
data.log.entries.map((e)=>{

    let body = JSON.parse(e.response.content.text)
    if(body[0] && body[0].device_send_date && body[0].dataserver_received_data){

    
        // Day กับ month สลับกันนนน
        const send_date = new Date(body[0].device_send_date)
        const dataserver_received_data = new Date(body[0].dataserver_received_data)
        const app_received_date = new Date(e.response.headers.find((e)=>{
                return e.name === "Date"
            }).value)
        // console.log(`> app_received_date : `,app_received_date)
        
        let app_received_date_proc = (app_received_date.getMinutes()*60) + app_received_date.getSeconds()

        let send_date_proc = (send_date.getMinutes()*60) + send_date.getSeconds()
 
        let dataserver_received_data_proc = (dataserver_received_data.getMinutes()*60) + dataserver_received_data.getSeconds()
 
        result.push({ send: send_date_proc, data_server_received: dataserver_received_data_proc, app_received: app_received_date_proc })
        
        
        
    }
    
    
})

console.log(`> result : `,result)

let device_to_dataserver_avg = 0
let dataserver_to_app_avg = 0
let device_to_app_avg = 0
result.map((e)=>{
    
    device_to_dataserver_avg+= Math.abs(e.send - e.data_server_received)

    dataserver_to_app_avg+= Math.abs(e.data_server_received - e.app_received)

    device_to_app_avg += Math.abs(e.send - e.app_received)
})
console.log(`> device_to_dataserver_avg : `,device_to_dataserver_avg/result.length)
console.log(`> dataserver_to_app_avg : `,dataserver_to_app_avg/result.length)
console.log(`> device_to_app_avg : `,device_to_app_avg/result.length)

