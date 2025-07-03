import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Simple validation
    const requiredFields = [
      "email",
      "phone",
      "address",
      "firstName",
      "lastName",
      "landmark",
      "city",
      "state",
      "products",
      "totalAmount",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Mock: process order logic (save to DB, send email, etc.)
    console.log("New Order:", body);

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
