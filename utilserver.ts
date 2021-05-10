import { Product } from "./types";

import path from "path";
import fs from "fs/promises";

/*
  #CSDF03
  - getData can only be used on the server side
*/

export const getData = async () => {
  /*
    - cwd gives you the current working dir (proj dir for example)
    - filePath is the absolute path
  */
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  /*
    - specify the encoding to make sure readFile returns a string
  */
  const jsonData = await fs.readFile(filePath, "utf-8");
  const data: {
    products: Product[];
  } = JSON.parse(jsonData);
  return data.products;
};
