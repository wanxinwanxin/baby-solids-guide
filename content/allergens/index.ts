import type { AllergenProgram } from "@/content-schema/food";

import peanut from "./peanut";
import egg from "./egg";
import milk from "./milk";
import wheat from "./wheat";
import soy from "./soy";
import sesame from "./sesame";
import treeNut from "./tree-nut";
import fish from "./fish";
import shellfish from "./shellfish";

export const allergenPrograms: AllergenProgram[] = [
  peanut,
  egg,
  milk,
  wheat,
  soy,
  sesame,
  treeNut,
  fish,
  shellfish,
];
