import { useCallback } from "react";
import type { Message } from "../types";
import { useUserSession } from "./useUserSession";
import { useContacts } from "./useContacts";
import { compareAsc } from "date-fns";
import { useChat } from "./useChat";

const useMessages = () => {
  const { chatMessages, loading, setChatMessage } = useChat();
  const { loggedUser } = useUserSession();
  const { selectedContactId } = useContacts();

  const messages = chatMessages.get(selectedContactId) || [];

  const sendMessage = useCallback(
    (content: string) => {
      if (!loggedUser) return;

      const newMessage: Message = {
        senderId: loggedUser.id,
        receiverId: selectedContactId,
        content,
        createdAt: new Date().toISOString(),
      };
      setChatMessage(newMessage, selectedContactId);
    },
    [loggedUser, selectedContactId, setChatMessage]
  );

  // contactId is optional, on this test scenario we are using with selectedContactId
  // but in a future improvement, we could receive messages from anywhere
  const receiveMessage = useCallback(
    (content: string, contactId?: string) => {
      if (!loggedUser) return;

      const newMessage: Message = {
        senderId: contactId || selectedContactId,
        receiverId: loggedUser.id,
        content,
        createdAt: new Date().toISOString(),
      };

      setChatMessage(newMessage, contactId || selectedContactId);
    },
    [loggedUser, selectedContactId, setChatMessage]
  );

  const sortedMessages = messages.sort((a, b) =>
    compareAsc(new Date(a.createdAt), new Date(b.createdAt))
  );

  return {
    messages: sortedMessages,
    sendMessage,
    receiveMessage,
    loading,
  };
};

export { useMessages };
