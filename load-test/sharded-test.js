import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 50,
  duration: "15s",
};

const BASE_URL = __ENV.BASE_URL || "http://host.docker.internal:3000";

export default function () {
  const randomUserId = Math.floor(Math.random() * 1000);

  const params = {
    headers: { "x-user-id": randomUserId.toString() },
  };

  const res = http.get(`${BASE_URL}/sharded`, params);
  check(res, { "status was 200": (r) => r.status === 200 });
}
