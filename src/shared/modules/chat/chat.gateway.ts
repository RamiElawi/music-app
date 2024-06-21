import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { MessageService } from '../message/message.service';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserJoinRoom } from './entities/userJoinRoom.entity';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection,OnGatewayDisconnect{   
  
  constructor(
    private readonly messageService:MessageService,
    private readonly chatService:ChatService,
    private readonly userService:AuthService
  ){}




  @SubscribeMessage('enter chat room')
  async enterChatRoom(client:Socket ,data:{nickName:string,roomId:number}) {
    const user=await this.userService.findUserByUserName(data.nickName)
    const room=await this.chatService.findOne(data.roomId)
    let isUserJoindRoom=()=>
      user.userJoinRooms.some(userJoinedRoom=>userJoinedRoom.chatId==data.roomId)

    if(!isUserJoindRoom()){
      await this.chatService.addUserToRoom(room.id,user.id)
    }
  
    client.join(data.roomId.toString())
    client.broadcast.to(data.roomId.toString())
    .emit('userJoined',{user:data.nickName,event:'joined'}) 
  }

  @SubscribeMessage('leave room')
  async leaveRoom(client:Socket,data:{nickName:string,roomId:number}){
    client.leave(data.roomId.toString())
    client.broadcast.to(data.roomId.toString()).emit('userLeft',{user:data.nickName,event:'left'})
  }

  @SubscribeMessage('add message')
  async sendMessage(client:Socket,data:{text:string,roomId:number,nickName:string}){
    const user=await this.userService.findUserByUserName(data.nickName)
    const room=await this.chatService.findOne(data.roomId)
    let createMessageDto={text:data.text}
    const message=await this.messageService.create(createMessageDto,user.id,room.id)
    client.to(data.roomId.toString()).emit('snedMessage',message)
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('user connected')
  }
  handleDisconnect(client: any) {
    console.log('user disconnected')
  }
      


}
