import { CreateDuelDto } from "../dtos/CreateDuel.dto";
import {Request, Response} from "express"
import { collections } from "../services/database.service";
import { ObjectId } from "mongodb";

export async function getDuels(request:Request, response:Response) {
    try {
        const duels = (await collections.duels!.find({}).toArray()) as CreateDuelDto[];
            response.status(200).send(duels);
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).send(error.message);
        }
    }
}

export async function createDuel(request:Request<{},{}, CreateDuelDto>, response:Response) {
    const duelData = request.body as CreateDuelDto;

    duelData.date = new Date();
    
    const result = await collections.duels?.insertOne(duelData);

    return result
    ? response.status(201).send("Created a new duel.")
    : response.status(500).send("Failed to create a new duel.");
}

export async function updateDuel(request:Request<{duelId:string},{}, CreateDuelDto>,response:Response) {

    try {
        const duelData = request.body as CreateDuelDto;
        duelData.date = new Date();
        const duelId =  request.params.duelId;
        const query = {_id: new ObjectId(duelId)};

        const result = await collections.duels?.updateOne(query, {$set: duelData})

        return result
        ? response.status(201).send("Updated duel.")
        : response.status(500).send("Failed to update duel.");
    } catch (error) {
        if (error instanceof Error) {
            return response.status(500).send(error.message);
        }
    }

}

export async function deleteDuel(request:Request<{duelId:string},{},{}>, response:Response) {

    try {
        const duelId =  request.params.duelId;
        const query = {_id: new ObjectId(duelId)}
        const result = await collections.duels?.deleteOne(query)

        return result
        ? response.status(201).send("Deleted duel.")
        : response.status(500).send("Failed to delete duel.");
    } catch (error) {
        if (error instanceof Error) {
            return response.status(500).send(error.message);
        }
    }

}