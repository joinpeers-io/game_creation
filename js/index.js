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
    
// let output = `{
// "gameCategory": "BULL_VS_BEAR",
// "opensAt": ${openDate.lastSelectedDate.valueOf()},
// "closesAt": ${closeDate.lastSelectedDate.valueOf()},
// "endsAt": ${endDate.lastSelectedDate.valueOf()},
// "metadata": {
//     "winCategory": "${document.getElementById('winCategory').value}"
// },
// "fee": "${document.getElementById('fee').value}",
// "entities":{},
// "options": [
//     {
//         "optType": "ENTITY",
//         "dataType": "STRING",
//         "value": "IND50",
//         "entity": "IND::IND50||PRICE"
//     },
//     {
//         "optType": "ENTITY",
//         "dataType": "STRING",
//         "value": "INDBANK",
//         "entity": "IND::INDBANK||PRICE"
//     }
// ]
// }`
let stock = document.getElementById('stock');
let output = `
{
    "gameCategory": "CLASSIC",
    "opensAt": ${openDate.lastSelectedDate.valueOf()},
    "closesAt": ${closeDate.lastSelectedDate.valueOf()},
    "endsAt": ${endDate.lastSelectedDate.valueOf()},
    "metadata":{
        "color": "RED"
    },
    "fee":"1",
    "entities":{
        "e1":{
                "id": ${stock.value},
                "name":"${stock.selectedOptions[0].innerText}",
                "source": "IND",
                "ticker":"${stock.selectedOptions[0].innerText}",
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
document.getElementById("code").innerHTML=output;
}

window.generate = generate;
async function makeStocks(gameType){
    resp = await fetch("https://dev.jito.club/api/v1/game/entities",
      {
      method: "POST",
  		mode: "cors",
      body: JSON.stringify({"select":"CLASSIC"}),
  		headers:{
        	"Content-Type": "application/json",
            "X-Auth-Token": "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..fQFp03eoantQsAcp.0-QE6lvO78f5JdaHhYXuw6EuCjuH4QJ6UuhGSka5aQiiNkqV_5hsQnlLyx8XVX7WNtXjVolF92h-AAVA5Euoug.OQu95wDC7sxUAdi4EUkEYA"
      },
      redirect: 'follow'
      }
     );
     stocks = await resp.json();
     let options = ''
     for (let x of stocks){
        options += `<option value="${x.id}">${x.name}</option>`;
     }
     document.getElementById("stock").innerHTML=options;
}

makeStocks();

