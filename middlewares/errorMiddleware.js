const errorMiddleware = (error, req, res, next) => {
  switch (error.name) {
    case "401":
      res.status(401).json({ message: error.message }); //권한X
    case "404":
      res.status(404).json({ message: error.message }); //저장소에 없으면 
    case "412":
      res.status(412).json({ message: error.message }); //값을 안들고옴
    default:
      res.status(500).json({ message: "알 수 없는 error가 발생하였습니다." });
  }
};

module.exports = errorMiddleware;
