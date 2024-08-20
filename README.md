# Chat App

This is a simplified chat application interface using React and Typescript.

The application has one page where the user can select a contact from a list and open a chat to send messages and see simulated replies.

## Tech stack

- [React](https://react.dev/reference/react)
- [Typescript](https://www.typescriptlang.org/docs/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Material UI](https://mui.com/material-ui/getting-started/)

## Features

- Contacts List: Users can select a contact from a list and view a simulated chat conversation.
- Sending Messages: The chat interface where users can type messages and submit them. These messages then appear in the chat view, simulating a conversation with another user.
- Message Display: Display all messages in a conversation view, where users can see their messages and simulated replies.

## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.

## Running the Project

1. Run the project using `npm run dev`.
2. Open your browser and navigate to `http://localhost:5173`.

## Running Tests

1. Run the tests using `npm run test`.

## Project Structure

- `src/` - Contains the source code files.
  - `components/ChatDisplay` - responsible to render the chat interface. Manages the state of the chat input field, allows sending and receiving messages and displays the messages by the selected contact.
  - `components/ChatMessage` - handles the rendering of an individual chat message, including the alignment of the message container and applying appropriate styling based on the sender of the message.
  - `components/ContactsList` - Displays a list of contacts, allowing the user to select a contact and perform an action when selected.
  - `hooks/useMessages` - custom hook that handles sending and receiving chat messages, retrieves the messages for the selected contact, and sorts them based on their creation time.
  - `hooks/useDetectDevice` - This custom hook can be used in a React component to conditionally render different content or apply different styles based on the detected device type. For example, you can use it to render a mobile-friendly layout for smaller screens and a desktop layout for larger screens. It uses the [useMediaQuery](https://mui.com/material-ui/react-use-media-query/) hook from [Material UI](https://mui.com/material-ui/getting-started/).
  - `hooks/useUserSession` - this hook is retrieving the current value of the `UserSessionContext` and returning it. This allows other components to use this hook to access the user session information without having to manually pass down props or manage state.
  - `hooks/useChat` - same as the previous but returning the `ChatContext`
  - `hooks/useContacts` - same as the previous but returning the `ContactsContext`
  - `mocks/` - Contains the mocks of the contacts and messages. Not all contacts have mocked messages.
  - `pages/` - Contains the pages of the application. In this case we only have `Home.tsx`
  - `providers/ChatProvider` - manages the state of chat messages, fetches messages asynchronously, and provides the necessary context and functions for other components to interact with the chat feature.
  - `providers/ContactsProvider` - manages the state and provides the necessary context for handling contacts-related data. It fetches the contacts data, updates the state variables, and allows child components to access and modify the contact data
  - `providers/UserSessionProvider` - encapsulates the user session state and provides it to its child components through a context, allowing them to access and update the logged-in user information as needed.
  - `types/` - Contains some of the common type definitions like `Contact`, `Message` and `User`.
- `public/` - Contains the public assets.

## Next improvements

- Add more tests to other components: Since the vitest and react testing library are already configured in the project should be simple to add new tests files.
  - For a react hook test example, check `src/hooks/useMessages/__tests__`
  - For a react component example, check `src/components/ChatDisplay/__tests__`
- Display more information about the messages like the date and time. Since this information is being saved and can be accessed from other components by using the `ChatContext`, it could be easily displayed inside the chat display but also in the contacts list (users could preview the last message of the chat in that list, for example)
- Implement more Skeleton components and standardize all loadings inside the app. One example of Skeleton component can be found at `src/components/ContactsList/ListItem/SkeletonList.tsx`
- Add more customization to the Material UI theme.
