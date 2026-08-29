import React, { useState, useMemo, useEffect } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area,
} from "recharts";
import {
  Search, Bell, ChevronDown, ChevronRight, Menu, X, LayoutDashboard, Map,
  Briefcase, Users, TrendingUp, GraduationCap, Building2, BarChart3,
  ClipboardList, ShieldCheck, Settings, FileText, Sparkles, AlertTriangle,
  Target, ArrowUpRight, ArrowDownRight, CheckCircle2, Clock, XCircle,
  PhoneOff, User, Landmark, Lock, ArrowLeft, Download, Filter, Calendar,
  ChevronLeft, Award, Activity, PieChart as PieIcon, MapPin, Layers,
  UserCheck, Percent, IndianRupee, ClipboardCheck, HelpCircle, Eye,
  FileBarChart, BadgeCheck, Info, Wallet,
} from "lucide-react";

/* ============================= DESIGN TOKENS ============================= */
const C = {
  navy: "#0A2647",
  navyDark: "#071A33",
  navySoft: "#12345F",
  blue: "#1B4B91",
  saffron: "#E07A1F",
  saffronSoft: "#FBEBDA",
  bg: "#F5F6F8",
  panel: "#FFFFFF",
  border: "#E1E5EC",
  text: "#151B26",
  muted: "#636B78",
  faint: "#8A93A3",
  success: "#1B7A4D",
  successBg: "#E7F4ED",
  warn: "#B5650A",
  warnBg: "#FCEEDD",
  danger: "#AF2A22",
  dangerBg: "#FBEAE8",
  info: "#1B4B91",
  infoBg: "#E9EFF9",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

const fmtINR = (n) => "\u20B9" + Math.round(n).toLocaleString("en-IN");
const fmtNum = (n) => Math.round(n).toLocaleString("en-IN");

/* ============================= MOCK DATA ============================= */
const DISTRICTS = [
  { name: "Pune", trainees: 18420, placement: 86, employment: 81, salary: 21800, retention: 74, skillGap: 14 },
  { name: "Mumbai", trainees: 21230, placement: 84, employment: 79, salary: 24500, retention: 71, skillGap: 18 },
  { name: "Nashik", trainees: 12680, placement: 79, employment: 74, salary: 18200, retention: 69, skillGap: 22 },
  { name: "Nagpur", trainees: 11040, placement: 76, employment: 71, salary: 17600, retention: 66, skillGap: 24 },
  { name: "Thane", trainees: 14290, placement: 80, employment: 76, salary: 20100, retention: 70, skillGap: 19 },
  { name: "Kolhapur", trainees: 8340, placement: 82, employment: 77, salary: 17100, retention: 72, skillGap: 16 },
  { name: "Chhatrapati Sambhajinagar", trainees: 7210, placement: 74, employment: 69, salary: 16400, retention: 63, skillGap: 27 },
  { name: "Solapur", trainees: 6480, placement: 71, employment: 66, salary: 15600, retention: 60, skillGap: 29 },
  { name: "Nanded", trainees: 5320, placement: 70, employment: 65, salary: 15100, retention: 59, skillGap: 30 },
  { name: "Amravati", trainees: 4980, placement: 72, employment: 67, salary: 15400, retention: 61, skillGap: 28 },
  { name: "Satara", trainees: 5610, placement: 78, employment: 73, salary: 16900, retention: 68, skillGap: 20 },
  { name: "Sangli", trainees: 4870, placement: 75, employment: 70, salary: 16200, retention: 64, skillGap: 23 },
];

const PROGRAMMES = [
  { name: "Digital Skills", provider: "Maharashtra IT Skill Council", trainees: 24680, completion: 91, placement: 84, salary: 23400, retention: 76, status: "Excellent" },
  { name: "Healthcare Assistance", provider: "Yashwantrao Chavan Health Academy", trainees: 15230, completion: 88, placement: 81, salary: 19800, retention: 73, status: "Excellent" },
  { name: "Advanced Manufacturing", provider: "MSDS Industrial Training Trust", trainees: 19840, completion: 85, placement: 77, salary: 20600, retention: 68, status: "Good" },
  { name: "Retail & Services", provider: "Pratibha Skill Foundation", trainees: 14320, completion: 82, placement: 73, salary: 16200, retention: 64, status: "Good" },
  { name: "Construction Technology", provider: "Bandhkam Kamgar Kalyan Board", trainees: 10940, completion: 78, placement: 69, salary: 17800, retention: 58, status: "Needs Improvement" },
  { name: "Agriculture Technology", provider: "Krishi Vigyan Skilling Mission", trainees: 8760, completion: 74, placement: 65, salary: 15100, retention: 55, status: "Needs Improvement" },
];

const PROVIDERS = [
  { name: "Maharashtra IT Skill Council", trainees: 24680, completion: 91, employment: 84, salary: 23400, retention: 76, rating: "Excellent" },
  { name: "Yashwantrao Chavan Health Academy", trainees: 15230, completion: 88, employment: 81, salary: 19800, retention: 73, rating: "Excellent" },
  { name: "MSDS Industrial Training Trust", trainees: 19840, completion: 85, employment: 77, salary: 20600, retention: 68, rating: "Good" },
  { name: "Pratibha Skill Foundation", trainees: 14320, completion: 82, employment: 73, salary: 16200, retention: 64, rating: "Good" },
  { name: "Bandhkam Kamgar Kalyan Board", trainees: 10940, completion: 78, employment: 69, salary: 17800, retention: 58, rating: "Needs Improvement" },
  { name: "Krishi Vigyan Skilling Mission", trainees: 8760, completion: 74, employment: 65, salary: 15100, retention: 55, rating: "Needs Improvement" },
  { name: "Vidarbha Livelihood Mission", trainees: 6120, completion: 68, employment: 58, salary: 14200, retention: 47, rating: "At Risk" },
  { name: "Konkan Coastal Skill Trust", trainees: 5430, completion: 71, employment: 61, salary: 15800, retention: 51, rating: "At Risk" },
];

const SKILLS = [
  { name: "Electric Vehicle Technician", demand: 12450, available: 7840, growth: 28 },
  { name: "Artificial Intelligence & ML", demand: 9860, available: 4210, growth: 34 },
  { name: "Data Analytics", demand: 11200, available: 6540, growth: 22 },
  { name: "Solar Installation", demand: 8340, available: 5120, growth: 19 },
  { name: "Cybersecurity", demand: 7120, available: 2980, growth: 31 },
  { name: "CNC Operation", demand: 6480, available: 5640, growth: 8 },
  { name: "Healthcare Assistance", demand: 10230, available: 8760, growth: 12 },
  { name: "Digital Marketing", demand: 9040, available: 8890, growth: 6 },
];

const EMP_STATUS = [
  { name: "Employed", value: 72.8, color: C.navy },
  { name: "Self-employed", value: 9.6, color: C.saffron },
  { name: "Apprenticeship", value: 5.4, color: C.blue },
  { name: "Seeking employment", value: 8.7, color: C.warn },
  { name: "Other / Unverified", value: 3.5, color: C.faint },
];

const SALARY_PROGRESSION = [
  { stage: "Completion", salary: 18700 },
  { stage: "3 Months", salary: 20100 },
  { stage: "6 Months", salary: 22800 },
  { stage: "12 Months", salary: 25600 },
  { stage: "24 Months", salary: 29400 },
];

const ATTRITION_REASONS = [
  { name: "Low salary", value: 27 },
  { name: "Better opportunity", value: 22 },
  { name: "Relocation", value: 18 },
  { name: "Skill mismatch", value: 15 },
  { name: "Workplace conditions", value: 11 },
  { name: "Personal reasons", value: 7 },
];

const NON_PLACEMENT = [
  { name: "Skill mismatch", value: 32 },
  { name: "Lack of local opportunities", value: 24 },
  { name: "Low interview readiness", value: 18 },
  { name: "Location constraints", value: 12 },
  { name: "Salary expectations", value: 8 },
  { name: "Other", value: 6 },
];

const AI_INSIGHTS = [
  {
    type: "Skill Gap Alert", tone: "warn", icon: AlertTriangle,
    title: "Electric Vehicle Technician",
    body: "Demand has increased 28% in the last 12 months while certified talent availability remains limited across Pune and Nashik divisions.",
    cta: "View Skill Gap", page: "skillgap",
  },
  {
    type: "Retention Risk", tone: "danger", icon: TrendingUp,
    title: "Manufacturing cohorts, Vidarbha region",
    body: "Manufacturing trainees in Nagpur and Amravati districts show a 14% higher 6-month attrition rate than the state average.",
    cta: "Investigate", page: "attrition",
  },
  {
    type: "Programme Opportunity", tone: "success", icon: Sparkles,
    title: "Digital Skills programme",
    body: "Digital skills programmes demonstrate 18% higher employment outcomes than the state average, with the fastest salary progression.",
    cta: "View Programme", page: "programmes",
  },
  {
    type: "Policy Recommendation", tone: "info", icon: Target,
    title: "Expand technical training capacity",
    body: "Increase advanced technical training capacity in high-demand districts \u2014 Pune, Mumbai and Nashik \u2014 to close the EV and AI skill gap by 2027.",
    cta: "View Recommendation", page: "policy",
  },
];

const TRAINEE = {
  id: "MH-SK-2026-084521",
  name: "Rahul Deshmukh",
  programme: "Digital Skills",
  provider: "Maharashtra IT Skill Council",
  district: "Pune",
  certification: "Certified \u2014 Full Stack Web Development, Level 4 NSQF",
  status: "Employed",
  employer: "NeoTech Software Solutions Pvt. Ltd.",
  role: "Junior Software Developer",
  startingSalary: 18700,
  currentSalary: 22500,
  duration: "8 months",
  retention: "On track",
  timeline: [
    { label: "Training Completed", date: "January 2026", verified: true },
    { label: "Placement", date: "March 2026", verified: true },
    { label: "3-Month Follow-up", date: "June 2026", verified: true },
    { label: "6-Month Follow-up", date: "September 2026", verified: true },
    { label: "12-Month Follow-up", date: "March 2027", verified: false },
  ],
};

/* ============================= NAV STRUCTURE ============================= */
const GOV_NAV = [
  { group: "Overview", items: [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "stateoverview", label: "State Overview", icon: Map },
  ]},
  { group: "Outcomes", items: [
    { key: "employment", label: "Employment Outcomes", icon: Briefcase },
    { key: "selfemployment", label: "Self Employment", icon: UserCheck },
    { key: "apprenticeship", label: "Apprenticeships", icon: GraduationCap },
    { key: "retention", label: "Job Retention", icon: ShieldCheck },
    { key: "salary", label: "Salary Progression", icon: IndianRupee },
  ]},
  { group: "Training Intelligence", items: [
    { key: "programmes", label: "Training Programmes", icon: ClipboardList },
    { key: "providers", label: "Provider Performance", icon: Building2 },
    { key: "courseeffect", label: "Course Effectiveness", icon: BarChart3 },
    { key: "skillgap", label: "Skill Gap Analysis", icon: Target },
  ]},
  { group: "People & Cohorts", items: [
    { key: "cohorts", label: "Trainee Cohorts", icon: Users },
    { key: "district", label: "District Analytics", icon: Map },
    { key: "demographic", label: "Demographic Analytics", icon: PieIcon },
    { key: "followup", label: "Follow-up Status", icon: Clock },
  ]},
  { group: "Impact", items: [
    { key: "impact", label: "Programme Impact", icon: TrendingUp },
    { key: "longitudinal", label: "Longitudinal Outcomes", icon: Activity },
    { key: "comparison", label: "Outcome Comparison", icon: Layers },
  ]},
  { group: "Intelligence", items: [
    { key: "aiinsights", label: "AI Insights", icon: Sparkles },
    { key: "attrition", label: "Risk & Attrition Alerts", icon: AlertTriangle },
    { key: "policy", label: "Policy Recommendations", icon: Target },
  ]},
  { group: "Administration", items: [
    { key: "employer", label: "Employer Verification", icon: BadgeCheck },
    { key: "dataquality", label: "Data Quality", icon: ClipboardCheck },
    { key: "reports", label: "Reports", icon: FileText },
    { key: "settings", label: "Settings", icon: Settings },
  ]},
];

