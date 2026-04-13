import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 50,
  duration: "15s",
};

export default function () {
  const randomUserId = Math.floor(Math.random() * 1000);

  const params = {
    headers: { "x-user-id": randomUserId.toString() },
  };

  const res = http.get("http://localhost:3000/sharded", params);
  check(res, { "status was 200": (r) => r.status === 200 });
}
