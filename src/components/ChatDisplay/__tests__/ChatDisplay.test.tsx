import { render, screen } from "@testing-library/react";
import { ChatDisplay } from "../ChatDisplay";
import { vi, Mock } from "vitest";
import { useMessages } from "../../../hooks/useMessages";

vi.mock("../../../hooks/useMessages");

describe("ChatDisplay", () => {
  test("renders loading state when messages are loading", () => {
    (useMessages as Mock).mockReturnValue({
      loading: true,
      messages: [],
    });

    render(<ChatDisplay />);

    const loadingElement = screen.getAllByTestId("loading-chat");
    expect(loadingElement).toHaveLength(1);
  });

  test("renders messages when messages are available", () => {
    const messages = [
      {
        senderId: "1",
        receiverId: "2",
        content: "Hello",
        createdAt: "2024-06-01T15:00:00.000Z",
      },
      {
        senderId: "2",
        receiverId: "1",
        content: "Hello, how are you doing?",
        createdAt: "2024-06-01T16:00:00.000Z",
      },
    ];

    (useMessages as Mock).mockReturnValue({
      loading: false,
      messages,
    });

    render(<ChatDisplay />);

    const chatInput = screen.getAllByTestId("chat-input");
    expect(chatInput).toHaveLength(1);

    const chatMessage = screen.getAllByTestId("chat-message");
    expect(chatMessage).toHaveLength(messages.length);
  });

  test("renders no message info text when messages are not available", () => {
    (useMessages as Mock).mockReturnValue({
      loading: false,
      messages: [],
    });

    render(<ChatDisplay />);

    const noMessage = screen.getAllByTestId("no-message-info");
    expect(noMessage).toHaveLength(1);
  });
});
