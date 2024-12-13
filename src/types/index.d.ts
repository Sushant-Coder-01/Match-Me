import { Prisma } from "@prisma/client";
import { ZodIssue } from "zod";

type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };

type MessageDto = {
  id: string;
  text: string;
  created: string;
  dateRead: string | null;
  messageState: string;
  senderId?: string;
  senderName?: string;
  senderImage?: string | null;
  recipientId?: string;
  recipientName?: string;
  recipientImage?: string | null;
};

type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
  select: {
    id: true;
    text: true;
    created: true;
    dateRead: true;
    messageState: true;
    sender: {
      select: { userId; name; image };
    };
    recipient: {
      select: { userId; name; image };
    };
  };
}>;

type GetMemberParams = {
  ageRange?: string;
  gender?: string;
  orderBy?: string;
  withPhoto?: string;
  pageNumber?: string;
  pageSize?: string;
};

type PaginatedResponse<T> = {
  items: T[];
  totalCount: number;
};

type UserFilters = {
  ageRange: number[];
  gender: string[];
  orderBy: string;
  withPhoto: boolean;
};

type PagingParams = {
  pageNumber: number;
  pageSize: number;
};

type PagingResult = {
  totalPages: number;
  totalCount: number;
} & PagingParams;

type Session = {
  user: {
    name: string;
    email: string;
    image: string;
    id: string;
  };
  expires: string;
}