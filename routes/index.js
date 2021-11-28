var express = require('express');
var router = express.Router();

const loginCheck = require('./middleware/loginCheck');

/* GET home page. */
router.get('/About', function (req, res, next) {
  res.render('About', { title: '埔里基督教醫院 - 交趾尪仔俗語故事' });
});


let getExhibition = (req) => {
  return new Promise((rs, rj) => {
    let sql = 'SELECT * FROM `exhibition` WHERE 1;'
    req.sql(sql, function(err, result) {
      if(err) {
        console.log("[SELECT ERROR] -", err);
        rj(err)
      } else {
        console.log(result);
        if(result.length == 0) {
          rj(404);
        } else {
          rs(result);
        }
      }
    });
  })
}

let get360Model = (req) => {
  return new Promise((rs, rj) => { // rs->resolve, rj->reject
    let sql = 'SELECT * FROM `pannellum` WHERE 1;'
    req.sql(sql, function(err, result) {
      if(err) {
        console.log("[SELECT ERROR] -", err);
        rj(err)
      } else {
        if(result.length == 0) {
          rj(404);
        } else {
          rs(result);
        }
      }
    });
  })
}


// fetch exhibitions' data from db
router.get('/', async function (req, res, next) { // async(使異部同步) 一定要搭配 try catch(原本是 promise.then)
  try {
    let exData = await getExhibition(req);
    let modelData = await get360Model(req);
    res.render('index', {title:'埔里基督教醫院 - 交趾尪仔俗語故事', exData:exData, modelData:modelData})
  } catch(error) {
    console.log(error);
    res.render('index', {title:'埔里基督教醫院 - 交趾尪仔俗語故事', exData:'', modelData:''})
  }
});

// fetch pannellum model data
router.get('/index', function (req, res, next) {
  // console.log(req.session);
  let sql = 'SELECT * FROM `pannellum` WHERE 1; ';
  let params = [];
  req.sql(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] -", err);
      return;
    } else {
      if (result.length == 0) {
        console.log('No DATA found');
        res.send('index', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Pdata: '' });
      } else {
        console.log(result);
        res.send('index', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Pdata: result });
      }
    }
  })
});

// fetch models' data from db
router.get('/ExhibitionList', function (req, res, next) {
  let formData = req.query; // catch number to know where is the exhibition I am
  // console.log(formData.id);
  let params = [formData.id];
  let sql = 'SELECT * FROM `model`,`connection` WHERE ? = `connection`.`E_ID` AND `connection`.`M_ID` = `model`.`M_ID`';
  req.sql(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] -", err);
      return;
    } else {
      if (result.length == 0) {
        console.log('No DATA found');
        res.render('ExhibitionList', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Mdata: '' });
      } else {
        console.log(result);
        res.render('ExhibitionList', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Mdata: result });
      }
    }
  })
});

// get models' path and push to web
router.get('/ModelView', function (req, res, next) {
  let M_ID = req.query; // catch number to know where is the exhibition I am
  // console.log(M_ID);
  let params = [M_ID.id];
  let sql = 'SELECT * FROM `model` WHERE ? = `model`.`M_ID`';
  req.sql(sql, params, function (err, result) {
    if (err) {
      console.log("[SELECT ERROR] -", err);
      return;
    } else {
      if (result.length == 0) {
        console.log('No DATA found');
        res.render('ModelView', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Mdata: '' });
      } else {
        // console.log(result);
        res.render('ModelView', { title: '埔里基督教醫院 - 交趾尪仔俗語故事', Mdata: result });
      }
    }
  })
});
// get data 
let getAllModel = (req) => {
  return new Promise((rs, rj) => {
    let sql = 'SELECT `M_ID`,`M_Name`,`M_Pic` FROM `model` WHERE 1;'
    req.sql(sql, function(err, result) {
      if(err) {
        console.log("[SELECT ERROR] -", err);
        rj(err)
      } else {
        console.log(result);
        if(result.length == 0) {
          rj(404);
        } else {
          rs(result);
        }
      }
    });
  })
}

let getEID = (req) => {
  return new Promise((rs, rj) => { // rs->resolve, rj->reject
    let sql = 'SELECT `E_ID`,`E_Name` FROM `exhibition` WHERE 1;'
    req.sql(sql, function(err, result) {
      if(err) {
        console.log("[SELECT ERROR] -", err);
        rj(err)
      } else {
        if(result.length == 0) {
          rj(404);
        } else {
          rs(result);
        }
      }
    });
  })
}
// get data to show list of all model and make button to filter
router.get('/AllModelList', async function (req, res, next) { // async(使異部同步) 一定要搭配 try catch(原本是 promise.then)
    try {
      let Mdata = await getAllModel(req);
      let Edata = await getEID(req);
      // console.log(Mdata,Edata);
      res.render('AllModelList', {title:'埔里基督教醫院 - 交趾尪仔俗語故事', Mdata:Mdata, Edata:Edata})
    } catch(error) {
      console.log(error);
      res.render('AllModelList', {title:'埔里基督教醫院 - 交趾尪仔俗語故事', Mdata:'', Edata:''})
    }
});

module.exports = router;
