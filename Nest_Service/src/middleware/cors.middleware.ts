// import { Middleware, NestMiddleware} from "@nestjs/common";
// import { ExpressMiddleware } from "@nestjs/core";
 
// @Middleware()
// export class CorsMiddleware implements NestMiddleware {
//     resolve(): ExpressMiddleware {
//         return (req, res, next) => {
//             let allowedOrigins = ["http://localhost:3000", "https://w11k.de"];
//             if (allowedOrigins.indexOf(req.header("Origin")) > -1) {
//                 res.header("Access-Control-Allow-Origin", req.header("Origin"));
//                 res.header("Access-Control-Allow-Headers", "content-type");
//                 res.header("Access-Control-Allow-Methods", "POST");
//             }
 
//             next();
//         };
//     }
// }