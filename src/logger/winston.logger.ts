import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

export const Transport =[
    new transports.File({
        filename:'log/error.log',
        level:'error',
        format:format.combine(format.timestamp(),format.json(),format.colorize())
    })
    , new transports.File({
        filename:'log/warn.log',
        level:'warn',
        format:format.combine(format.timestamp(),format.json(),format.colorize())
    })
    ,new transports.File({
        filename:'log/combine.log',
        format:format.combine(format.timestamp(),format.json(),format.colorize())
    }),
    new transports.Console({
        format:format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.colorize(),
            format.printf((info) =>{
                return `${info.timestamp} ${info.level} : ${info.message} ${info.stack}`
            })
        )
    })
]

