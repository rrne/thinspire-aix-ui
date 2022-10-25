const express = require("express");
const cors = require("cors");
const server = express();
const next = require('next')
const request = require('request');
const session = require('express-session')
const db_config = require('./public/data/config.json');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const PORT = 3000;
const app = next({prod});

const client_id = 'SoQV5w9nxC9FngFrGPEu';
const client_secret = 'PWGxmttGcF';

const handle = app.getRequestHandler()

app.prepare().then(() => {
    server.use(cors());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    }))
    server.get('/search/news', function (req, res) {
      const api_url = 'https://openapi.naver.com/v1/search/news?display=30&query=' + encodeURI(req.query.query); // json 결과
    
      const options = {
          url: api_url,
          headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
      };
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
          res.end(body);
        } else {
          res.status(response.statusCode).end();
        }
      });
    });

    //로그인 페이지 🔥
    server.get('/login',(req, res) => {
      if(req.session.isLogin === undefined){
        return app.render(req, res, "/login");
      }else{
        res.redirect('/')
      }
    })
    //메인 대시보드 라우트🔥
    server.get('/',(req, res) => {
      if(req.session.isLogin === undefined){
        res.redirect('/login')
      }else{
        return app.render(req, res, "/");
      }
    })
    //전기페이지 라우트🔥
    server.get('/elec',(req, res) => {
      if(req.session.isLogin === undefined){
        res.redirect('/login')
      }else{
        return app.render(req, res, "/elec");
      }
    })
    //회전기기페이지 라우트🔥
    server.get('/rotation',(req, res) => {
      if(req.session.isLogin === undefined){
        res.redirect('/login')
      }else{
        return app.render(req, res, "/rotation");
      }
    })
    //스팀기기페이지 라우트🔥
    server.get('/steam',(req, res) => {
      if(req.session.isLogin === undefined){
        res.redirect('/login')
      }else{
        return app.render(req, res, "/steam");
      }
    })

    server.get('*', (req, res) => {
      return handle(req,res)
    })

    server.post('/api/login', (req,res) => {
      const config = req.body.type === "AI" ? db_config.AI : db_config.AIX;
      const filtered = config.filter(list => list.id === req.body.id && list.pw === req.body.pw)
      if(filtered.length !== 0){
        req.session.isLogin = true
        res.status(201).send({message:"로그인에 성공했습니다"})
      }else{
        res.status(200).send({message:"ID 또는 비밀번호를 확인하세요"})
      }
    })
    server.post('/api/logout', (req,res) => {
      req.session.destroy(function (err) {
        if (err) throw new Error(err);
      });
      return res.status(200).send({message:"로그아웃에 성공했습니다"});
    })
    // server.use(function(req, res, next) {
    //   if (req.accepts('html')) {
    //     res.render('404', { url: req.url });
    //     return;
    //   }
    // });
    server.use(function (req, res, next) {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      next()
  });
   
  server.listen(PORT, () => console.log(`> next + expresss running on port: ${PORT}`))
})

