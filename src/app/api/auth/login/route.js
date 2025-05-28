import { NextResponse } from "next/server";
import { LoginUserLogic } from "../../../../Controllers/UserController";
import { body, validationResult } from "express-validator";
import dbConnect from "../../../../lib/dbConnect";

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
  dbConnect();
  try {
    const bodyData = await req.json();
    const errors = await validate(bodyData);
    if (errors) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const response = await LoginUserLogic(bodyData); // Assume it returns a plain object
    return NextResponse.json(response);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
