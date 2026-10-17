import { z } from "zod";

export const LeadSubmissionSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name (at least 2 letters)"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"),
  chosenDoubts: z.array(z.string()).min(1, "Please select at least 1 doubt").max(2, "Select up to 2 doubts"),
  score: z.number().int().min(0).max(6),
  mythsMissed: z.array(z.number()),
  source: z.enum(["meta", "website"]).default("website")
});

export type LeadSubmission = z.infer<typeof LeadSubmissionSchema>;

export type GameScreen =
  | "hook"
  | "doubts"
  | "quiz"
  | "readout"
  | "lead"
  | "thankyou";

export interface GameState {
  screen: GameScreen;
  chosenDoubts: string[];
  currentCardIndex: number;
  userAnswers: Record<number, "MYTH" | "FACT">;
  score: number;
  mythsMissed: number[];
  streak: number;
  maxStreak: number;
  soundEnabled: boolean;
  source: "meta" | "website";
}
