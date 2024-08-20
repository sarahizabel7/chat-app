import { act, renderHook } from "@testing-library/react";
import { useMessages } from "../useMessages";
import { useUserSession } from "../useUserSession";
import { useContacts } from "../useContacts";
import { useChat } from "../useChat";
import { vi, Mock } from "vitest";
import { Message } from "../../types";

vi.mock("../useUserSession");
vi.mock("../useContacts");
vi.mock("../useChat");

const mockedMessages = [
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

describe("useMessages", () => {
  beforeEach(() => {
    (useUserSession as Mock).mockReturnValue({
      loggedUser: { id: "1", name: "John Doe" },
    });
    (useContacts as Mock).mockReturnValue({
      contacts: [
        { id: "2", name: "Jane Smith" },
        { id: "3", name: "Alice Johnson" },
      ],
      selectedContactId: "2",
    });
    (useChat as Mock).mockReturnValue({
      chatMessages: new Map([["2", mockedMessages]]),
      setChatMessage: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return the messages", () => {
    const { result } = renderHook(() => useMessages());

    expect(result.current.messages).toEqual(mockedMessages);
  });

  it("should send a message", () => {
    const { result } = renderHook(() => useMessages());

    const message = "All good, thanks! How about you?";

    act(() => {
      result.current.sendMessage(message);
    });

    const expectedMessage: Message = {
      senderId: "1",
      receiverId: "2",
      content: message,
      createdAt: expect.any(String),
    };

    expect(useChat().setChatMessage).toHaveBeenCalledWith(expectedMessage, "2");
  });

  it("should receive a message", () => {
    const { result } = renderHook(() => useMessages());

    const message = "I'm good too, thanks!";

    act(() => {
      result.current.receiveMessage(message);
    });

    const expectedMessage: Message = {
      senderId: "2",
      receiverId: "1",
      content: message,
      createdAt: expect.any(String),
    };

    expect(useChat().setChatMessage).toHaveBeenCalledWith(expectedMessage, "2");
  });
});
