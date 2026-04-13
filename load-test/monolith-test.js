import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 50,
  duration: "15s",
};

export default function () {
  const res = http.get("http://host.docker.internal:3000/monolith");
  check(res, { "status was 200": (r) => r.status === 200 });
}
