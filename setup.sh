#!/bin/bash
rm -rf game_creation
mkdir game_creation;
cd game_creation;

cat << EOF > index.html
<html>
    <body>
        <h1>BULL VS BEAR</h1>
        <br/>
        <br/>
        ---
        opensAt: 1684249593000
        closesAt: 1684380600000
        endsAt: 1684405800000
        winCategory: winner | loser
        fee: 1
        ---
        <option>Zomato</option>
        <option>HDFC</option>
        ---
        <button>Create</button>
        ---
        {
            "gameCategory": "BULL_VS_BEAR",
            "opensAt": 1684249593000,
            "closesAt": 1684380600000,
            "endsAt": 1684405800000,
            "metadata": {
                "winCategory": "winner"
            },
            "fee": "1",
            "entities":{},
            "options": [
                {
                    "optType": "ENTITY",
                    "dataType": "STRING",
                    "value": "IND50",
                    "entity": "IND::IND50||PRICE"
                },
                {
                    "optType": "ENTITY",
                    "dataType": "STRING",
                    "value": "INDBANK",
                    "entity": "IND::INDBANK||PRICE"
                }
            ]
        }
    </body>
</html>
EOF

# nvm use 17;
npm init -y;
npm install --save-dev parcel
npm i air-datepicker
npx parcel -p 9026 index.html