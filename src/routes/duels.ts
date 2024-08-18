import { Router } from "express";
import { getDuels, createDuel, updateDuel, deleteDuel } from "../handlers/duels";
import bodyParser, { BodyParser} from "body-parser";

const router = Router();

const jsonParser = bodyParser.json()
// /duels
router.get('/',  getDuels);

router.post('/', jsonParser, createDuel)

router.put("/:duelId", jsonParser, updateDuel)

router.delete("/:duelId", deleteDuel)

export default router; 