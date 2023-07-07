import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

//  new AirDatepicker('#el', {
//     locale: localeEn,
//     timepicker: true
// });

// ---
let openDate = new AirDatepicker('#openDate', {
    locale: localeEn,
    timepicker: true
});
let closeDate = new AirDatepicker('#closeDate', {
    locale: localeEn,
    timepicker: true
});
let endDate = new AirDatepicker('#endDate', {
    locale: localeEn,
    timepicker: true
});

// let stock = document.getElementById('#stock');

window.endDate_ = endDate;
// Ready

export function generate(){
let status = document.getElementById('status');
status.innerText = "";

let stock = document.getElementById('stock');
let formOutput = `{
    "gameCategory": "CLASSIC",
    "opensAt": ${openDate.lastSelectedDate.valueOf()},
    "closesAt": ${closeDate.lastSelectedDate.valueOf()},
    "endsAt": ${endDate.lastSelectedDate.valueOf()},
    "metadata":{
        "color": "${document.getElementById("color").value}"
    },
    "fee":"${document.getElementById("fee").value}",
    "entities":{
        "e1":{
                "id": ${stock.value},
                "name":"${window.stockdataClassic[stock.value].name}",
                "source": "IND",
                "ticker":"${window.stockdataClassic[stock.value].stockTicker}",
                "valueType":"PRICE"
            }
    },
    "options":[
        {
            "optType": "EQ",
            "dataType": "STRING",
            "value": "Yes"
        },
        {
            "optType": "EQ",
            "dataType": "STRING",
            "value": "No"
        }
    ]
}`
document.getElementById("code").innerHTML=formOutput;

fetch("https://dev.jito.club/api/v1/game/create", {
    mode: "cors",
    method: "PUT",
    headers:{
        "Content-Type": "application/json",
        "X-Auth-Token": `${window.authKey}`
    },
    body:formOutput
    }).then(resp=>resp.text().then(data=>status.innerText=`${resp.status} \n ${data}`));

}


window.generate = generate;



async function makeStocks(){
    let resp = await fetch("https://dev.jito.club/api/v1/game/entities", {
            mode: "cors",
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "X-Auth-Token": `${window.authKey}`
            },
            body:JSON.stringify({"select":"CLASSIC"})
            });
    let data = await resp.json();
    window.stockdataClassic = {};
    let stockSelect = ''
    for(let entry of data){
        stockSelect += `<option value="${entry.id}">${entry.name}</option>`
        window.stockdataClassic[entry.id] = entry;
    }
    document.getElementById("stock").innerHTML = stockSelect;
}

window.makeStocks = makeStocks;
// window..then(console.log(""))


async function punchKey(){
    document.getElementById("userDetails").innerHTML = "";
    let key = document.getElementById("authToken").value;
    let resp = await fetch("https://dev.jito.club/api/v1/user/profile", {
        mode: "cors",
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "X-Auth-Token": `${key}`
        }
        });
    let data = await resp.text()
    document.getElementById("userDetails").innerHTML = `${resp.status} \n ${data}`;
    window.authKey = key;
    await makeStocks();
}

window.punchKey = punchKey;
