import { NextResponse } from "next/server";
import { LeadSubmissionSchema } from "@/lib/schema";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = LeadSubmissionSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const lead = result.data;

    // Log the lead payload in structured JSON format
    console.log("==========================================");
    console.log(" [NEW STEER LEAD CAPTURED]");
    console.log(" Timestamp:", new Date().toISOString());
    console.log(" Name:", lead.name);
    console.log(" Phone:", lead.phone);
    console.log(" Doubts Selected:", lead.chosenDoubts.join(", "));
    console.log(" Score:", `${lead.score} / 6`);
    console.log(" Missed Cards (IDs):", lead.mythsMissed);
    console.log(" Source:", lead.source);
    console.log("==========================================");

    // =========================================================================
    // TODO: Connect external CRM / Google Sheets / WhatsApp Webhook:
    // Example:
    // await fetch(process.env.CRM_WEBHOOK_URL!, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(lead),
    // });
    // =========================================================================

    return NextResponse.json(
      {
        success: true,
        message: "Assessment request registered successfully",
        data: {
          name: lead.name,
          source: lead.source
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to process lead submission:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again."
      },
      { status: 500 }
    );
  }
}