const TRAINEE_NAV = [
  { group: "My Dashboard", items: [
    { key: "t-overview", label: "Overview", icon: LayoutDashboard },
    { key: "t-training", label: "My Training", icon: GraduationCap },
    { key: "t-employment", label: "My Employment", icon: Briefcase },
    { key: "t-followup", label: "My Follow-ups", icon: Clock },
    { key: "t-skills", label: "My Skills", icon: Target },
    { key: "t-career", label: "Career Progress", icon: TrendingUp },
    { key: "t-profile", label: "Update Profile", icon: User },
    { key: "t-consent", label: "Consent & Privacy", icon: Lock },
    { key: "t-help", label: "Help", icon: HelpCircle },
  ]},
];

const PAGE_TITLES = {
  dashboard: ["Maharashtra Skill Outcomes Dashboard", "Track training outcomes, employment and long-term livelihood impact across Maharashtra."],
  stateoverview: ["State Overview", "A statewide snapshot of the skilling and employment ecosystem."],
  employment: ["Employment Outcomes", "Placement, employment and status breakdown across all skilling programmes."],
  selfemployment: ["Self Employment Outcomes", "Trainees who have started their own enterprise or livelihood activity."],
  apprenticeship: ["Apprenticeship Outcomes", "Trainees placed into recognised apprenticeship pathways."],
  retention: ["Job Retention", "Employment retention measured at 3, 6, 12 and 24 months."],
  salary: ["Salary Progression", "Median wage growth of trainees after training completion."],
  programmes: ["Training Programme Performance", "Compare outcomes across the state's skilling programmes."],
  providers: ["Training Provider Intelligence", "Ranking and performance of empanelled training providers."],
  courseeffect: ["Course Effectiveness", "Effectiveness of individual courses against employment outcomes."],
  skillgap: ["Skill Gap Intelligence", "Identify the skills Maharashtra's labour market needs and compare them with available trained talent."],
  cohorts: ["Trainee Cohorts", "Cohort-wise enrolment and outcome tracking."],
  district: ["District Employment Intelligence", "District-level placement, employment, salary and retention analytics."],
  demographic: ["Demographic Analytics", "Outcome patterns across gender, age and social categories."],
  followup: ["Outcome Follow-up Centre", "Manage 3, 6 and 12-month trainee follow-ups."],
  impact: ["Programme Impact", "Measured impact of skilling programmes on livelihoods."],
  longitudinal: ["Longitudinal Impact Measurement", "Track outcomes across the full trainee journey \u2014 from training to 24 months of employment."],
  comparison: ["Outcome Comparison", "Compare cohorts, programmes and districts side by side."],
  aiinsights: ["AI-Powered Policy Insights", "Actionable insights generated from employment and training outcome patterns."],
  attrition: ["Retention & Attrition Intelligence", "Understand where and why trainees are leaving employment."],
  policy: ["Policy Recommendations", "Evidence-based recommendations for programme and resource allocation."],
  employer: ["Employer Verification Centre", "Validate employer-reported placement and salary information."],
  dataquality: ["Data Quality", "Monitor completeness and consistency of outcome data."],
  reports: ["Government Reports & Decision Support", "Generate and export reports for policy and planning use."],
  settings: ["Settings", "Platform and account configuration."],
  nonplacement: ["Reasons for Non-Placement", "Understand why trainees are not being placed, and recommended interventions."],
};

/* ============================= SMALL UI PRIMITIVES ============================= */
function Badge({ tone = "info", children }) {
  const map = {
    success: { bg: C.successBg, fg: C.success },
    warn: { bg: C.warnBg, fg: C.warn },
    danger: { bg: C.dangerBg, fg: C.danger },
    info: { bg: C.infoBg, fg: C.info },
    neutral: { bg: "#EEF0F3", fg: C.muted },
  };
  const t = map[tone] || map.info;
  return (
    <span style={{
      background: t.bg, color: t.fg, fontSize: 12, fontWeight: 600,
      padding: "3px 10px", borderRadius: 4, display: "inline-flex",
      alignItems: "center", gap: 5, letterSpacing: 0.2,
    }}>{children}</span>
  );
}

const ratingTone = (r) => r === "Excellent" ? "success" : r === "Good" ? "info" : r === "Needs Improvement" ? "warn" : "danger";

function ProgressBar({ value, max = 100, color = C.navy, track = "#EAECF1", height = 8 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ background: track, height, borderRadius: 3, width: "100%", overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 3 }} />
    </div>
  );
}

function Card({ children, style, ...rest }) {
  return (
    <div style={{
      background: C.panel, border: `1px solid ${C.border}`, borderRadius: 8,
      ...style,
    }} {...rest}>{children}</div>
  );
}

function SectionTitle({ eyebrow, title, subtitle, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, gap: 16, flexWrap: "wrap" }}>
      <div>
        {eyebrow && <div style={{ fontSize: 11.5, fontWeight: 700, color: C.saffron, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 22, fontWeight: 600, color: C.navy, margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ color: C.muted, fontSize: 13.5, margin: "6px 0 0", maxWidth: 640 }}>{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, delta, sub, mono = true }) {
  const up = delta >= 0;
  return (
    <Card style={{ padding: "18px 20px", flex: 1, minWidth: 220 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 12.5, color: C.muted, fontWeight: 600 }}>{label}</div>
        <div style={{ width: 30, height: 30, borderRadius: 6, background: C.saffronSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={15} color={C.saffron} />
        </div>
      </div>
      <div style={{ fontFamily: mono ? "'IBM Plex Mono', monospace" : "inherit", fontSize: 28, fontWeight: 600, color: C.navy, margin: "10px 0 4px" }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
        <span style={{ display: "flex", alignItems: "center", color: up ? C.success : C.danger, fontWeight: 700 }}>
          {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{Math.abs(delta)}%
        </span>
        <span style={{ color: C.faint }}>{sub}</span>
      </div>
    </Card>
  );
}

function Btn({ children, variant = "primary", onClick, icon: Icon, style, size = "md" }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer",
    fontWeight: 600, fontSize: size === "sm" ? 12.5 : 13.5, borderRadius: 6,
    padding: size === "sm" ? "7px 12px" : "9px 16px", border: "1px solid transparent",
    transition: "all .15s", whiteSpace: "nowrap",
  };
  const variants = {
    primary: { background: C.navy, color: "#fff" },
    saffron: { background: C.saffron, color: "#fff" },
    outline: { background: "#fff", color: C.navy, border: `1px solid ${C.border}` },
    ghost: { background: "transparent", color: C.navy },
  };
  return (
    <button onClick={onClick} style={{ ...base, ...variants[variant], ...style }}>
      {Icon && <Icon size={14} />}{children}
    </button>
  );
}

function EmptyPlaceholder({ title }) {
  return (
    <Card style={{ padding: "60px 30px", textAlign: "center" }}>
      <div style={{ width: 46, height: 46, borderRadius: 10, background: C.infoBg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <Layers size={20} color={C.blue} />
      </div>
      <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 18, color: C.navy, fontWeight: 600, marginBottom: 6 }}>{title}</div>
      <div style={{ color: C.muted, fontSize: 13.5, maxWidth: 420, margin: "0 auto" }}>
        This module is scoped for the full platform build. In this SIH prototype, the core outcome-tracking flow is fully interactive \u2014 explore Dashboard, Employment Outcomes, District Analytics, Skill Gap, Programmes, Follow-ups and Longitudinal Impact.
      </div>
    </Card>
  );
}

/* District heat strip \u2014 signature motif */
function DistrictHeatStrip({ data, metric = "employment", onSelect, compact }) {
  const max = Math.max(...data.map(d => d[metric]));
  const min = Math.min(...data.map(d => d[metric]));
  const colorFor = (v) => {
    const t = (v - min) / (max - min || 1);
    const r = Math.round(10 + t * (10));
    // interpolate navy -> saffron
    const from = [10, 38, 71], to = [224, 122, 31];
    const mix = from.map((f, i) => Math.round(f + (to[i] - f) * t));
    return `rgb(${mix.join(",")})`;
  };
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {data.map((d) => (
        <div key={d.name} onClick={() => onSelect && onSelect(d)}
          title={`${d.name}: ${d[metric]}%`}
          style={{
            width: compact ? 30 : 40, height: compact ? 30 : 40, borderRadius: 4,
            background: colorFor(d[metric]), cursor: onSelect ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, color: "#fff", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace",
          }}>
        </div>
      ))}
    </div>
  );
}

/* ============================= LANDING PAGE ============================= */
function Emblem({ size = 46, dark }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      border: `2px solid ${dark ? "rgba(255,255,255,.55)" : C.navy}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", flexShrink: 0,
    }}>
      <div style={{
        width: size - 12, height: size - 12, borderRadius: "50%",
        border: `1px solid ${dark ? "rgba(255,255,255,.4)" : C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontFamily: "'Source Serif 4', serif", fontWeight: 700,
          fontSize: size * 0.32, color: dark ? "#fff" : C.navy,
        }}>MH</span>
      </div>
    </div>
  );
}

