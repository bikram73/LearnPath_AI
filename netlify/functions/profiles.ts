import { getProfilesList } from "../../src/lib/recommendationEngine";

export async function handler(event: any, context: any) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(getProfilesList())
  };
}
