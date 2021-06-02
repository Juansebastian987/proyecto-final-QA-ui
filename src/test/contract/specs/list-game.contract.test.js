const { provider } = require("../config/init-pact");
const { Matchers } = require("@pact-foundation/pact");
import { GamesController } from  '../../../controllers'

describe("Given an game service", () => {
  describe("When a request to list games is made", () => {
    beforeAll(async () => {
      await provider.setup();
      await provider.addInteraction({
        state: "There are games",
        uponReceiving: "a request to get all games",
        withRequest: {
          method: "GET",
          path: "/games",
        },
        willRespondWith: {
          status: 200,
          body: Matchers.eachLike(
            {
              id: Matchers.like("1"),
              name: Matchers.like("Borderlands 3"),
              developer: Matchers.like("GearBox Software"),
              year: Matchers.like(2019),
              type: Matchers.like("Shooter"),
              console: Matchers.like("pc"),
            },
            { min: 1 }
          ),
        },
      });
    });

    it("Should return the correct data", async () => {
      const response = await GamesController.list();
      expect(response.data).toMatchSnapshot();

      await provider.verify()

    });

    afterAll(async () => {
      await provider.finalize();
    });
  });
});