function FeatureRow({ icon: Icon, title, body }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{
        width: 36, height: 36, borderRadius: 7, background: "rgba(255,255,255,.08)",
        border: "1px solid rgba(255,255,255,.16)", display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={16} color={C.saffron} />
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: "#fff", marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.65)", lineHeight: 1.5 }}>{body}</div>
      </div>
    </div>
  );
}

function Landing({ onLogin }) {
  const [mode, setMode] = useState(null); // 'trainee' | 'gov'
  const [step, setStep] = useState("choose"); // choose | credentials

  const strip = useMemo(() => DISTRICTS, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif", background: C.bg }}>
      <div style={{ display: "flex", flex: 1, minHeight: "100vh", flexWrap: "wrap" }}>
        {/* LEFT */}
        <div style={{
          flex: "1 1 560px", background: `linear-gradient(180deg, ${C.navyDark} 0%, ${C.navy} 100%)`,
          color: "#fff", padding: "44px 56px", display: "flex", flexDirection: "column",
          justifyContent: "space-between", position: "relative", overflow: "hidden", minHeight: "100vh",
        }}>
          <div style={{ position: "absolute", right: -80, top: -80, width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(255,255,255,.06)" }} />
          <div style={{ position: "absolute", right: -30, top: 40, width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(255,255,255,.06)" }} />

          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 30 }}>
              <Emblem dark size={44} />
              <div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.75)", fontWeight: 600 }}>Government of Maharashtra</div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)" }}>Dept. of Skills, Employment, Entrepreneurship &amp; Innovation</div>
              </div>
            </div>

            <h1 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 40, lineHeight: 1.15, fontWeight: 600, margin: "0 0 14px", maxWidth: 560 }}>
              Maharashtra Skill Outcomes &amp; Impact Platform
            </h1>
            <div style={{ fontSize: 15.5, color: C.saffron, fontWeight: 600, marginBottom: 14 }}>
              "Track skills. Measure employment. Build better livelihoods."
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.7)", lineHeight: 1.65, maxWidth: 500, marginBottom: 34 }}>
              A unified, consent-based platform for tracking training outcomes, employment, skill gaps, retention
              and long-term livelihood impact across Maharashtra.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, maxWidth: 520 }}>
              <FeatureRow icon={Briefcase} title="Employment Tracking" body="Track placement, employment and self-employment outcomes." />
              <FeatureRow icon={Clock} title="Longitudinal Follow-ups" body="Monitor trainees at 3, 6 and 12-month intervals." />
              <FeatureRow icon={Target} title="Skill Gap Intelligence" body="Identify emerging skill shortages and mismatches." />
              <FeatureRow icon={TrendingUp} title="Impact Analytics" body="Measure employment, salary progression and retention." />
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "rgba(255,255,255,.45)", marginBottom: 10, fontWeight: 700 }}>
              District employment signal, live cohort
            </div>
            <DistrictHeatStrip data={strip} metric="employment" compact />
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.12)" }}>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)", marginBottom: 8, fontWeight: 600 }}>Trusted by Maharashtra's skilling ecosystem</div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.7)" }}>Training Providers &nbsp;\u2022&nbsp; Employers &nbsp;\u2022&nbsp; Government Departments &nbsp;\u2022&nbsp; Trainees</div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ flex: "1 1 420px", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 28px" }}>
          <div style={{ width: "100%", maxWidth: 420 }}>
            {step === "choose" && (
              <>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 23, fontWeight: 600, color: C.navy, marginBottom: 6 }}>
                  Access Maharashtra Skill Outcomes Platform
                </div>
                <div style={{ color: C.muted, fontSize: 13.5, marginBottom: 26 }}>Select your account type to continue.</div>

                <div onClick={() => { setMode("trainee"); setStep("credentials"); }}
                  style={{ border: `1.5px solid ${C.border}`, borderRadius: 8, padding: 18, marginBottom: 14, cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 7, background: C.infoBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <User size={19} color={C.blue} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 15, marginBottom: 2 }}>Trainee</div>
                    <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 10 }}>Track your training, employment and career outcomes.</div>
                    <Btn variant="primary" size="sm">Login as Trainee</Btn>
                  </div>
                </div>

                <div onClick={() => { setMode("gov"); setStep("credentials"); }}
                  style={{ border: `1.5px solid ${C.border}`, borderRadius: 8, padding: 18, marginBottom: 20, cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 7, background: C.saffronSoft, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Landmark size={19} color={C.saffron} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 15, marginBottom: 2 }}>Government / Admin</div>
                    <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 10 }}>Monitor programmes, outcomes and statewide impact.</div>
                    <Btn variant="saffron" size="sm">Login as Government</Btn>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 20 }}>
                  <span style={{ color: C.blue, fontWeight: 600, cursor: "pointer" }}>New Trainee? Register Now</span>
                  <span style={{ color: C.blue, fontWeight: 600, cursor: "pointer" }}>Govt. official sign-in</span>
                </div>
              </>
            )}

            {step === "credentials" && (
              <>
                <div onClick={() => setStep("choose")} style={{ display: "flex", alignItems: "center", gap: 6, color: C.muted, fontSize: 12.5, marginBottom: 18, cursor: "pointer", fontWeight: 600 }}>
                  <ArrowLeft size={14} /> Back
                </div>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 22, fontWeight: 600, color: C.navy, marginBottom: 4 }}>
                  {mode === "trainee" ? "Trainee Login" : "Government Sign-in"}
                </div>
                <div style={{ color: C.muted, fontSize: 13, marginBottom: 22 }}>
                  {mode === "trainee" ? "Enter your registered mobile number to continue." : "Sign in with your official government account."}
                </div>

                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.text, marginBottom: 6, display: "block" }}>
                  {mode === "trainee" ? "Mobile Number" : "Government Email ID"}
                </label>
                <input placeholder={mode === "trainee" ? "+91 98XXXXXX21" : "name@maharashtra.gov.in"} style={inputStyle} />

                <label style={{ fontSize: 12.5, fontWeight: 600, color: C.text, marginBottom: 6, display: "block", marginTop: 14 }}>Password</label>
                <input type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" style={inputStyle} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "12px 0 20px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: C.muted }}>
                    <input type="checkbox" /> Remember me
                  </label>
                  <span style={{ fontSize: 12.5, color: C.blue, fontWeight: 600, cursor: "pointer" }}>Forgot password?</span>
                </div>

                <Btn variant={mode === "trainee" ? "primary" : "saffron"} style={{ width: "100%", justifyContent: "center", padding: "11px 0", marginBottom: 10 }} onClick={() => onLogin(mode)}>
                  {mode === "trainee" ? "Login as Trainee" : "Login as Government Official"}
                </Btn>
                <Btn variant="outline" style={{ width: "100%", justifyContent: "center", padding: "11px 0" }} onClick={() => onLogin(mode)}>
                  Continue with OTP
                </Btn>
              </>
            )}

            <div style={{ marginTop: 34, paddingTop: 18, borderTop: `1px solid ${C.border}`, display: "flex", flexWrap: "wrap", gap: 14, fontSize: 11.5, color: C.faint }}>
              <span>Privacy &amp; Consent</span><span>Accessibility</span><span>Help</span><span>Contact</span>
            </div>
            <div style={{ fontSize: 11, color: C.faint, marginTop: 10 }}>\u00A9 Government of Maharashtra \u2014 SIH 2026 Prototype, not an official live service.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 6, border: `1px solid ${C.border}`,
  fontSize: 13.5, fontFamily: "inherit", boxSizing: "border-box", outline: "none",
};

