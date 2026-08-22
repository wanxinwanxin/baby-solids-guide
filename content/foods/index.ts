import type { Food } from "@/content-schema/food";
import almondButter from "./almond-butter";
import amaranth from "./amaranth";
import apple from "./apple";
import apricot from "./apricot";
import asparagus from "./asparagus";
import avocadoOil from "./avocado-oil";
import avocado from "./avocado";
import banana from "./banana";
import barley from "./barley";
import basil from "./basil";
import beef from "./beef";
import beet from "./beet";
import bellPepper from "./bell-pepper";
import bison from "./bison";
import blackBeans from "./black-beans";
import blackberry from "./blackberry";
import blueberry from "./blueberry";
import bread from "./bread";
import broccoli from "./broccoli";
import brusselsSprouts from "./brussels-sprouts";
import buckwheat from "./buckwheat";
import butter from "./butter";
import butternutSquash from "./butternut-squash";
import cabbage from "./cabbage";
import cannedTuna from "./canned-tuna";
import cantaloupe from "./cantaloupe";
import carrot from "./carrot";
import cashewButter from "./cashew-butter";
import cauliflower from "./cauliflower";
import celery from "./celery";
import cheese from "./cheese";
import cherries from "./cherries";
import chiaSeeds from "./chia-seeds";
import chicken from "./chicken";
import chickpeas from "./chickpeas";
import cilantro from "./cilantro";
import cinnamon from "./cinnamon";
import clementine from "./clementine";
import coconut from "./coconut";
import cod from "./cod";
import corn from "./corn";
import cottageCheese from "./cottage-cheese";
import couscous from "./couscous";
import crab from "./crab";
import cranberry from "./cranberry";
import cucumber from "./cucumber";
import cumin from "./cumin";
import dates from "./dates";
import dill from "./dill";
import duck from "./duck";
import edamame from "./edamame";
import egg from "./egg";
import eggplant from "./eggplant";
import farina from "./farina";
import fig from "./fig";
import flaxseed from "./flaxseed";
import ginger from "./ginger";
import goatCheese from "./goat-cheese";
import grapes from "./grapes";
import greenBeans from "./green-beans";
import guava from "./guava";
import halibut from "./halibut";
import hazelnutButter from "./hazelnut-butter";
import hempSeeds from "./hemp-seeds";
import honeydew from "./honeydew";
import hummus from "./hummus";
import kale from "./kale";
import kefir from "./kefir";
import kidneyBeans from "./kidney-beans";
import kiwi from "./kiwi";
import lamb from "./lamb";
import leek from "./leek";
import lentils from "./lentils";
import limaBeans from "./lima-beans";
import liver from "./liver";
import lychee from "./lychee";
import mango from "./mango";
import millet from "./millet";
import mint from "./mint";
import mungBeans from "./mung-beans";
import mushrooms from "./mushrooms";
import mussels from "./mussels";
import naan from "./naan";
import nectarine from "./nectarine";
import nori from "./nori";
import nutritionalYeast from "./nutritional-yeast";
import oatCereal from "./oat-cereal";
import oatmeal from "./oatmeal";
import okra from "./okra";
import oliveOil from "./olive-oil";
import onion from "./onion";
import orange from "./orange";
import oregano from "./oregano";
import paneer from "./paneer";
import papaya from "./papaya";
import paprika from "./paprika";
import parsnip from "./parsnip";
import pasta from "./pasta";
import peach from "./peach";
import peanutButter from "./peanut-butter";
import pear from "./pear";
import peas from "./peas";
import pecan from "./pecan";
import persimmon from "./persimmon";
import pineapple from "./pineapple";
import pintoBeans from "./pinto-beans";
import pistachio from "./pistachio";
import pita from "./pita";
import plum from "./plum";
import polenta from "./polenta";
import pomegranate from "./pomegranate";
import pork from "./pork";
import potato from "./potato";
import prunes from "./prunes";
import pumpkinSeedButter from "./pumpkin-seed-butter";
import pumpkin from "./pumpkin";
import quinoa from "./quinoa";
import radish from "./radish";
import raspberry from "./raspberry";
import riceNoodles from "./rice-noodles";
import rice from "./rice";
import ricotta from "./ricotta";
import salmon from "./salmon";
import sardines from "./sardines";
import scallops from "./scallops";
import shrimp from "./shrimp";
import snapPeas from "./snap-peas";
import soba from "./soba";
import sole from "./sole";
import spelt from "./spelt";
import spinach from "./spinach";
import splitPeas from "./split-peas";
import strawberry from "./strawberry";
import sunflowerSeedButter from "./sunflower-seed-butter";
import sweetPotato from "./sweet-potato";
import swissChard from "./swiss-chard";
import tahini from "./tahini";
import teff from "./teff";
import tempeh from "./tempeh";
import tilapia from "./tilapia";
import tofu from "./tofu";
import tomato from "./tomato";
import tortilla from "./tortilla";
import trout from "./trout";
import turkey from "./turkey";
import turmeric from "./turmeric";
import turnip from "./turnip";
import venison from "./venison";
import walnut from "./walnut";
import watermelon from "./watermelon";
import whiteBeans from "./white-beans";
import yogurt from "./yogurt";
import zucchini from "./zucchini";

