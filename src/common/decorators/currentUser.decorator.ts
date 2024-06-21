import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const currentUser=createParamDecorator(
    (data:never,ctx:ExecutionContext)=>{
        return ctx.switchToHttp().getRequest().CurrentUser
    }
)