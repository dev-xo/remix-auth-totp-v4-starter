import { Authenticator } from "remix-auth";
import { TOTPStrategy } from "remix-auth-totp";
import { redirect } from "react-router";
import { getSession, commitSession } from "./session.server";

/**
 * Authenticator instance.
 *
 * The user object represents the authenticated user's data (Currently a "mock" user).
 * You may want to extend this type to match your database schema (e.g. add id, name, role, etc.).
 */
type User = {
  email: string;
};

export const authenticator = new Authenticator<User>();

/**
 * Authenticate the user using TOTP Strategy.
 * @param request
 */
authenticator.use(
  new TOTPStrategy(
    {
      /**
       * Generate a 64-character secret: https://www.grc.com/passwords.htm
       */
      secret: process.env.ENCRYPTION_SECRET || "",
      emailSentRedirect: "/auth/verify",
      magicLinkPath: "/auth/verify",
      successRedirect: "/dashboard",
      failureRedirect: "/auth/verify",
      cookieOptions: {
        // Safari doesn't support secure cookies on localhost.
        ...(process.env.NODE_ENV === "production" ? { secure: true } : {}),
      },
      sendTOTP: async ({ email, code, magicLink }) => {
        /**
         * TODO: Implement email sending functionality.
         *
         * This is where you would call your email service to send the verification code.
         * Parameters available:
         * @param email - The user's email address.
         * @param code - The 6-digit verification code.
         * @param magicLink - The verification link containing the code.
         */

        // My email sending function.
        // await sendEmail(email, code, magicLink);

        // Development Only.
        console.log({
          email,
          code,
          magicLink,
        });
      },
    },
    async ({ email, request }) => {
      /**
       * TODO: Implement user lookup functionality.
       *
       * This is where you would call your database to look up the user.
       * If the user is not found, you may want to create a new user.
       *
       * Parameters available:
       * @param email - The user's email address.
       */

      // My lookup / create user function.
      // const user = await findUserByEmail(email);

      // Development Only.
      // Create a "mock" user.
      const user = {
        email: email,
      };

      // Store user in session.
      const session = await getSession(request.headers.get("Cookie"));
      session.set("user", user);

      // Commit session.
      const sessionCookie = await commitSession(session);

      // Redirect to your authenticated route.
      throw redirect("/dashboard", {
        headers: {
          "Set-Cookie": sessionCookie,
        },
      });
    }
  )
);