/* ============================= SHELL: SIDEBAR + HEADER ============================= */
function Sidebar({ nav, active, onNavigate, role, collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(7,26,51,.5)", zIndex: 40 }} />}
      <div style={{
        width: collapsed ? 72 : 250, background: C.navyDark, color: "#fff", flexShrink: 0,
        display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0,
        transition: "width .15s", zIndex: 45,
        ...(typeof window !== "undefined" && window.innerWidth < 900 ? {
          position: "fixed", left: mobileOpen ? 0 : -280, width: 250, transition: "left .2s",
        } : {}),
      }}>
        <div style={{ padding: collapsed ? "18px 14px" : "18px 20px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 10 }}>
          <Emblem dark size={30} />
          {!collapsed && <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 14.5, fontWeight: 700, lineHeight: 1.2 }}>Maharashtra<br />Skill Outcomes</div>}
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "10px 10px" }}>
          {nav.map((group) => (
            <div key={group.group} style={{ marginBottom: 14 }}>
              {!collapsed && <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: 0.8, color: "rgba(255,255,255,.35)", fontWeight: 700, padding: "6px 10px" }}>{group.group}</div>}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.key;
                return (
                  <div key={item.key} onClick={() => { onNavigate(item.key); setMobileOpen && setMobileOpen(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 6,
                      cursor: "pointer", marginBottom: 2, fontSize: 13, fontWeight: isActive ? 700 : 500,
                      background: isActive ? "rgba(224,122,31,.16)" : "transparent",
                      color: isActive ? "#fff" : "rgba(255,255,255,.68)",
                      borderLeft: isActive ? `2.5px solid ${C.saffron}` : "2.5px solid transparent",
                    }}>
                    <Icon size={15} style={{ flexShrink: 0 }} />
                    {!collapsed && <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.saffron, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
            {role === "gov" ? "GA" : "RD"}
          </div>
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {role === "gov" ? "Government Administrator" : "Rahul Deshmukh"}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)" }}>{role === "gov" ? "Maharashtra State" : "Trainee \u2022 Pune"}</div>
            </div>
          )}
          <ChevronDown size={14} color="rgba(255,255,255,.5)" />
        </div>
      </div>
    </>
  );
}

function TopHeader({ title, subtitle, onMenu, onLogout, role, filters }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifications = [
    "12 follow-ups are due this week.",
    "Employment data for 3 providers requires verification.",
    "New skill gap detected in Electric Vehicle Technology.",
  ];
  return (
    <div style={{ background: C.panel, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 30 }}>
      <div style={{ padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <button onClick={onMenu} style={{ display: "none", border: "none", background: "none", cursor: "pointer" }} className="mobile-menu-btn"><Menu size={20} /></button>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 19, fontWeight: 600, color: C.navy }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12.5, color: C.muted, marginTop: 2 }}>{subtitle}</div>}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {role === "gov" && (
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search size={14} color={C.faint} style={{ position: "absolute", left: 10 }} />
              <input placeholder="Search trainees, programmes, providers, districts..." style={{ ...inputStyle, width: 260, padding: "8px 10px 8px 30px", fontSize: 12.5 }} />
            </div>
          )}
          {role === "gov" && <Btn variant="outline" icon={Download} size="sm">Export Report</Btn>}
          <div style={{ position: "relative" }}>
            <div onClick={() => setNotifOpen(!notifOpen)} style={{ width: 34, height: 34, borderRadius: 6, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
              <Bell size={16} color={C.navy} />
              <span style={{ position: "absolute", top: 6, right: 7, width: 6, height: 6, borderRadius: "50%", background: C.saffron }} />
            </div>
            {notifOpen && (
              <div style={{ position: "absolute", right: 0, top: 42, width: 300, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, boxShadow: "0 8px 24px rgba(10,38,71,.14)", zIndex: 50 }}>
                <div style={{ padding: "12px 14px", fontWeight: 700, fontSize: 13, borderBottom: `1px solid ${C.border}` }}>Notifications</div>
                {notifications.map((n, i) => (
                  <div key={i} style={{ padding: "11px 14px", fontSize: 12.5, color: C.text, borderBottom: i < notifications.length - 1 ? `1px solid ${C.border}` : "none" }}>{n}</div>
                ))}
              </div>
            )}
          </div>
          <div onClick={onLogout} style={{ width: 34, height: 34, borderRadius: "50%", background: C.saffronSoft, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: 700, fontSize: 12.5, color: C.saffron }}>
            {role === "gov" ? "GA" : "RD"}
          </div>
        </div>
      </div>
      {filters}
    </div>
  );
}

function FilterBar({ children }) {
  return (
    <div style={{ padding: "0 28px 14px", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
      {children}
    </div>
  );
}
function FilterChip({ icon: Icon, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 12.5, color: C.text, cursor: "pointer", background: "#fff" }}>
      <Icon size={13} color={C.muted} /> {label} <ChevronDown size={12} color={C.muted} />
    </div>
  );
}

