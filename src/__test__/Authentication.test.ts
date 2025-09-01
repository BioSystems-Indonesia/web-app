import { Authentication } from "@/domain/authentication/Authentication";

describe("Authentication Entity", () => {
    it("should create authentication object correctly", () => {
        const auth = new Authentication("1", "jhondoe", "hasedpass", "admin")

        expect(auth.id).toBe("1");
        expect(auth.username).toBe("jhondoe");
        expect(auth.password).toBe("hasedpass");
        expect(auth.role).toBe("admin")
    });

    it("should allow undifined role", () => {
        const auth = new Authentication("2", "janedoe","hasedpass", undefined)

        expect(auth.role).toBeUndefined();
    });
})