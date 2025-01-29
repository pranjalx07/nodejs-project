import { z } from "zod";
const createUserSchema = z.object({
    fullName: z.string(),
    email: z.string(),
    password: z.string(),
    
})