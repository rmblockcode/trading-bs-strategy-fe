const api = axios.create({
    baseURL: 'http://127.0.0.1:3000/api/v1/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
});

// API calls
async function getEntriesPrices() {
    const sectionResults = document.querySelector('.results');
    const pivotPrice = document.getElementById('pivot-price').value;
    const errorMessage = document.querySelector('.error-message');

    // Clear all section
    sectionResults.innerHTML = "";

    if (!pivotPrice || pivotPrice < 0) {
        errorMessage.innerHTML = 'Ingrese un valor valido';
        errorMessage.style.display = 'block';
        return;
    } else {
        errorMessage.style.display = 'none';
    }

    const { data } = await api('entries/', {
        params: {
            pivotPrice: pivotPrice,
            operationType: 'BUY LIMIT',
            decimals: 4
        }
    });
    
    // Creating remaining table
    const table = document.createElement('table');
    const h2 = document.createElement('h2');
    const rowHeader = document.createElement('tr');
    const tdH1 = document.createElement('td');
    const tdH2 = document.createElement('td');
    const tdH3 = document.createElement('td');
    const tdH4 = document.createElement('td');

    const label1 = document.createTextNode('Entrada #');
    const label2 = document.createTextNode('Precio de entrada');
    const label3 = document.createTextNode('Stop Loss');
    const label4 = document.createTextNode('Take Profit');

    const h2label = document.createTextNode('Result');
    h2.appendChild(h2label);

    tdH1.appendChild(label1);
    tdH2.appendChild(label2);
    tdH3.appendChild(label3);
    tdH4.appendChild(label4);

    rowHeader.appendChild(tdH1);
    rowHeader.appendChild(tdH2);
    rowHeader.appendChild(tdH3);
    rowHeader.appendChild(tdH4);

    table.appendChild(rowHeader);

    let entryId = 1;
    for (const key in data){
        console.log(`${key} : ${data[key]['entryPrice']}`)

        const row = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');

        const label = document.createTextNode(`Entrada ${entryId}`);
        const entry = document.createTextNode(data[key]['entryPrice']);
        const sl = document.createTextNode(data[key]['sl']);

        td1.appendChild(label);
        td2.appendChild(entry);
        td3.appendChild(sl);

        let tp = '';
        if (entryId !== 3) {
            tp = document.createTextNode(data[key]['tp']);
        } else {
            tp = document.createTextNode('🐑');
        }
        td4.appendChild(tp);

        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);

        table.appendChild(row);
        entryId++;
    }

    sectionResults.appendChild(h2);
    sectionResults.appendChild(table);

}
