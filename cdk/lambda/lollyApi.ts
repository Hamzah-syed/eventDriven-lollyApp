import { LollyType } from "./lollyType";
import allLollies from "./allLollies";
import createLolly from "./createLolly";
import getLolly from "./getLolly";

type appSyncType = {
  info: {
    fieldName: string;
  };
  arguments: {
    lollyId: string;
    newLolly: LollyType;
  };
};

exports.handler = async (event: appSyncType) => {
  switch (event.info.fieldName) {
    case "allLollies":
      return await allLollies();
    case "getLolly":
      return await getLolly(event.arguments.lollyId);
    case "createLolly":
      return await createLolly(event.arguments.newLolly);
    default:
      return null;
  }
};
