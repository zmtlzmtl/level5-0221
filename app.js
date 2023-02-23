const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
const PORT = 3000;

app.use(express.json()); // body-parser 전역 미들웨어
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', routes); // 라우터 등록
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '서버를 실행 중 입니다.');
});