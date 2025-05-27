/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from "@faker-js/faker";
import { User } from "../../models/user.model";

describe("User model", () => {
  describe("User validation", () => {
    let newUser = {} as any;
    beforeEach(() => {
      newUser = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: "password1",
      };
    });

    test("should correctly validate a valid user", async () => {
      expect(newUser).toHaveProperty("firstName");
      await expect(User.build(newUser).validate()).resolves.toBeUndefined();
    });
  });
});
