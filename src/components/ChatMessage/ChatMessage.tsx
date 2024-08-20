import { Box, styled, Typography } from "@mui/material";
import { Message } from "../../types";
import { indigo } from "@mui/material/colors";
import { useUserSession } from "../../hooks";

type ChatMessageProps = {
  message: Message;
};

const ChatMessage = ({ message }: ChatMessageProps) => {
  const { loggedUser } = useUserSession();
  const sentByMe = message.senderId === loggedUser?.id;

  return (
    <Box
      data-testid="chat-message"
      display="flex"
      justifyContent={sentByMe ? "flex-end" : "flex-start"}
    >
      <MessageContainer
        sentbyme={sentByMe}
        data-testid="message-container"
        sx={{ my: 1 }}
      >
        <Typography sx={{ wordWrap: "break-word" }}>
          {message.content}
        </Typography>
      </MessageContainer>
    </Box>
  );
};

export { ChatMessage };

const MessageContainer = styled("div", {
  name: "MessageContainer",
  slot: "root",
  shouldForwardProp: (prop) => prop !== "sentbyme",
})<{ sentbyme?: boolean }>(({ theme, sentbyme }) => ({
  backgroundColor: sentbyme ? indigo[400] : theme.palette.background.default,
  color: sentbyme ? theme.palette.common.white : theme.palette.text.primary,
  borderRadius: 7.5,
  padding: 10,
  maxWidth: "50%",
}));
