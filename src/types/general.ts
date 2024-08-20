type Contact = {
  id: string;
  name: string;
  phone: string;
  avatar: string;
};

type Message = {
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
};

type User = Contact & {
  sessionToken: string;
};

export type { Contact, Message, User };
