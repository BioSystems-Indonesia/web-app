import jwt from "jsonwebtoken"
import { env } from "process"

const SECRET_KEY = env.SECRET_KEY || ""

export interface claims {
    userId: string
    username: string
    role: string
}

export function generateToken(payload: claims){
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: "24h"
    })
}