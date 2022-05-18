import { defineStore } from "pinia";
import type { ChatRoom } from "@/models/ChatRoom";
import type { User } from "@/models/User";
import type { Chat } from "@/models/Chat";
import { ChatService } from "@/services/chat.service";

const chatService: ChatService = new ChatService();

export const ChatStore = defineStore({
  id: "ChatStore",
  state: () => ({
    chatRoom: "",
    chatRooms: [] as ChatRoom[],
    selectedChatRoom: {} as ChatRoom,
    isTyping: [] as User[],
    isListening: [] as string[],
  }),
  getters: {
    chatRoomSelected: (state) => {
      if (state.selectedChatRoom != undefined) return state.selectedChatRoom;
      return undefined;
    },
    userTyping: (state) => {
      if (state.isTyping != undefined) return state.isTyping;
      return undefined;
    },
  },
  actions: {
    createChat(text: string) {
      if (this.selectedChatRoom.uuid != null) {
        // console.log(this.selectedChatRoom);
        const user = JSON.parse(<string>localStorage.getItem("user")) as User;

        const chat: Chat = {
          text: text,
          chatRoom: this.selectedChatRoom.uuid,
          user: user,
          userUUID: user.uuid,
        };
        //  console.log(chat);
        chatService.createChat(chat);
      }
    },
    receiveChat(chat: Chat) {
      if (this.selectedChatRoom.uuid != null) {
        this.selectedChatRoom.chats.push(chat);
      }
    },
    loadChatRooms() {
      const user = JSON.parse(<string>localStorage.getItem("user")) as User;
      chatService.getAllChatRooms(user.uuid).then((listOFChatRooms) => {
        this.chatRooms = [];
        listOFChatRooms.forEach((chatRoom) => {
          this.chatRooms.push(chatRoom);
        });
      });
    },
    selectChatRoom(chatRoomas: any) {
      if (this.selectedChatRoom != undefined) {
        chatService.disconnectFromChatRoom(this.selectedChatRoom.uuid);
      }
      // console.log(chatRoomas);
      chatService.loadChatRoom(chatRoomas.uuid).then((chatRoom) => {
        this.selectedChatRoom = chatRoom;
        chatService.listenToChatRoom(chatRoomas.uuid, (chat) => {
          this.receiveChat(chat);
        });
      });
    },
    newChatRoom(name: string) {
      const user = JSON.parse(<string>localStorage.getItem("user")) as User;
      chatService.createChatRoom(name, user.uuid).then((chatRoom) => {
        this.chatRooms.push(chatRoom);
      });
    },
    onUserTyping(chat: Chat) {
      chat.chatRoom = this.chatRoom;
      chatService.userIsTyping(chat);
    },
    updateIsTyping() {
      if (this.isListening.indexOf("typing") == -1) {
        chatService.updateIsTyping((date: User[]) => {
          this.isTyping = [];
          date.forEach((user) => {
            if (
              this.isTyping.find((userr) => userr.uuid == user.uuid) == null
            ) {
              this.isTyping.push(user);
            }
          });
        });
        this.isListening.push("typing");
      }
    },
  },
});
