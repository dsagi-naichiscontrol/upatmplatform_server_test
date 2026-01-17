// server.js
const express = require('express');
const app = express();
const PORT = 443; // porque Cashdro usa HTTPS
const https = require('https');
const fs = require('fs');

// Certificados autofirmados (solo para testing)
const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

var idOperationTest =100
var counter = 1
var dataTest = {code:1,data:'{"operation":{"operationid":"1","batchid":"0","state":"G","payInProgress":"1","payOutProgress":"1","total":"161700","totalin":"500","totalout":"0","type":"4","datefinish":"2025-10-19","hourfinish":"17:56:7","amountchangenotavailable":"0","totalrounded":"2000","error":"0","posuser":"atm_iupserver","posid":"iupserver","progressPartial":0,"progressTotal":0,"aliasid":"","canceled":0,"userId":"0","userName":"${process.env.CASHDRO_USER}","rfId":"","roundValue":"0","finalStatus":"1"},"devices":[{"type":"1","state":"3","totalin":"0","totalout":"0","pieces":[]},{"type":"2","state":"3","totalin":"0","totalout":"0","pieces":[{"value":"50","currencyid":"MXN","unitsincassette":"0","unitsinrecycler":"0","unitsoutcassette":"0","unitsoutrecycler":"0","unitstransferred":"0","exchangerate":"1.0000","startlevelrecycler":"27","startlevelcassette":"0","finishlevelrecycler":27,"finishlevelcassette":0,"initials":"$","initialsfront":"1","status":"-1","Image":""},{"value":"100","currencyid":"MXN","unitsincassette":"0","unitsinrecycler":"0","unitsoutcassette":"0","unitsoutrecycler":"0","unitstransferred":"0","exchangerate":"1.0000","startlevelrecycler":"100","startlevelcassette":"0","finishlevelrecycler":100,"finishlevelcassette":0,"initials":"$","initialsfront":"1","status":"-1","Image":""},{"value":"200","currencyid":"MXN","unitsincassette":"0","unitsinrecycler":"0","unitsoutcassette":"0","unitsoutrecycler":"0","unitstransferred":"0","exchangerate":"1.0000","startlevelrecycler":"13","startlevelcassette":"0","finishlevelrecycler":13,"finishlevelcassette":0,"initials":"$","initialsfront":"1","status":"-1","Image":""},{"value":"500","currencyid":"MXN","unitsincassette":"0","unitsinrecycler":"0","unitsoutcassette":"0","unitsoutrecycler":"0","unitstransferred":"0","exchangerate":"1.0000","startlevelrecycler":"32","startlevelcassette":"0","finishlevelrecycler":32,"finishlevelcassette":0,"initials":"$","initialsfront":"1","status":"-1","Image":""},{"value":"1000","currencyid":"MXN","unitsincassette":"0","unitsinrecycler":"0","unitsoutcassette":"0","unitsoutrecycler":"0","unitstransferred":"0","exchangerate":"1.0000","startlevelrecycler":"5","startlevelcassette":"0","finishlevelrecycler":5,"finishlevelcassette":0,"initials":"$","initialsfront":"1","status":"1","Image":""}]},{"type":"3","state":"3","totalin":"2000","totalout":"0","pieces":[{"value":"2000","currencyid":"MXN","unitsincassette":"0","unitsinrecycler":"1","unitsoutcassette":"0","unitsoutrecycler":"0","unitstransferred":"0","exchangerate":"1.0000","startlevelrecycler":"3","startlevelcassette":"0","finishlevelrecycler":4,"finishlevelcassette":0,"initials":"$","initialsfront":"1","status":"-1","Image":""},{"value":"5000","currencyid":"MXN","unitsincassette":"0","unitsinrecycler":"0","unitsoutcassette":"0","unitsoutrecycler":"0","unitstransferred":"0","exchangerate":"1.0000","startlevelrecycler":"25","startlevelcassette":"0","finishlevelrecycler":25,"finishlevelcassette":0,"initials":"$","initialsfront":"1","status":"-1","Image":""},{"value":"10000","currencyid":"MXN","unitsincassette":"0","unitsinrecycler":"0","unitsoutcassette":"0","unitsoutrecycler":"0","unitstransferred":"0","exchangerate":"1.0000","startlevelrecycler":"18","startlevelcassette":"0","finishlevelrecycler":18,"finishlevelcassette":0,"initials":"$","initialsfront":"1","status":"-1","Image":""},{"value":"20000","currencyid":"MXN","unitsincassette":"0","unitsinrecycler":"0","unitsoutcassette":"0","unitsoutrecycler":"0","unitstransferred":"0","exchangerate":"1.0000","startlevelrecycler":"9","startlevelcassette":"0","finishlevelrecycler":9,"finishlevelcassette":0,"initials":"$","initialsfront":"1","status":"-1","Image":""}]}],"messages":[],"messagesFixed":[],"withError":"false","withErrorMRX":false,"WithErrorByCassetteWithdrawn":false}'}
var actualData = JSON.parse(dataTest.data);
var dataPendig = []
app.get('/Cashdro3WS/index.php', (req, res) => {
  var { operation, name, password, type, posid, posuser, parameters,operationId } = req.query;
  console.log('/Cashdro3WS/index.php')
  console.log(operation)

  if (operation === 'startOperation') {
    idOperationTest +=1
    actualData.operation.state = "G"
    actualData.operation.code = idOperationTest.toString()
    dataPendig = []
    counter = 0
    
    
    return res.json({"code":1,"data":idOperationTest});
    //return res.json( {"code":-1,"data":"Authentication Failed"});
    //return res.json( {"code":-2,"data":"Operation not queued"});
    //return res.json( {"code":-3,"data":"Wrong amount"});
    //return res.json( {"code":-4,"data":"User does not have permission"});
    //return res.json( {"code":-99,"data":"Invalid Parameters"});
    //return res.json( {"code":-1900,"data":"System busy"});
    //return res.json( {"code":-998,"data":"Can't start operation.Check system status on Diagnosis screen"});
    //return res.json( {"code":-999,"data":"Cashdro service is not running"});
  }else if(operation === 'acknowledgeOperationId'){
    return res.json({"code":1,"data":""});
    //return res.json( {"code":-1,"data":"Authentication Failed"});
    //return res.json( {"code":-2,"data":"Operation not found"});
    //return res.json( {"code":-3,"data":"Invalid parameters"});
  }else if (operation === 'finishOperation') {
    actualData.operation.state = "F"
    dataPendig.push({OperationId: idOperationTest.toString()})
    // Aquí puedes devolver una simulación de respuesta que haría Cashdro
    return res.json({code:1 , data:""});
  }else if(operation === 'setOperationImported'){
     dataPendig = []
     return res.json({"code":1,"data":""});
  }else if(operation === 'askPendingOperations'){
    var dataRes = JSON.stringify(dataPendig);
    return res.json({"code":1,"data":dataRes});
    return res.json({"code":-1,"data":"Authentication Failed"})
    return res.json({"code":-99,"data":"Invalid Parameters"})

  }else if (operation === 'askOperation') {
    // Aquí puedes devolver una simulación de respuesta que haría Cashdro
    console.log(operationId)
    if(operationId == idOperationTest){
        counter += 5000
        actualData.operation.totalin = counter
        actualData.operation.operationid = idOperationTest
        var dataRes = JSON.stringify(actualData);
        return res.json({
            code: 1,
            data: dataRes,
        });
    }else{
         return res.json({
            code: -1,
            data: "",
        });
    }   
    
  }else if (operation === 'newOperation') {
       
  }


  return res.status(400).json({ result: 'ERROR', message: 'Operación no soportada' });
});


app.get('/Cashdro3Web/index.html', (req, res) => {
  // Puedes devolver una página HTML simulada o un mensaje simple
  res.send(`<html><body><h1>Splash page simulada</h1></body></html>`);
});

https.createServer(options, app).listen(PORT, () => {
  console.log(`Servidor Cashdro MOCK escuchando en https://localhost:${PORT}`);
});