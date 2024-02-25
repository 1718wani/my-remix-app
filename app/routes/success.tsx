import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/features/Auth/services/authenticator";

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });
}

export default function Success() {
  return (
    <>
      <div>ログイン成功しました。</div>
      <div>
        <form action="/logout" method="post">
          <button type="submit">サインアウト</button>
        </form>
      </div>
    </>
  );
}