/**
 * Aggregated food database. Each food lives in its own file; this index is
 * regenerated by `npm run gen:food-index` (scripts/gen-food-index.ts).
 */
export const allFoods: Food[] = [
  almondButter,
  amaranth,
  apple,
  apricot,
  asparagus,
  avocadoOil,
  avocado,
  banana,
  barley,
  basil,
  beef,
  beet,
  bellPepper,
  bison,
  blackBeans,
  blackberry,
  blueberry,
  bread,
  broccoli,
  brusselsSprouts,
  buckwheat,
  butter,
  butternutSquash,
  cabbage,
  cannedTuna,
  cantaloupe,
  carrot,
  cashewButter,
  cauliflower,
  celery,
  cheese,
  cherries,
  chiaSeeds,
  chicken,
  chickpeas,
  cilantro,
  cinnamon,
  clementine,
  coconut,
  cod,
  corn,
  cottageCheese,
  couscous,
  crab,
  cranberry,
  cucumber,
  cumin,
  dates,
  dill,
  duck,
  edamame,
  egg,
  eggplant,
  farina,
  fig,
  flaxseed,
  ginger,
  goatCheese,
  grapes,
  greenBeans,
  guava,
  halibut,
  hazelnutButter,
  hempSeeds,
  honeydew,
  hummus,
  kale,
  kefir,
  kidneyBeans,
  kiwi,
  lamb,
  leek,
  lentils,
  limaBeans,
  liver,
  lychee,
  mango,
  millet,
  mint,
  mungBeans,
  mushrooms,
  mussels,
  naan,
  nectarine,
  nori,
  nutritionalYeast,
  oatCereal,
  oatmeal,
  okra,
  oliveOil,
  onion,
  orange,
  oregano,
  paneer,
  papaya,
  paprika,
  parsnip,
  pasta,
  peach,
  peanutButter,
  pear,
  peas,
  pecan,
  persimmon,
  pineapple,
  pintoBeans,
  pistachio,
  pita,
  plum,
  polenta,
  pomegranate,
  pork,
  potato,
  prunes,
  pumpkinSeedButter,
  pumpkin,
  quinoa,
  radish,
  raspberry,
  riceNoodles,
  rice,
  ricotta,
  salmon,
  sardines,
  scallops,
  shrimp,
  snapPeas,
  soba,
  sole,
  spelt,
  spinach,
  splitPeas,
  strawberry,
  sunflowerSeedButter,
  sweetPotato,
  swissChard,
  tahini,
  teff,
  tempeh,
  tilapia,
  tofu,
  tomato,
  tortilla,
  trout,
  turkey,
  turmeric,
  turnip,
  venison,
  walnut,
  watermelon,
  whiteBeans,
  yogurt,
  zucchini,
];

export const foodBySlug = new Map(allFoods.map((f) => [f.slug, f]));
