const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");


module.exports = function CommonMiddleware(app){
    app.use(morgan("common"));
    app.use(cors());
    app.use(helmet());
}