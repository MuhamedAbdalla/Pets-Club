import express from "express";
import { API, USER } from "../config";
import { Exception } from "../core/entities/exception";

export function makeExpressCallback(controller) {
    return (req: express.Request, res: express.Response) => {
        controller(req)
            .then((httpResponse: { type: string; statusCode: number; body: {} }) => {
                res.type(httpResponse.type);
                res.status(httpResponse.statusCode).send(httpResponse.body);
            })
            .catch((error) => {
                if (error instanceof Exception) {
                    res.status(400).send({ message: error.message });
                } else {
                    console.log(error);
                    console.log(req.body);
                    res.status(500).send({ message: "Something went wrong" });
                }
            });
    };
}
