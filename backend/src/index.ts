import server from "./server";
import colors from "colors";
import { PORT } from "./constants/env";

server.listen(PORT, () => {
  console.log(
    colors.magenta.bold(
      `Server is running on port ${PORT} in development enviroment`
    )
  );
});
