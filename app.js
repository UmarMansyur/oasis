const express = require('express');
const axios = require('axios');
const XLSX = require('xlsx');

const app = express();

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://128.199.74.84:82/api/pricelistfront');
    let pulsa = [];

    const data = response.data.pulsa.map((item) => {
      item.data.map((item2) => {
        pulsa.push(item2);
      });
    });

    const data2 = response.data.ppob.map((item) => {
      item.data.map((item2) => {
        pulsa.push(item2);
      });
    });

    const data3 = response.data.game.map((item) => {
      item.data.map((item2) => {
        pulsa.push(item2);
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(pulsa);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const filePath = new Date().getTime() + '- Harga OASIS' + '.xlsx';
    XLSX.writeFile(workbook, filePath, { compression: true });

    res.download(filePath);
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});