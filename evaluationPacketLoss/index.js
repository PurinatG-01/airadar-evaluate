const fs = require('fs')
let count = 0
let result = []
fs.readFile('7days_test.csv', 'utf8', (err,data) => {
    count++
    if(err) console.error(`> err : `,err)
    if(count != 50){
        let rows = data.split("\n")
        rows.map((_row)=>{
            let row = _row.split(",")
            if(row[11] != '"sequence_no"') result.push(row[11])
        })
        console.log(`> expect : `, 20281)
        console.log(`> actual result.length : `,result.length)
    }    
})
