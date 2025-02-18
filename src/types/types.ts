export interface EmailHistory {
  history: EmailEntry[];
  from: string;
  to: string;
}

// Define the interface for each email entry
export interface EmailEntry {
  stats_id: string;
  type: "SENT" | "REPLY"; // Restricting type to specific values
  message_id: string;
  time: string; // ISO 8601 date string
  email_body: string;
  subject?: string; // Optional, as not all entries have a subject
  email_seq_number: string;
  open_count?: number; // Optional, as not all entries have this field
  click_count?: number; // Optional, as not all entries have this field
  click_details?: Record<string, unknown>; // Optional, as not all entries have this field
}

export type EmailCategory =
  | "INTERESTED"
  | "MORE INFO"
  | "MEETING"
  | "CASE STUDY"
  | "OBJECTION"
  | "MECHANISM";
