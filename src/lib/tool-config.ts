import {
  Bot,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  Mail,
  Telescope,
  type LucideIcon,
} from "lucide-react";

import type { AssistantTool } from "./prompts";

export type FieldType = "input" | "textarea" | "select";

export type ToolField = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  hint?: string;
  options?: string[];
  rows?: number;
  required?: boolean;
};

export type ToolConfig = {
  slug: string;
  tool: AssistantTool;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  cta: string;
  fields: ToolField[];
};

export const NAV_ITEMS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email-generator", label: "Email Generator", icon: Mail },
  { to: "/meeting-notes", label: "Meeting Notes", icon: FileText },
  { to: "/task-planner", label: "Task Planner", icon: CalendarCheck },
  { to: "/research", label: "Research Assistant", icon: Telescope },
  { to: "/assistant", label: "AI Chatbot", icon: Bot },
];

export const TOOLS: Record<string, ToolConfig> = {
  "email-generator": {
    slug: "email-generator",
    tool: "email",
    title: "Smart Email Generator",
    tagline: "Professional emails in seconds",
    description:
      "Turn a few bullet points into a polished, on-tone workplace email with a clear subject line and call to action.",
    icon: Mail,
    cta: "Generate email",
    fields: [
      {
        name: "recipient",
        label: "Recipient",
        type: "input",
        placeholder: "e.g. Head of Finance, external client, whole team",
        required: true,
      },
      {
        name: "purpose",
        label: "Purpose of the email",
        type: "input",
        placeholder: "e.g. Request approval for Q3 tooling budget",
        required: true,
      },
      { name: "tone", label: "Tone", type: "select", options: ["Professional", "Friendly", "Direct", "Formal", "Apologetic", "Persuasive"] },
      { name: "length", label: "Length", type: "select", options: ["Short", "Medium", "Detailed"] },
      {
        name: "points",
        label: "Key points",
        type: "textarea",
        rows: 6,
        placeholder: "- Budget is R120k\n- Needed before 30 September\n- Covers two seats and onboarding",
        hint: "One point per line. Only facts you provide will be used.",
      },
      { name: "sender", label: "Your name & role", type: "input", placeholder: "Aliwanga Senti, Operations Lead" },
    ],
  },
  "meeting-notes": {
    slug: "meeting-notes",
    tool: "notes",
    title: "Meeting Notes Summarizer",
    tagline: "Decisions and action items, extracted",
    description:
      "Paste raw notes or a transcript and get a structured summary with decisions, owners, due dates and a follow-up email draft.",
    icon: FileText,
    cta: "Summarize notes",
    fields: [
      { name: "title", label: "Meeting title", type: "input", placeholder: "Weekly product sync" },
      { name: "attendees", label: "Attendees", type: "input", placeholder: "Aliwanga, Thabo, Sarah (client)" },
      { name: "detail", label: "Detail level", type: "select", options: ["Concise", "Balanced", "Comprehensive"] },
      {
        name: "notes",
        label: "Raw notes or transcript",
        type: "textarea",
        rows: 12,
        placeholder: "Paste your messy notes, bullet points or transcript here…",
        required: true,
      },
    ],
  },
  "task-planner": {
    slug: "task-planner",
    tool: "planner",
    title: "AI Task Planner",
    tagline: "From goal to time-blocked plan",
    description:
      "Describe a goal and your constraints. Get a prioritised task table, a suggested schedule, and a definition of done.",
    icon: CalendarCheck,
    cta: "Build plan",
    fields: [
      {
        name: "goal",
        label: "Goal or project",
        type: "input",
        placeholder: "Launch the customer onboarding revamp",
        required: true,
      },
      { name: "timeframe", label: "Timeframe", type: "select", options: ["Today", "This week", "Two weeks", "This month", "This quarter"] },
      { name: "capacity", label: "Available capacity", type: "input", placeholder: "e.g. 3 focused hours per day, 2 teammates" },
      {
        name: "tasks",
        label: "Known tasks, deadlines & constraints",
        type: "textarea",
        rows: 8,
        placeholder: "- Draft new welcome sequence\n- Legal review needed before launch\n- Design handover due Friday",
      },
      {
        name: "priority",
        label: "Prioritisation style",
        type: "select",
        options: ["Highest business impact first", "Quick wins first", "Deadline driven", "Unblock others first"],
      },
    ],
  },
  research: {
    slug: "research",
    tool: "research",
    title: "AI Research Assistant",
    tagline: "Briefing notes you can act on",
    description:
      "Get a structured internal brief on any topic, with findings, trade-offs, next steps and an explicit fact-check list.",
    icon: Telescope,
    cta: "Create brief",
    fields: [
      {
        name: "topic",
        label: "Topic or question",
        type: "input",
        placeholder: "How do mid-sized firms roll out AI tooling safely?",
        required: true,
      },
      { name: "audience", label: "Audience", type: "input", placeholder: "Executive team, engineering leads, client" },
      { name: "depth", label: "Depth", type: "select", options: ["Quick scan", "Standard brief", "Deep dive"] },
      {
        name: "angle",
        label: "Specific sub-questions or angle",
        type: "textarea",
        rows: 6,
        placeholder: "- What are the main compliance risks?\n- What does a 90-day rollout look like?",
      },
    ],
  },
};
