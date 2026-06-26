import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, company, requirement } = body;

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email,
          phone,
          company,
          requirement,
        },
      ]);

    if (error) {
      console.log(error);

      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}