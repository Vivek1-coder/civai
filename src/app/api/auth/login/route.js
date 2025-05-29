import { NextResponse } from "next/server";
import { LoginUserLogic } from "../../../../Controllers/UserController";
import { body, validationResult } from "express-validator";
import dbConnect from "../../../../lib/dbConnect";
import { serialize } from "cookie";

const validate = async (reqBody) => {
await body("email", "Invalid email").isEmail().run({ body: reqBody });
await body(
"password",
"Password must be at least 8 characters and alphanumeric"
)
.isAlphanumeric()
.isLength({ min: 8 })
.run({ body: reqBody });

const result = validationResult({ body: reqBody });
if (!result.isEmpty()) {
return result.array();
}
return null;
};

export async function POST(req) {
await dbConnect(); // Don't forget to await

try {
const bodyData = await req.json();
const errors = await validate(bodyData);
if (errors) {
return NextResponse.json({ errors }, { status: 400 });
}

const response = await LoginUserLogic(bodyData);

if (!response.success) {
  return NextResponse.json(response, { status: 401 });
}

// Set the cookie
const cookie = serialize("auth", response.token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60, // 1 hour
  path: "/",
});

const res = new NextResponse(
  JSON.stringify({ success: true, message: response.message }),
  {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie,
    },
  }
);

return res;
} catch (err) {
console.error("Login error:", err);
return NextResponse.json({ error: err.message }, { status: 500 });
}
}