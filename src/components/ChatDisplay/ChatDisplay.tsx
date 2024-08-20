import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ChatMessage } from "../ChatMessage";
import { fakerEN as faker } from "@faker-js/faker";
import { grey } from "@mui/material/colors";
import { useMessages } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import { Message } from "../../types";

const Messages = ({ messages }: { messages: Message[] }) => {
  if (messages.length > 0) {
    return messages.map((message) => (
      <ChatMessage key={message.createdAt} message={message} />
    ));
  } else {
    return <Typography align="center">No messages</Typography>;
  }
};

const ChatDisplay = () => {
  const { messages, sendMessage, receiveMessage, loading } = useMessages();
  const [contentValue, setContentValue] = useState<string>("");

  const boxRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (contentValue) {
        sendMessage(contentValue);
        setContentValue("");

        receiveFakeMessage();
      }
    }
  };

  const receiveFakeMessage = () => {
    setTimeout(() => {
      const message = faker.lorem.paragraphs(1);

      receiveMessage(message);
    }, 1000);
  };

  useEffect(() => {
    const element = boxRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      component="div"
      display="flex"
      flexDirection="column"
      padding={0}
      gap={0}
      bgcolor={grey[200]}
      width={`calc(100vw - ${theme.sizes?.drawerWidth}px)`}
    >
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        overflow="auto"
        padding="16px"
        gap="8px"
        position="relative"
        flex="1 1 0px"
        order="2"
        ref={boxRef}
        justifyContent={loading ? "end" : "flex-start"}
        alignItems={loading ? "center" : "unset"}
      >
        {!loading ? (
          <Messages messages={messages} />
        ) : (
          <CircularProgress data-testid="loading-chat" />
        )}
      </Box>

      <TextField
        data-testid="chat-input"
        fullWidth
        multiline
        value={contentValue}
        placeholder="Type a message..."
        sx={{
          backgroundColor: "white",
          position: "relative",
          zIndex: 2,
          boxSizing: "border-box",
          flex: "none",
          order: 3,
          minHeight: 64,
          padding: 0,
        }}
        onChange={(e) => setContentValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
};

export { ChatDisplay };
