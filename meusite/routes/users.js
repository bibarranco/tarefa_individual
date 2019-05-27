var express = require('express');
var router = express.Router();
var banco = require('../app-banco');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/registrar',(req,res,next)=>{
  banco.conectar().then(()=>{
    console.log(`Chegou para registro: ${JSON.stringify(req.body)}`);

    // Dados do formul�rio da pe�a
    var nome = req.body.nome;
    var datanasc = req.body.datanasc;
    var email = req.body.email;
    var telefone = req.body.telefone;
    var login = req.body.login;
    var senha = req.body.senha;
    

    return banco.sql.query(`INSERT INTO cadastroBianca (nome,datanasc,email,telefone,login,senha) values
    ('${nome}','${datanasc}','${email}','${telefone}','${login}','${senha}')`);
  }).then(()=>{
    res.send(200);
  }).catch(err=>{
    console.log(err);
  }).finally(()=>{
    banco.sql.close();
  })
});

router.post('/registrar2',(req,res,next)=>{
//   banco.conectar().then(()=>{
//     console.log(`Chegou para registro: ${JSON.stringify(req.body)}`);

//     // Dados do formul�rio do organizador
//     var nome_inst = req.body.nome_inst;
//     var cnpj = req.body.cnpj;
//     var telefone = req.body.telefone;
//     var email = req.body.email;
//     var endereco = req.body.endereco;

//     return banco.sql.query(`UPDATE cadastro SET nome_inst = '${nome_inst}',cnpj = '${cnpj}',
//     telefone='${telefone}',email='${email}',endereco='${endereco}' where id_peca = (select top 1 id_peca from cadastro order by id_peca desc)`);
//   }).then(()=>{
//     res.send(200);
//   }).catch(err=>{
//     console.log(err);
//   }).finally(()=>{
//     banco.sql.close();
//   })
// });
});
router.post('/entrar',(req,res,next)=>{
  banco.conectar().then(()=>{
    console.log(`Chegou para registro: ${JSON.stringify(req.body)}`);

    // Dados do formul�rio do organizador
    var login = req.body.login;
    var senha = req.body.senha;

    return banco.sql.query(`SELECT * FROM cadastroBianca where login = '${login}' and senha='${senha}'`);
  }).then((consulta)=>{
    console.log(consulta.recordset);
    if(consulta.recordset.length == 1){
      res.send(consulta.recordset[0]);
    }else{
      res.sendStatus(404);
    }
  }).catch(err=>{
    console.log(err);
  }).finally(()=>{
    banco.sql.close();
  })
});


module.exports = router;
