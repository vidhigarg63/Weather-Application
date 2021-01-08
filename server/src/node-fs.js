var http = require('http');
var fs = require('fs');

function nodeFn(method, TEST_FILE_NAME, TEST_DATA, NEW_DATA) {
  if (method === 'Open') {
    return saveTo(TEST_FILE_NAME, TEST_DATA)
  }
  if (method === 'Read') {
    return readFrom(TEST_FILE_NAME)
  }
  if (method === 'ReadWithId') {

    return readDataWithName(TEST_FILE_NAME, TEST_DATA)
  }
  if (method === 'addData') {
    return addData(TEST_FILE_NAME, NEW_DATA)
  }
  if (method === 'update') {
    return updateData(TEST_FILE_NAME, NEW_DATA)
  }
}

function saveTo(TEST_FILE_NAME, TEST_DATA) {
  fs.writeFileSync(TEST_FILE_NAME, JSON.stringify(TEST_DATA))
  return 'Data saved!!'
}

function readFrom(TEST_FILE_NAME) {
  let data = fs.readFileSync(TEST_FILE_NAME);
  return JSON.parse(data);
}

function readDataWithName(TEST_FILE_NAME, NAME) {
  let data = fs.readFileSync(TEST_FILE_NAME);
  let parsedData = JSON.parse(data)
  if(parsedData[NAME])
    return parsedData[NAME]
  else
   throw new Error('Element not found')
}

function addData(TEST_FILE_NAME, NEW_DATA) {
  let data = fs.readFileSync(TEST_FILE_NAME);
  let parsedData = JSON.parse(data)
  if (parsedData.filter(check => check.id === NEW_DATA.id).length) {
    throw new Error('Element already exists')
    return false
  } else {
    parsedData.push(NEW_DATA);
    saveTo(TEST_FILE_NAME, parsedData)
    return true
  }
}

function updateData(TEST_FILE_NAME, UPDATE_DATA) {

  let data = fs.readFileSync(TEST_FILE_NAME);
  let parsedData = JSON.parse(data)

  let elementFound = false
  parsedData.forEach(element => {
    if (element.id === UPDATE_DATA.id) {
      element.userName = UPDATE_DATA.userName
      element.age = UPDATE_DATA.age
      elementFound = true
    }
  });
  if (elementFound) {
    saveTo(TEST_FILE_NAME, parsedData)
    return parsedData
  } else
    throw new Error('Element not found')
}
module.exports = nodeFn