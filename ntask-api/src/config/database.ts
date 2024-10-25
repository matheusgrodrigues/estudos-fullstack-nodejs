import { Options } from "sequelize";

interface ConfigProps {
   database: string;
   username: string;
   password: string;
   params: Options;
}

const config: ConfigProps = {
   database: "ntask",
   username: "",
   password: "",
   params: {
      dialect: "sqlite",
      storage: "ntask.sqlite",
      define: {
         underscored: true,
      },
   },
};

export default config;
