import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";

import { config } from "./core/database";
import Users from "./model/User";

const auth = {
   strategy: new Strategy(
      { secretOrKey: config.jwtSecret!, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() },
      async (jwt_payload, done) => {
         try {
            const user = await Users.findByPk(jwt_payload.id);

            if (user) {
               return done(null, { id: user.id, email: user.email });
            }

            return done(null, false);
         } catch (error) {
            done(error, null);
         }
      }
   ),
   initialize: () => passport.initialize(),
   authenticate: () => passport.authenticate("jwt", config.jwtSession),
   isPassword: (password: string, encodedPassword: string) => bcrypt.compareSync(password, encodedPassword),
};

passport.use(auth.strategy);

export default auth;