/* ============================= CHARTS ============================= */
function DonutChartCard({ title, data }) {
  return (
    <Card style={{ padding: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 14 }}>{title}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <ResponsiveContainer width={180} height={180}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={52} outerRadius={78} paddingAngle={2}>
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip formatter={(v) => v + "%"} />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ flex: 1, minWidth: 140 }}>
          {data.map((d) => (
            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontSize: 12.5 }}>
              <span style={{ width: 9, height: 9, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <span style={{ color: C.text, flex: 1 }}>{d.name}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: C.navy }}>{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function SalaryLineChart({ data = SALARY_PROGRESSION, title = "Median Salary Progression" }) {
  return (
    <Card style={{ padding: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 14 }}>{title}</div>
      <ResponsiveContainer width="100%" height={230}>
        <AreaChart data={data} margin={{ left: -10, right: 10, top: 5 }}>
          <defs>
            <linearGradient id="salGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.saffron} stopOpacity={0.28} />
              <stop offset="100%" stopColor={C.saffron} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#EEF0F3" vertical={false} />
          <XAxis dataKey="stage" tick={{ fontSize: 11.5, fill: C.muted }} axisLine={{ stroke: C.border }} tickLine={false} />
          <YAxis tick={{ fontSize: 11.5, fill: C.muted }} axisLine={false} tickLine={false} tickFormatter={(v) => "\u20B9" + v / 1000 + "k"} />
          <Tooltip formatter={(v) => fmtINR(v)} contentStyle={{ fontSize: 12.5, borderRadius: 6, border: `1px solid ${C.border}` }} />
          <Area type="monotone" dataKey="salary" stroke={C.navy} strokeWidth={2.5} fill="url(#salGrad)" dot={{ r: 3.5, fill: C.navy }} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

function ProgrammeBarChart({ data = PROGRAMMES, dataKey = "placement", title = "Training Programme Performance", labelKey = "name" }) {
  return (
    <Card style={{ padding: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 14 }}>{title}</div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
          <CartesianGrid stroke="#EEF0F3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} tickFormatter={(v) => v + "%"} />
          <YAxis dataKey={labelKey} type="category" width={150} tick={{ fontSize: 11.5, fill: C.text }} axisLine={false} tickLine={false} />
          <Tooltip formatter={(v) => v + "%"} contentStyle={{ fontSize: 12.5, borderRadius: 6, border: `1px solid ${C.border}` }} />
          <Bar dataKey={dataKey} fill={C.navy} radius={[0, 4, 4, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

function SimpleBarChart({ data, dataKey = "value", title, color = C.saffron, formatter = (v) => v + "%" }) {
  return (
    <Card style={{ padding: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 14 }}>{title}</div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ left: -10, right: 10 }}>
          <CartesianGrid stroke="#EEF0F3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 10.5, fill: C.muted }} axisLine={{ stroke: C.border }} tickLine={false} interval={0} angle={-18} textAnchor="end" height={70} />
          <YAxis tick={{ fontSize: 11, fill: C.muted }} axisLine={false} tickLine={false} />
          <Tooltip formatter={formatter} contentStyle={{ fontSize: 12.5, borderRadius: 6, border: `1px solid ${C.border}` }} />
          <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

/* ============================= GOV: DASHBOARD ============================= */
function GovDashboard({ navigate }) {
  return (
    <div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <KpiCard icon={Users} label="Total Trainees" value={fmtNum(124580)} delta={8.4} sub="from previous cohort" />
        <KpiCard icon={Briefcase} label="Employment Rate" value="72.8%" delta={4.6} sub="YoY" />
        <KpiCard icon={IndianRupee} label="Avg. Starting Salary" value={fmtINR(18700)} delta={7.2} sub="YoY" />
        <KpiCard icon={ShieldCheck} label="12-Month Retention" value="68.4%" delta={5.1} sub="YoY" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }} className="grid-2">
        <Card style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy }}>Employment by District</div>
            <span onClick={() => navigate("district")} style={{ fontSize: 12, color: C.blue, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 3 }}>View all <ChevronRight size={13} /></span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {DISTRICTS.slice(0, 8).map((d) => (
              <div key={d.name} onClick={() => navigate("district")} style={{ width: 110, cursor: "pointer" }}>
                <div style={{ fontSize: 11.5, color: C.text, fontWeight: 600, marginBottom: 5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</div>
                <ProgressBar value={d.employment} color={d.employment > 75 ? C.success : d.employment > 68 ? C.saffron : C.warn} />
                <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", color: C.muted, marginTop: 4 }}>{d.employment}%</div>
              </div>
            ))}
          </div>
        </Card>
        <DonutChartCard title="Employment Status" data={EMP_STATUS} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }} className="grid-2">
        <SalaryLineChart />
        <ProgrammeBarChart />
      </div>

      <SectionTitle eyebrow="Decision Support" title="AI-Powered Policy Insights" subtitle="Actionable insights generated from employment and training outcome patterns." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        {AI_INSIGHTS.map((ins, i) => <InsightCard key={i} insight={ins} navigate={navigate} />)}
      </div>
    </div>
  );
}

function InsightCard({ insight, navigate }) {
  const Icon = insight.icon;
  const toneMap = { warn: C.warn, danger: C.danger, success: C.success, info: C.info };
  return (
    <Card style={{ padding: 18, borderTop: `3px solid ${toneMap[insight.tone]}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: toneMap[insight.tone] + "1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={14} color={toneMap[insight.tone]} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: toneMap[insight.tone], textTransform: "uppercase", letterSpacing: 0.4 }}>{insight.type}</span>
      </div>
      <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 6 }}>{insight.title}</div>
      <p style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.55, marginBottom: 14, minHeight: 60 }}>{insight.body}</p>
      <Btn variant="outline" size="sm" icon={ArrowUpRight} onClick={() => navigate(insight.page)}>{insight.cta}</Btn>
    </Card>
  );
}

/* ============================= GOV: EMPLOYMENT OUTCOMES ============================= */
function EmploymentOutcomes({ navigate }) {
  return (
    <div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <KpiCard icon={Briefcase} label="Employed" value="72.8%" delta={4.6} sub="of tracked trainees" />
        <KpiCard icon={UserCheck} label="Self-employed" value="9.6%" delta={2.1} sub="of tracked trainees" />
        <KpiCard icon={GraduationCap} label="Apprenticeship" value="5.4%" delta={0.8} sub="of tracked trainees" />
        <KpiCard icon={Clock} label="Seeking Employment" value="8.7%" delta={-1.4} sub="of tracked trainees" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="grid-2">
        <DonutChartCard title="Employment Status Breakdown" data={EMP_STATUS} />
        <SimpleBarChart data={NON_PLACEMENT} title="Reasons for Non-Placement" color={C.danger} />
      </div>
      <SectionTitle title="Employment Outcomes by Programme" subtitle="Placement and current employment rate across active skilling programmes." right={<Btn variant="outline" icon={Eye} size="sm" onClick={() => navigate("nonplacement")}>View Non-Placement Detail</Btn>} />
      <DataTable
        columns={["Programme", "Trainees", "Placement", "Employment", "Avg. Salary", "Status"]}
        rows={PROGRAMMES.map(p => [p.name, fmtNum(p.trainees), p.placement + "%", p.employment + "%", fmtINR(p.salary), <Badge tone={ratingTone(p.status)}>{p.status}</Badge>])}
      />
    </div>
  );
}

/* ============================= DATA TABLE ============================= */
function DataTable({ columns, rows, onRowClick }) {
  return (
    <Card style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
        <thead>
          <tr style={{ background: "#FAFBFC" }}>
            {columns.map((c) => (
              <th key={c} style={{ textAlign: "left", padding: "11px 16px", fontSize: 11.5, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 0.3, borderBottom: `1px solid ${C.border}` }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} onClick={() => onRowClick && onRowClick(i)} style={{ cursor: onRowClick ? "pointer" : "default" }}>
              {r.map((cell, j) => (
                <td key={j} style={{ padding: "13px 16px", fontSize: 13, color: C.text, borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : "none", fontFamily: typeof cell === "string" && /[\u20B9%]|^[\d,]+$/.test(cell) ? "'IBM Plex Mono', monospace" : "inherit" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/* ============================= GOV: DISTRICT ANALYTICS ============================= */
function DistrictAnalytics({ navigate, setSelectedTrainee }) {
  const [selected, setSelected] = useState(DISTRICTS[0]);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16, marginBottom: 20 }} className="grid-2">
        <Card style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 4 }}>Maharashtra \u2014 District Employment Map</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>Click a district to view its outcome profile.</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {DISTRICTS.map((d) => (
              <div key={d.name} onClick={() => setSelected(d)}
                style={{
                  padding: "10px 12px", borderRadius: 6, cursor: "pointer", minWidth: 96,
                  border: selected.name === d.name ? `1.5px solid ${C.navy}` : `1px solid ${C.border}`,
                  background: selected.name === d.name ? C.infoBg : "#fff",
                }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: C.text, marginBottom: 4 }}>{d.name}</div>
                <div style={{ fontSize: 15, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: d.employment > 75 ? C.success : d.employment > 68 ? C.saffron : C.danger }}>{d.employment}%</div>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15.5, color: C.navy, marginBottom: 2 }}>{selected.name}</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>District outcome profile</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Stat label="Trainees" value={fmtNum(selected.trainees)} />
            <Stat label="Placement Rate" value={selected.placement + "%"} />
            <Stat label="Employment Rate" value={selected.employment + "%"} />
            <Stat label="Avg. Salary" value={fmtINR(selected.salary)} />
            <Stat label="12M Retention" value={selected.retention + "%"} />
            <Stat label="Skill Gap Index" value={selected.skillGap + "%"} />
          </div>
          <Btn variant="primary" size="sm" style={{ marginTop: 16 }} onClick={() => navigate("trainee")}>View Sample Trainee Profile</Btn>
        </Card>
      </div>

      <SectionTitle title="District Comparison" subtitle="Compare outcome metrics across all 12 tracked districts." />
      <DataTable
        columns={["District", "Trainees", "Placement", "Employment", "Avg Salary", "12M Retention", "Skill Gap"]}
        rows={DISTRICTS.map(d => [d.name, fmtNum(d.trainees), d.placement + "%", d.employment + "%", fmtINR(d.salary), d.retention + "%", d.skillGap + "%"])}
      />
    </div>
  );
}
function Stat({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 18, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: C.navy }}>{value}</div>
    </div>
  );
}

/* ============================= GOV: SKILL GAP ============================= */
function SkillGap() {
  const sorted = [...SKILLS].sort((a, b) => (b.demand - b.available) - (a.demand - a.available));
  return (
    <div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <KpiCard icon={Target} label="Tracked Skills" value="48" delta={12} sub="active skill categories" />
        <KpiCard icon={AlertTriangle} label="Critical Shortages" value="9" delta={20} sub="skills, gap &gt; 40%" />
        <KpiCard icon={Sparkles} label="Emerging Skills" value="14" delta={31} sub="growth &gt; 20% YoY" />
        <KpiCard icon={Percent} label="Oversupplied Skills" value="6" delta={-5} sub="available &gt; demand" />
      </div>

      <SectionTitle title="High Demand Skills" subtitle="Demand vs. available trained talent, ranked by absolute skill gap." />
      <div style={{ display: "grid", gap: 12, marginBottom: 26 }}>
        {sorted.map((s) => {
          const gap = s.demand - s.available;
          const pctAvail = (s.available / s.demand) * 100;
          return (
            <Card key={s.name} style={{ padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy }}>{s.name}</div>
                <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                  <span style={{ color: C.muted }}>Demand: <b style={{ color: C.text, fontFamily: "'IBM Plex Mono', monospace" }}>{fmtNum(s.demand)}</b></span>
                  <span style={{ color: C.muted }}>Available: <b style={{ color: C.text, fontFamily: "'IBM Plex Mono', monospace" }}>{fmtNum(s.available)}</b></span>
                  <span style={{ color: C.danger }}>Gap: <b style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{fmtNum(gap)}</b></span>
                  <Badge tone={s.growth > 25 ? "danger" : s.growth > 15 ? "warn" : "success"}>+{s.growth}% growth</Badge>
                </div>
              </div>
              <ProgressBar value={pctAvail} color={pctAvail < 55 ? C.danger : pctAvail < 75 ? C.warn : C.success} />
            </Card>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="grid-3">
        <Card style={{ padding: 18 }}>
          <Badge tone="danger">Critical Skill Shortages</Badge>
          <ul style={{ margin: "12px 0 0", paddingLeft: 18, fontSize: 12.5, color: C.text, lineHeight: 2 }}>
            <li>Electric Vehicle Technician</li><li>Cybersecurity</li><li>Artificial Intelligence &amp; ML</li>
          </ul>
        </Card>
        <Card style={{ padding: 18 }}>
          <Badge tone="warn">Emerging Skills</Badge>
          <ul style={{ margin: "12px 0 0", paddingLeft: 18, fontSize: 12.5, color: C.text, lineHeight: 2 }}>
            <li>Data Analytics</li><li>Solar Installation</li><li>Battery Diagnostics</li>
          </ul>
        </Card>
        <Card style={{ padding: 18 }}>
          <Badge tone="success">Oversupplied Skills</Badge>
          <ul style={{ margin: "12px 0 0", paddingLeft: 18, fontSize: 12.5, color: C.text, lineHeight: 2 }}>
            <li>Digital Marketing</li><li>CNC Operation</li><li>Retail Sales Associate</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

/* ============================= GOV: PROGRAMMES ============================= */
function TrainingProgrammes({ navigate }) {
  return (
    <div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <KpiCard icon={ClipboardList} label="Total Programmes" value="42" delta={6} sub="statewide" />
        <KpiCard icon={Building2} label="Active Providers" value="186" delta={9} sub="empanelled" />
        <KpiCard icon={Users} label="Total Trainees" value={fmtNum(124580)} delta={8.4} sub="cumulative" />
        <KpiCard icon={IndianRupee} label="Avg. Placement Salary" value={fmtINR(19700)} delta={5.4} sub="YoY" />
      </div>
      <FilterBar>
        <FilterChip icon={Filter} label="District" />
        <FilterChip icon={Filter} label="Sector" />
        <FilterChip icon={Filter} label="Status" />
      </FilterBar>
      <SectionTitle title="Programme Performance" subtitle="Click a programme to view its detailed analytics." />
      <DataTable
        columns={["Programme", "Provider", "Trainees", "Completion", "Placement", "Avg Salary", "Retention", "Status"]}
        rows={PROGRAMMES.map(p => [p.name, p.provider, fmtNum(p.trainees), p.completion + "%", p.placement + "%", fmtINR(p.salary), p.retention + "%", <Badge tone={ratingTone(p.status)}>{p.status}</Badge>])}
        onRowClick={() => navigate("programmedetail")}
      />
    </div>
  );
}

function ProgrammeDetail({ navigate }) {
  const p = PROGRAMMES[0];
  return (
    <div>
      <div onClick={() => navigate("programmes")} style={{ display: "flex", alignItems: "center", gap: 6, color: C.blue, fontSize: 12.5, fontWeight: 600, cursor: "pointer", marginBottom: 16 }}>
        <ArrowLeft size={14} /> Back to Programmes
      </div>
      <SectionTitle eyebrow="Programme" title={p.name} subtitle={`Delivered by ${p.provider}`} right={<Badge tone={ratingTone(p.status)}>{p.status}</Badge>} />
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <KpiCard icon={Users} label="Trainees Enrolled" value={fmtNum(p.trainees)} delta={7.1} sub="this cycle" />
        <KpiCard icon={CheckCircle2} label="Completion Rate" value={p.completion + "%"} delta={2.3} sub="YoY" />
        <KpiCard icon={Briefcase} label="Placement Rate" value={p.placement + "%"} delta={4.1} sub="YoY" />
        <KpiCard icon={IndianRupee} label="Avg. Starting Salary" value={fmtINR(p.salary)} delta={6.8} sub="YoY" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2">
        <SalaryLineChart title="Salary Progression \u2014 This Programme" />
        <SimpleBarChart data={DISTRICTS.slice(0, 6).map(d => ({ name: d.name, value: d.employment }))} title="Employment Rate by District" />
      </div>
    </div>
  );
}

/* ============================= GOV: PROVIDERS ============================= */
function ProviderPerformance() {
  return (
    <div>
      <SectionTitle title="Provider Ranking" subtitle="Ranked by composite score of completion, employment, salary and retention." />
      <DataTable
        columns={["Provider", "Trainees", "Completion", "Employment", "Avg Salary", "Retention", "Rating"]}
        rows={PROVIDERS.map(p => [p.name, fmtNum(p.trainees), p.completion + "%", p.employment + "%", fmtINR(p.salary), p.retention + "%", <Badge tone={ratingTone(p.rating)}>{p.rating}</Badge>])}
      />
      <div style={{ height: 20 }} />
      <ProgrammeBarChart data={PROVIDERS} labelKey="name" dataKey="employment" title="Provider Employment Rate Comparison" />
    </div>
  );
}

/* ============================= GOV: FOLLOW-UP CENTRE ============================= */
function FollowUpCentre() {
  const stages = [
    { label: "3 Month Follow-up", pending: 1240, completed: 8410, pct: 87 },
    { label: "6 Month Follow-up", pending: 2180, completed: 6120, pct: 74 },
    { label: "12 Month Follow-up", pending: 3410, completed: 4230, pct: 55 },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <KpiCard icon={Clock} label="Pending Follow-ups" value="6,830" delta={-3.2} sub="across all stages" />
        <KpiCard icon={CheckCircle2} label="Completed" value="18,760" delta={11.4} sub="this quarter" />
        <KpiCard icon={AlertTriangle} label="Overdue" value="1,920" delta={2.1} sub="past due date" />
        <KpiCard icon={PhoneOff} label="Unable to Contact" value="740" delta={-1.6} sub="requires field visit" />
      </div>
      <FilterBar>
        <FilterChip icon={Filter} label="District" />
        <FilterChip icon={Filter} label="Programme" />
        <FilterChip icon={Filter} label="Provider" />
        <FilterChip icon={Filter} label="Follow-up Stage" />
        <FilterChip icon={Filter} label="Status" />
      </FilterBar>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="grid-3">
        {stages.map((s) => (
          <Card key={s.label} style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 12 }}>{s.label}</div>
            <ProgressBar value={s.pct} color={C.saffron} height={10} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12.5 }}>
              <span style={{ color: C.muted }}>Completed: <b style={{ color: C.text }}>{fmtNum(s.completed)}</b></span>
              <span style={{ color: C.muted }}>Pending: <b style={{ color: C.text }}>{fmtNum(s.pending)}</b></span>
            </div>
            <div style={{ marginTop: 10, fontSize: 24, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: C.navy }}>{s.pct}%</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============================= GOV: LONGITUDINAL IMPACT ============================= */
function LongitudinalImpact() {
  const journey = ["Training", "Certification", "Placement", "3M", "6M", "12M", "24M"];
  const cohorts = [
    { name: "2024 Cohort", employment: 68, salary: 24800, retention: 61, selfEmployed: 7.2, progression: 22 },
    { name: "2025 Cohort", employment: 71, salary: 27100, retention: 65, selfEmployed: 8.6, progression: 26 },
    { name: "2026 Cohort", employment: 72.8, salary: 29400, retention: 68.4, selfEmployed: 9.6, progression: 29 },
  ];
  return (
    <div>
      <Card style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 18 }}>The Trainee Journey</div>
        <div style={{ display: "flex", alignItems: "center", overflowX: "auto" }}>
          {journey.map((j, i) => (
            <React.Fragment key={j}>
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.navy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12.5, margin: "0 auto 8px" }}>{i + 1}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: C.text, width: 70 }}>{j}</div>
              </div>
              {i < journey.length - 1 && <div style={{ flex: 1, height: 2, background: C.border, minWidth: 24, marginTop: -20 }} />}
            </React.Fragment>
          ))}
        </div>
      </Card>

      <SectionTitle title="Cohort Comparison" subtitle="2024 Cohort vs 2025 Cohort vs 2026 Cohort" />
      <DataTable
        columns={["Cohort", "Employment", "Avg. Salary", "12M Retention", "Self-employed", "Career Progression"]}
        rows={cohorts.map(c => [c.name, c.employment + "%", fmtINR(c.salary), c.retention + "%", c.selfEmployed + "%", "+" + c.progression + "%"])}
      />
      <div style={{ height: 20 }} />
      <SalaryLineChart title="24-Month Salary Trajectory" />
    </div>
  );
}

/* ============================= GOV: ATTRITION ============================= */
function AttritionAnalytics() {
  const attritionOverTime = [
    { stage: "3 Months", rate: 9 },
    { stage: "6 Months", rate: 18 },
    { stage: "12 Months", rate: 27 },
    { stage: "24 Months", rate: 34 },
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <KpiCard icon={AlertTriangle} label="3-Month Attrition" value="9.0%" delta={-1.2} sub="of employed trainees" />
        <KpiCard icon={AlertTriangle} label="6-Month Attrition" value="18.0%" delta={0.8} sub="of employed trainees" />
        <KpiCard icon={AlertTriangle} label="12-Month Attrition" value="27.0%" delta={1.4} sub="of employed trainees" />
        <KpiCard icon={Users} label="High-Risk Cohorts" value="6" delta={9} sub="districts flagged" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2">
        <SimpleBarChart data={attritionOverTime.map(a => ({ name: a.stage, value: a.rate }))} title="Attrition Over Time" color={C.danger} />
        <SimpleBarChart data={ATTRITION_REASONS} title="Reasons for Attrition" color={C.warn} />
      </div>
    </div>
  );
}

/* ============================= GOV: NON PLACEMENT ============================= */
function NonPlacementReasons() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }} className="grid-2">
        <SimpleBarChart data={NON_PLACEMENT} title="Reasons for Non-Placement" color={C.danger} />
        <Card style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 14 }}>Recommended Interventions</div>
          {[
            ["Skill mismatch", "Introduce refresher modules aligned to current employer requirements before certification."],
            ["Lack of local opportunities", "Coordinate with district industry associations to open placement drives in low-opportunity districts."],
            ["Low interview readiness", "Mandatory mock-interview and soft-skills bootcamp in final training week."],
            ["Location constraints", "Partner with employers offering relocation or hostel support for rural trainees."],
          ].map(([t, b]) => (
            <div key={t} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 3 }}>{t}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{b}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* ============================= GOV: TRAINEE PROFILE ============================= */
function TraineeProfilePage() {
  const t = TRAINEE;
  return (
    <div>
      <Card style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ width: 58, height: 58, borderRadius: "50%", background: C.infoBg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 20, color: C.blue, flexShrink: 0 }}>RD</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: C.navy }}>{t.name}</div>
              <div style={{ fontSize: 12.5, color: C.muted, fontFamily: "'IBM Plex Mono', monospace" }}>{t.id}</div>
              <div style={{ marginTop: 6 }}><Badge tone="success">{t.status}</Badge></div>
            </div>
          </div>
          <Btn variant="outline" icon={Download}>Export Profile</Btn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginTop: 22, paddingTop: 22, borderTop: `1px solid ${C.border}` }}>
          <Stat label="Training Programme" value={t.programme} />
          <Stat label="Training Provider" value={t.provider} />
          <Stat label="District" value={t.district} />
          <Stat label="Certification" value="Level 4 NSQF" />
          <Stat label="Employer" value={t.employer} />
          <Stat label="Job Role" value={t.role} />
          <Stat label="Starting Salary" value={fmtINR(t.startingSalary)} />
          <Stat label="Current Salary" value={fmtINR(t.currentSalary)} />
          <Stat label="Employment Duration" value={t.duration} />
        </div>
      </Card>

      <SectionTitle title="Outcome Timeline" subtitle="Verified follow-up milestones for this trainee." />
      <Card style={{ padding: 24 }}>
        <TraineeTimeline stages={t.timeline} />
      </Card>
    </div>
  );
}

function TraineeTimeline({ stages }) {
  return (
    <div>
      {stages.map((s, i) => (
        <div key={s.label} style={{ display: "flex", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: s.verified ? C.successBg : "#F0F1F4", border: `2px solid ${s.verified ? C.success : C.border}`,
            }}>
              {s.verified ? <CheckCircle2 size={14} color={C.success} /> : <Clock size={13} color={C.faint} />}
            </div>
            {i < stages.length - 1 && <div style={{ width: 2, flex: 1, background: C.border, minHeight: 36 }} />}
          </div>
          <div style={{ paddingBottom: 26 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: C.text }}>{s.label}</div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{s.date}</div>
            <div style={{ marginTop: 5 }}>{s.verified ? <Badge tone="success">Verified</Badge> : <Badge tone="neutral">Scheduled</Badge>}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================= GOV: EMPLOYER VERIFICATION ============================= */
function EmployerVerification() {
  const employers = [
    { name: "NeoTech Software Solutions Pvt. Ltd.", industry: "IT Services", trainees: 84, status: "Verified", date: "12 Aug 2026" },
    { name: "Sahyadri Healthcare Group", industry: "Healthcare", trainees: 56, status: "Verified", date: "03 Aug 2026" },
    { name: "Bharat Auto Components Ltd.", industry: "Manufacturing", trainees: 132, status: "Pending", date: "\u2014" },
    { name: "Deccan Retail Ventures", industry: "Retail", trainees: 41, status: "Needs Review", date: "19 Jul 2026" },
    { name: "Konkan Solar Energy Pvt. Ltd.", industry: "Renewable Energy", trainees: 27, status: "Pending", date: "\u2014" },
  ];
  const tone = (s) => s === "Verified" ? "success" : s === "Pending" ? "warn" : "danger";
  return (
    <div>
      <DataTable
        columns={["Employer", "Industry", "Trainees Employed", "Status", "Last Verified", "Action"]}
        rows={employers.map(e => [e.name, e.industry, e.trainees, <Badge tone={tone(e.status)}>{e.status}</Badge>, e.date, <Btn variant="outline" size="sm">Review</Btn>])}
      />
    </div>
  );
}

/* ============================= GOV: REPORTS ============================= */
function ReportsPage() {
  const reports = [
    { title: "State Employment Report", desc: "Statewide employment, retention and salary outcomes." },
    { title: "District Outcome Report", desc: "District-wise placement and skill gap breakdown." },
    { title: "Provider Performance Report", desc: "Ranked performance of all empanelled training providers." },
    { title: "Skill Gap Report", desc: "Demand vs. supply analysis across tracked skill categories." },
    { title: "Programme Impact Report", desc: "Longitudinal impact of each skilling programme." },
    { title: "Annual Skill Development Report", desc: "Consolidated annual report for legislative review." },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
      {reports.map((r) => (
        <Card key={r.title} style={{ padding: 20 }}>
          <div style={{ width: 34, height: 34, borderRadius: 7, background: C.infoBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
            <FileBarChart size={16} color={C.blue} />
          </div>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 5 }}>{r.title}</div>
          <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 16, minHeight: 36 }}>{r.desc}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Btn variant="primary" size="sm" icon={Eye}>View</Btn>
            <Btn variant="outline" size="sm" icon={Download}>PDF</Btn>
            <Btn variant="outline" size="sm" icon={Download}>Excel</Btn>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ============================= GOV: POLICY ============================= */
function PolicyRecommendations() {
  const recs = [
    { title: "Expand advanced technical training capacity", body: "Increase seats for EV, AI and cybersecurity courses in Pune, Mumbai and Nashik by 30% to close the fastest-growing skill gaps.", impact: "High" },
    { title: "Targeted retention support in Vidarbha", body: "Introduce wage-linked retention incentives for manufacturing employers in Nagpur and Amravati to reduce 6-month attrition.", impact: "High" },
    { title: "Rural placement partnerships", body: "Formalise placement partnerships with district industry bodies in Solapur and Nanded to reduce non-placement due to lack of local opportunities.", impact: "Medium" },
    { title: "Provider capacity-building programme", body: "Introduce a mentorship programme pairing At-Risk providers with Excellent-rated providers to raise completion and placement quality.", impact: "Medium" },
  ];
  return (
    <div style={{ display: "grid", gap: 14 }}>
      {recs.map((r) => (
        <Card key={r.title} style={{ padding: 20, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 6 }}>{r.title}</div>
            <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.55 }}>{r.body}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <Badge tone={r.impact === "High" ? "danger" : "warn"}>{r.impact} Impact</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* ============================= TRAINEE PORTAL ============================= */
function TraineeDashboard({ navigate }) {
  const t = TRAINEE;
  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 22, fontWeight: 600, color: C.navy }}>Welcome, Rahul</div>
        <div style={{ color: C.muted, fontSize: 13.5, marginTop: 4 }}>Here's your skilling and career journey.</div>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
        <KpiCard icon={GraduationCap} label="Training Status" value="Completed" mono={false} delta={0} sub="Jan 2026" />
        <KpiCard icon={Briefcase} label="Employment Status" value="Employed" mono={false} delta={0} sub={t.employer} />
        <KpiCard icon={IndianRupee} label="Current Salary" value={fmtINR(t.currentSalary)} delta={20.3} sub="since starting" />
        <KpiCard icon={ShieldCheck} label="Retention" value="8 months" mono={false} delta={0} sub="with current employer" />
      </div>

      <SectionTitle title="My Career Journey" subtitle="Training \u2192 Certification \u2192 Placement \u2192 Current Employment" />
      <Card style={{ padding: 24, marginBottom: 20 }}>
        <TraineeTimeline stages={t.timeline} />
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="grid-2">
        <Card style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 6 }}>Next Follow-up Due</div>
          <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 14 }}>12-Month Employment Follow-up \u2014 due March 2027</div>
          <Btn variant="saffron" size="sm" onClick={() => navigate("t-followup")}>Complete Follow-up</Btn>
        </Card>
        <Card style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 6 }}>Your Data, Your Consent</div>
          <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 14 }}>Review what information is shared and how it's used to improve programmes.</div>
          <Btn variant="outline" size="sm" onClick={() => navigate("t-consent")}>Manage Consent</Btn>
        </Card>
      </div>
    </div>
  );
}

function MyTraining() {
  const t = TRAINEE;
  return (
    <div>
      <Card style={{ padding: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 18 }}>
          <Stat label="Programme" value={t.programme} />
          <Stat label="Provider" value={t.provider} />
          <Stat label="District" value={t.district} />
          <Stat label="Certification" value="Level 4 NSQF" />
          <Stat label="Completion Date" value="January 2026" />
          <Stat label="Status" value="Completed" />
        </div>
      </Card>
      <div style={{ height: 20 }} />
      <SectionTitle title="Skills Certified" subtitle="Skills verified as part of this training programme." />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["HTML/CSS/JavaScript", "React Fundamentals", "REST APIs", "Git & Version Control", "SQL Basics", "Agile Workflow"].map(s => (
          <span key={s} style={{ padding: "7px 12px", borderRadius: 6, background: C.infoBg, color: C.blue, fontSize: 12.5, fontWeight: 600 }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function MyEmployment() {
  const t = TRAINEE;
  return (
    <div>
      <Card style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 18, marginBottom: 20 }}>
          <Stat label="Employment Status" value="Employed" />
          <Stat label="Employer" value={t.employer} />
          <Stat label="Job Role" value={t.role} />
          <Stat label="Joining Date" value="March 2026" />
          <Stat label="Salary" value={fmtINR(t.currentSalary)} />
          <Stat label="Location" value="Hinjewadi, Pune" />
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
          <Btn variant="primary" icon={CheckCircle2}>Verify Employment</Btn>
          <Btn variant="outline" icon={ClipboardList}>Report a Change</Btn>
        </div>
      </Card>
      <SalaryLineChart title="My Salary Progression" />
    </div>
  );
}

function TraineeFollowUp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const questions = [
    { key: "employed", label: "Are you currently employed?", options: ["Yes", "No"] },
    { key: "sameEmployer", label: "Are you still with the same employer?", options: ["Yes", "No"] },
    { key: "relevance", label: "Are your current skills relevant to your job?", options: ["Yes", "Partially", "No"] },
  ];
  const done = step >= questions.length;
  return (
    <Card style={{ padding: 28, maxWidth: 560 }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: C.saffron, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>Your next outcome check-in</div>
      <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 20, fontWeight: 600, color: C.navy, marginBottom: 20 }}>6-Month Employment Follow-up</div>

      {!done ? (
        <>
          <div style={{ display: "flex", gap: 5, marginBottom: 22 }}>
            {questions.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? C.navy : C.border }} />)}
          </div>
          <div style={{ fontWeight: 600, fontSize: 15, color: C.text, marginBottom: 16 }}>{questions[step].label}</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
            {questions[step].options.map((o) => (
              <div key={o} onClick={() => { setAnswers({ ...answers, [questions[step].key]: o }); setStep(step + 1); }}
                style={{ padding: "10px 18px", borderRadius: 6, border: `1px solid ${C.border}`, cursor: "pointer", fontSize: 13.5, fontWeight: 600, color: C.text }}>
                {o}
              </div>
            ))}
          </div>
          {step > 0 && <Btn variant="ghost" size="sm" icon={ChevronLeft} onClick={() => setStep(step - 1)}>Back</Btn>}
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <CheckCircle2 size={40} color={C.success} style={{ marginBottom: 12 }} />
          <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 6 }}>Follow-up submitted</div>
          <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 18 }}>Thank you \u2014 your response has been recorded and helps improve Maharashtra's skilling programmes.</div>
          <Btn variant="outline" size="sm" onClick={() => { setStep(0); setAnswers({}); }}>Submit another response</Btn>
        </div>
      )}
    </Card>
  );
}

function CareerProgress() {
  return (
    <div>
      <SalaryLineChart title="My Salary Growth" />
      <div style={{ height: 20 }} />
      <Card style={{ padding: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: C.navy, marginBottom: 16 }}>Milestones</div>
        <TraineeTimeline stages={TRAINEE.timeline} />
      </Card>
    </div>
  );
}

function ConsentPrivacy() {
  const [toggles, setToggles] = useState({ training: true, employment: true, salary: true, skills: true, followup: true });
  const items = [
    { key: "training", label: "Training information", desc: "Programme, provider, attendance and certification records." },
    { key: "employment", label: "Employment information", desc: "Employer, job role, location and employment status." },
    { key: "salary", label: "Salary information", desc: "Starting and current salary, used only in aggregate for reporting." },
    { key: "skills", label: "Skill information", desc: "Certified and self-reported skills relevant to your job." },
    { key: "followup", label: "Follow-up responses", desc: "Your answers to periodic outcome check-ins." },
  ];
  return (
    <div>
      <Card style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 6 }}>What information we collect</div>
        <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 18 }}>
          Your data is used only to measure skilling outcomes and improve government programmes. It is never sold or shared with unrelated third parties.
        </div>
        {items.map((it) => (
          <div key={it.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "14px 0", borderTop: `1px solid ${C.border}`, gap: 16 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13.5, color: C.text }}>{it.label}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{it.desc}</div>
            </div>
            <Toggle checked={toggles[it.key]} onChange={() => setToggles({ ...toggles, [it.key]: !toggles[it.key] })} />
          </div>
        ))}
      </Card>
      <Card style={{ padding: 20, background: C.infoBg, border: "none" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <Info size={18} color={C.blue} style={{ flexShrink: 0, marginTop: 2 }} />
          <div style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>
            I understand how my information will be used to measure skilling outcomes and improve government programmes.
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <Btn variant="primary">Agree &amp; Continue</Btn>
          <Btn variant="outline">Manage Preferences</Btn>
        </div>
      </Card>
    </div>
  );
}
function Toggle({ checked, onChange }) {
  return (
    <div onClick={onChange} style={{ width: 40, height: 22, borderRadius: 11, background: checked ? C.navy : "#D7DBE2", cursor: "pointer", position: "relative", flexShrink: 0, transition: "background .15s" }}>
      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: checked ? 21 : 3, transition: "left .15s" }} />
    </div>
  );
}

function TraineeSkills() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {[
        { name: "React & Frontend Development", level: 88 },
        { name: "REST API Integration", level: 80 },
        { name: "SQL & Database Basics", level: 70 },
        { name: "Git & Collaboration Tools", level: 84 },
        { name: "Agile Workflow", level: 65 },
      ].map((s) => (
        <Card key={s.name} style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, fontWeight: 600, color: C.text }}>
            <span>{s.name}</span><span style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.navy }}>{s.level}%</span>
          </div>
          <ProgressBar value={s.level} color={C.navy} />
        </Card>
      ))}
    </div>
  );
}

function UpdateProfile() {
  const fields = [["Full Name", "Rahul Deshmukh"], ["Mobile Number", "+91 98XXXXXX21"], ["Email", "rahul.d@email.com"], ["District", "Pune"], ["Address", "Hinjewadi, Pune, Maharashtra"]];
  return (
    <Card style={{ padding: 24, maxWidth: 520 }}>
      {fields.map(([label, val]) => (
        <div key={label} style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12.5, fontWeight: 600, color: C.text, marginBottom: 6, display: "block" }}>{label}</label>
          <input defaultValue={val} style={inputStyle} />
        </div>
      ))}
      <Btn variant="primary">Save Changes</Btn>
    </Card>
  );
}

function TraineeHelp() {
  const faqs = [
    ["Why is my data being collected?", "To help the Government of Maharashtra measure the real-world impact of skilling programmes and improve them for future trainees."],
    ["Can I withdraw consent?", "Yes, you can manage or withdraw consent at any time from the Consent & Privacy page."],
    ["How do I update my employment details?", "Go to My Employment and use Report a Change, or respond to your next scheduled follow-up."],
    ["Who can see my personal information?", "Only authorised programme administrators can view identifiable data; public reports use aggregated, anonymised figures only."],
  ];
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {faqs.map(([q, a]) => (
        <Card key={q} style={{ padding: 18 }}>
          <div style={{ fontWeight: 700, fontSize: 13.5, color: C.navy, marginBottom: 6 }}>{q}</div>
          <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.6 }}>{a}</div>
        </Card>
      ))}
    </div>
  );
}

/* ============================= APP SHELL ============================= */
export default function App() {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.title = "Maharashtra Skill Outcomes & Impact Platform";
  }, []);

  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };

  const handleLogin = (mode) => {
    setRole(mode);
    setPage(mode === "gov" ? "dashboard" : "t-overview");
  };

  if (!role) {
    return (
      <div>
        <style>{FONTS}{GLOBAL_CSS}</style>
        <Landing onLogin={handleLogin} />
      </div>
    );
  }

  const nav = role === "gov" ? GOV_NAV : TRAINEE_NAV;
  const [titleMain, titleSub] = PAGE_TITLES[page] || ["", ""];

  const govFilters = (
    <FilterBar>
      <FilterChip icon={Calendar} label="Last 12 Months" />
      <FilterChip icon={Map} label="All Districts" />
      <FilterChip icon={ClipboardList} label="All Programmes" />
      <FilterChip icon={Building2} label="All Providers" />
    </FilterBar>
  );

  const renderGov = () => {
    switch (page) {
      case "dashboard": return <GovDashboard navigate={navigate} />;
      case "employment": return <EmploymentOutcomes navigate={navigate} />;
      case "nonplacement": return <NonPlacementReasons />;
      case "district": return <DistrictAnalytics navigate={navigate} />;
      case "skillgap": return <SkillGap />;
      case "programmes": return <TrainingProgrammes navigate={navigate} />;
      case "programmedetail": return <ProgrammeDetail navigate={navigate} />;
      case "providers": return <ProviderPerformance />;
      case "followup": return <FollowUpCentre />;
      case "longitudinal": return <LongitudinalImpact />;
      case "attrition": return <AttritionAnalytics />;
      case "trainee": return <TraineeProfilePage />;
      case "employer": return <EmployerVerification />;
      case "reports": return <ReportsPage />;
      case "policy": return <PolicyRecommendations />;
      case "aiinsights": return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          {AI_INSIGHTS.map((ins, i) => <InsightCard key={i} insight={ins} navigate={navigate} />)}
        </div>
      );
      case "stateoverview": return <GovDashboard navigate={navigate} />;
      case "impact": return <LongitudinalImpact />;
      case "comparison": return <LongitudinalImpact />;
      case "salary": return <div><SalaryLineChart /><div style={{height:16}}/><ProgrammeBarChart dataKey="salary" title="Avg Salary by Programme" /></div>;
      case "retention": return <div><SimpleBarChart data={PROGRAMMES.map(p=>({name:p.name,value:p.retention}))} title="12-Month Retention by Programme" color={C.navy} /></div>;
      default: return <EmptyPlaceholder title={titleMain} />;
    }
  };

  const renderTrainee = () => {
    switch (page) {
      case "t-overview": return <TraineeDashboard navigate={navigate} />;
      case "t-training": return <MyTraining />;
      case "t-employment": return <MyEmployment />;
      case "t-followup": return <TraineeFollowUp />;
      case "t-skills": return <TraineeSkills />;
      case "t-career": return <CareerProgress />;
      case "t-profile": return <UpdateProfile />;
      case "t-consent": return <ConsentPrivacy />;
      case "t-help": return <TraineeHelp />;
      default: return <TraineeDashboard navigate={navigate} />;
    }
  };

  const traineeTitleMap = {
    "t-overview": ["My Dashboard", "Your skilling and career journey at a glance."],
    "t-training": ["My Training", "Details of your completed training programme."],
    "t-employment": ["My Employment", "Manage and verify your current employment details."],
    "t-followup": ["My Follow-ups", "Complete your scheduled outcome check-ins."],
    "t-skills": ["My Skills", "Skills you've certified and self-reported."],
    "t-career": ["Career Progress", "Your salary and milestone trajectory over time."],
    "t-profile": ["Update Profile", "Keep your contact details current so we can reach you."],
    "t-consent": ["Consent & Privacy", "Review and manage how your data is used."],
    "t-help": ["Help", "Frequently asked questions."],
  };
  const [tTitle, tSub] = traineeTitleMap[page] || ["", ""];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.bg, fontFamily: "'Inter', sans-serif" }}>
      <style>{FONTS}{GLOBAL_CSS}</style>
      <Sidebar nav={nav} active={page} onNavigate={navigate} role={role} collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <TopHeader
          title={role === "gov" ? titleMain : tTitle}
          subtitle={role === "gov" ? titleSub : tSub}
          onMenu={() => setMobileOpen(true)}
          onLogout={() => setRole(null)}
          role={role}
          filters={role === "gov" && ["dashboard","employment","district","programmes","followup"].includes(page) ? govFilters : null}
        />
        <div style={{ padding: "22px 28px 60px" }}>
          {role === "gov" ? renderGov() : renderTrainee()}
        </div>
      </div>
    </div>
  );
}

const GLOBAL_CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; color: ${C.text}; }
  input:focus { border-color: ${C.navy} !important; }
  table tr:hover td { background: #FAFBFD; }
  @media (max-width: 900px) {
    .grid-2, .grid-3 { grid-template-columns: 1fr !important; }
    .mobile-menu-btn { display: flex !important; }
  }
`;
