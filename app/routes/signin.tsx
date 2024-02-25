import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/features/Auth/services/authenticator";
import { commitSession, getSession } from "~/features/Auth/sessionStrage";

export async function action({ request }: ActionFunctionArgs) {
  const userId = await authenticator.authenticate("user-signin", request, {
    failureRedirect: "/",
  });
  const session = await getSession(request.headers.get("cookie"));
  session.set(authenticator.sessionKey, userId);
  // commit the session
  const headers = new Headers({ "Set-Cookie": await commitSession(session) });
  return redirect("/success", { headers });
}

export default function Signin() {
  return (
    <>
      <Form method="post">
        <input type="email" name="email" required />
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
        <button>Sign In</button>
      </Form>
    </>
  );
}

