import { users, quacks } from './mocks';
import { createToken } from '../src/libs/jwt';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_DATA_DELAY = 300;
const QUACKS_LIMIT = 20;
const QUACK_TEXT_LIMIT = 250;

type MockDbUser = (typeof users)[number];
type MockDbQuack = (typeof quacks)[number];

function getAuthUser(dbUser: MockDbUser) {
  return {
    id: dbUser.id,
    name: dbUser.name,
    userName: dbUser.userName,
    profileImageUrl: dbUser.profileImageUrl,
  };
}

export default {
  Query: {
    async users() {
      await sleep(MOCK_DATA_DELAY);

      return users;
    },
    async user(_: unknown, { userName }: MockDbUser) {
      await sleep(MOCK_DATA_DELAY);

      return users.find((user) => user.userName === userName);
    },
    async quacks() {
      await sleep(MOCK_DATA_DELAY);

      return quacks.slice(0, QUACKS_LIMIT);
    },
  },
  Mutation: {
    async signIn() {
      await sleep(MOCK_DATA_DELAY);
      const user = getAuthUser(users[0]);
      const token = createToken(user);

      return {
        user,
        token,
      };
    },
    async signUp(
      _: unknown,
      { email, password, name, userName }: MockDbUser & { password: string },
    ) {
      await sleep(MOCK_DATA_DELAY);

      if (
        users.find(
          (user) =>
            user.userName.toLowerCase() === userName.trim().toLowerCase(),
        )
      ) {
        throw Error('This username is already taken');
      }

      if (
        users.find(
          (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
        )
      ) {
        throw Error('User with this email is already registered');
      }

      const id = users.length + 1;
      const profileImageUrl = `https://eu.ui-avatars.com/api/?size=128&name=${encodeURIComponent(
        name.trim(),
      )}`;

      const dbUser = {
        id,
        name: name.trim(),
        userName: userName.trim(),
        email: email.trim(),
        profileImageUrl,
      };

      const user = getAuthUser(dbUser);
      const token = createToken(user);

      users.push(dbUser);

      return { user, token };
    },
    async addQuack(_: unknown, { userId, text }: MockDbQuack) {
      await sleep(MOCK_DATA_DELAY);

      if (!(text || '').trim()) {
        throw Error('No text provided');
      }

      if (text.trim().length > QUACK_TEXT_LIMIT) {
        throw Error('Text is too long');
      }

      const user = users.find((user) => user.id === userId);
      if (!user) {
        throw Error('User not found');
      }

      const quack = {
        id: quacks.length + 1,
        createdAt: new Date().toISOString(),
        userId,
        text,
      };

      quacks.splice(0, 0, quack);

      return quack;
    },
  },
  User: {
    quacks({ id }: MockDbQuack) {
      return quacks
        .filter((quack) => quack.userId === id)
        .slice(0, QUACKS_LIMIT);
    },
  },
  Quack: {
    user({ userId }: MockDbQuack) {
      return users.find((user) => user.id === userId);
    },
  },
};
