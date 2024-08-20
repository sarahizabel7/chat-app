import { createContext, useState, useEffect, useCallback } from "react";
import { Message } from "../../types";
import { useUserSession } from "../../hooks";
import { DEFAULT_API_TIMEOUT } from "../../consts";
import { messages as mockedMessages } from "../../mocks";

type ChatContextType = {
  chatMessages: Map<string, Message[]>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setChatMessage: (message: Message, contactId: string) => void;
};

const noop = () => {};
const ChatContext = createContext<ChatContextType>({
  chatMessages: new Map(),
  loading: true,
  setLoading: noop,
  setChatMessage: noop,
});

const ChatProvider = ({ children }: { children: React.ReactElement }) => {
  const { loggedUser } = useUserSession();
  const [messages, setMessages] = useState<Map<string, Message[]>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);

  const parseChat = useCallback(
    (messages: Message[]) => {
      const messagesMap = new Map<string, Message[]>();

      messages.forEach((message) => {
        const chatId =
          message.senderId === loggedUser?.id
            ? message.receiverId
            : message.senderId;

        if (messagesMap.has(chatId)) {
          messagesMap.set(chatId, [
            ...(messagesMap.get(chatId) || []),
            message,
          ]);
        } else {
          messagesMap.set(chatId, [message]);
        }
      });

      return messagesMap;
    },
    [loggedUser]
  );

  const fetchMessages = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      const parsedMessages = parseChat(mockedMessages);
      setMessages(parsedMessages);
      setLoading(false);
    }, DEFAULT_API_TIMEOUT);
  }, [parseChat]);

  const setChatMessage = useCallback(
    (message: Message, contactId: string) => {
      setMessages((oldMessages) => {
        const newMessages = new Map(oldMessages);
        newMessages.set(contactId, [
          ...(newMessages.get(contactId) || []),
          message,
        ]);
        return newMessages;
      });
    },

    []
  );

  useEffect(() => {
    if (loggedUser?.sessionToken) fetchMessages();
  }, [loggedUser?.sessionToken, fetchMessages]);

  return (
    <ChatContext.Provider
      value={{
        loading,
        chatMessages: messages,
        setLoading,
        setChatMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
export { ChatContext };
