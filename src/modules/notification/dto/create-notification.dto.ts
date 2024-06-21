import { Content } from "src/common/class/content"
import { NotificationData } from "src/common/class/notificationData"

export class CreateNotificationDto {
    titile:string
    body:string
    icon:string
    vibration:Array<number>
    data:NotificationData
    actions:  Content  
}
