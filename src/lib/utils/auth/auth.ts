import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

interface ProtectedFunction {
    (session?:any,props?:any):any
}

interface AuthOptions {
    ignore?:boolean

    /**
     * if specified the user must have one of the roles
     */
    roles?:string[]
}

export const withServerAuth = (fn: ProtectedFunction,options?:AuthOptions) => async (...props: any[]) => {
    try {
        const session = await getServerSession(authOptions)
        const user:any = session?.user
        
        if (!session || !user ) {
            if (options?.ignore) {
                return fn(session,...props)
            }else{
                return {
                    error : "Unauthorized",
                    status : 401,
                    message : "Unauthorized"
                }
            }
        }

        if(options?.roles && options?.roles.length > 0 && !options.roles.includes(user.role)){
            return {
                error : "Forbidden",
                status : 403,
                message : "User does not have the required role"
            }
        }

        return fn(session,...props)

    } catch (error) {
        console.log('WithServerAuth Error:',error)
        return {
            error : "Internal Server Error",
            status : 500,
            message : "Internal Server Error"
        }
    }
}