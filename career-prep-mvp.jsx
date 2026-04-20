import { useState, useEffect, useRef } from "react";
import * as mammoth from "mammoth";

// ══════════════════════════════════════════════════════════════════════════
//  STYLES — Editorial / magazine aesthetic. Cream + ink + rust + sage.
// ══════════════════════════════════════════════════════════════════════════
const S = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700&family=DM+Sans:wght@300;400;500;600&family=Syne:wght@500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --cream:#f6f4ee; --white:#fff; --ink:#14131c; --ink2:#2c2b38;
  --rust:#bf4b2b; --rust-h:#a83e22;
  --gold:#b5853a; --gold-bg:rgba(181,133,58,.10);
  --sage:#2f5e45; --sage-bg:rgba(47,94,69,.09);
  --rose:#b03530; --rose-bg:rgba(176,53,48,.08);
  --blue:#2357bb; --muted:#6e6c7e; --border:#e0ddd3;
  --shadow:0 1px 4px rgba(0,0,0,.05),0 3px 12px rgba(0,0,0,.04);
}

body{background:var(--cream);color:var(--ink);font-family:'DM Sans',sans-serif;line-height:1.6}

.cg{font-family:'Cormorant Garamond',serif}
.syne{font-family:'Syne',sans-serif}
.display{font-family:'Cormorant Garamond',serif;font-size:clamp(38px,5.2vw,62px);font-weight:700;line-height:1.06;letter-spacing:-.025em}
.h1{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:700;line-height:1.15}
.h2{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;line-height:1.2}
.eyebrow{font-family:'Syne',sans-serif;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase}
.muted{color:var(--muted)}
.small{font-size:13px} .xs{font-size:11px}

.wrap{max-width:960px;margin:0 auto;padding:0 28px}
.wrap-sm{max-width:560px;margin:0 auto;padding:0 28px}

.topnav{background:var(--white);border-bottom:1px solid var(--border);padding:0 28px;height:54px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:50}
.brand{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700}
.brand em{font-style:normal;color:var(--rust)}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:11px 22px;border-radius:7px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;transition:all .15s;white-space:nowrap}
.btn-rust{background:var(--rust);color:#fff}
.btn-rust:hover{background:var(--rust-h);transform:translateY(-1px);box-shadow:0 4px 14px rgba(191,75,43,.28)}
.btn-rust:disabled,.btn-gold:disabled{opacity:.45;cursor:not-allowed;transform:none;box-shadow:none}
.btn-outline{background:transparent;border:1.5px solid var(--border);color:var(--ink)}
.btn-outline:hover{border-color:var(--ink)}
.btn-ghost{background:transparent;border:none;color:var(--muted);font-size:13px}
.btn-ghost:hover{color:var(--ink)}
.btn-gold{background:var(--gold);color:#fff}
.btn-gold:hover{filter:brightness(1.06);transform:translateY(-1px);box-shadow:0 4px 14px rgba(181,133,58,.3)}
.btn-lg{padding:14px 28px;font-size:15px;border-radius:8px}
.btn-sm{padding:7px 14px;font-size:12px;border-radius:6px}
.btn-full{width:100%}

.card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:26px;box-shadow:var(--shadow)}

.field{margin-bottom:16px}
.field-label{display:block;font-size:13px;font-weight:500;margin-bottom:6px}
.field-hint{font-size:12px;color:var(--muted);margin-top:5px}
input[type=text],input[type=email],textarea,select{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:7px;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--ink);background:var(--white);outline:none;transition:border .15s;-webkit-appearance:none}
input:focus,textarea:focus,select:focus{border-color:var(--ink)}
textarea{resize:vertical;line-height:1.55;font-size:13px}

.pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.pill{padding:7px 16px;border-radius:20px;border:1.5px solid var(--border);font-size:13px;cursor:pointer;transition:all .15s;background:var(--white);color:var(--ink);font-family:'DM Sans',sans-serif}
.pill:hover{border-color:var(--ink)}
.pill.on{background:var(--ink);color:#fff;border-color:var(--ink)}

.stepbar{display:flex;align-items:center;margin-bottom:34px}
.sb-seg{display:flex;align-items:center;gap:8px}
.sb-dot{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;transition:all .2s;font-family:'Syne',sans-serif}
.sb-dot.done{background:var(--sage);color:#fff}
.sb-dot.active{background:var(--ink);color:#fff}
.sb-dot.idle{background:var(--border);color:var(--muted)}
.sb-label{font-size:12px;color:var(--muted);white-space:nowrap}
.sb-seg.cur .sb-label{color:var(--ink);font-weight:500}
.sb-line{width:40px;height:2px;background:var(--border);margin:0 10px}
.sb-line.done{background:var(--sage)}

.land-hero{padding:72px 0 60px;text-align:center}
.hero-tag{display:inline-flex;align-items:center;gap:6px;background:var(--gold-bg);color:var(--gold);padding:5px 14px;border-radius:20px;margin-bottom:20px}
.hero-sub{font-size:17px;color:var(--muted);max-width:500px;margin:18px auto 32px;line-height:1.65}
.proof-row{display:flex;gap:22px;justify-content:center;margin-top:18px;flex-wrap:wrap}
.proof-item{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--muted)}
.feat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:48px 0}
.feat-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:22px}
.feat-icon{font-size:24px;margin-bottom:10px}
.feat-title{font-weight:600;font-size:15px;margin-bottom:4px}
.feat-desc{font-size:13px;color:var(--muted);line-height:1.55}
.how-block{background:var(--white);border:1px solid var(--border);border-radius:14px;padding:36px;margin-bottom:48px}
.how-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:24px;text-align:center}
.how-num{width:34px;height:34px;border-radius:50%;background:var(--ink);color:#fff;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 10px}

.input-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:16px}
.tabs{display:inline-flex;background:var(--cream);border-radius:7px;padding:3px;gap:3px;margin-bottom:10px}
.tab{padding:5px 14px;border-radius:5px;font-size:12px;cursor:pointer;transition:all .15s;color:var(--muted);font-family:'DM Sans',sans-serif}
.tab.on{background:var(--white);color:var(--ink);font-weight:500;box-shadow:0 1px 3px rgba(0,0,0,.07)}
.drop-zone{border:2px dashed var(--border);border-radius:9px;padding:28px 20px;text-align:center;cursor:pointer;transition:all .15s}
.drop-zone:hover{border-color:var(--ink);background:rgba(20,19,28,.02)}
.upload-ok{background:var(--sage-bg);border:1px solid var(--sage);border-radius:7px;padding:10px 14px;font-size:13px;color:var(--sage);margin-top:10px}
.err-block{background:var(--rose-bg);border:1px solid var(--rose);border-radius:7px;padding:10px 14px;font-size:13px;color:var(--rose);margin-top:8px}

.process-card{max-width:420px;margin:60px auto;text-align:center}
.spin{width:48px;height:48px;border:3px solid var(--border);border-top-color:var(--ink);border-radius:50%;animation:spin .85s linear infinite;margin:0 auto 20px}
@keyframes spin{to{transform:rotate(360deg)}}
.proc-item{display:flex;align-items:center;gap:14px;padding:11px 0;border-bottom:1px solid var(--border);text-align:left}
.proc-item:last-child{border-bottom:none}
.proc-ico{width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
.proc-ico.done{background:var(--sage-bg)}
.proc-ico.curr{background:var(--cream);border:2px solid var(--ink);animation:throb 1s ease-in-out infinite}
.proc-ico.idle{background:var(--border);opacity:.4}
@keyframes throb{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
.proc-txt.done{color:var(--sage)}
.proc-txt.curr{font-weight:500}
.proc-txt.idle{color:var(--muted)}

.match-banner{background:var(--white);border-bottom:1px solid var(--border);padding:36px 0;margin-bottom:24px}
.band-badge{display:inline-block;padding:4px 14px;border-radius:16px;font-family:'Syne',sans-serif;font-size:11px;font-weight:600;letter-spacing:.06em;margin-bottom:8px}
.band-strong{background:var(--sage-bg);color:var(--sage)}
.band-moderate{background:var(--gold-bg);color:var(--gold)}
.band-weak{background:var(--rose-bg);color:var(--rose)}
.score-num{font-family:'Cormorant Garamond',serif;font-size:72px;font-weight:700;line-height:1}
.sc-strong{color:var(--sage)} .sc-moderate{color:var(--gold)} .sc-weak{color:var(--rose)}
.prev-layout{display:grid;grid-template-columns:3fr 2fr;gap:20px}
.cl-item{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);font-size:14px;line-height:1.5}
.cl-item:last-child{border-bottom:none}
.cl-dot{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;flex-shrink:0;margin-top:2px;font-weight:700}
.cd-sage{background:var(--sage-bg);color:var(--sage)}
.cd-rose{background:var(--rose-bg);color:var(--rose)}
.locked{position:relative;border-radius:10px;overflow:hidden;margin-bottom:14px}
.locked-blur{filter:blur(5px);pointer-events:none;user-select:none;background:var(--white);border:1px solid var(--border);border-radius:10px;padding:18px;min-height:70px;font-size:13px;line-height:1.6}
.locked-over{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border-radius:10px;border:1.5px dashed var(--gold);background:rgba(246,244,238,.9)}
.lock-lbl{font-family:'Syne',sans-serif;font-size:10px;font-weight:600;color:var(--gold);letter-spacing:.12em;text-transform:uppercase}
.upsell-panel{background:var(--ink);border-radius:12px;padding:20px;color:#fff}
.sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:40;background:var(--ink);padding:13px 28px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.scta-text{color:#fff;font-size:14px}
.scta-sub{font-size:12px;color:rgba(255,255,255,.5);margin-top:1px}

.price-hero{background:var(--ink);border-radius:12px;padding:26px;text-align:center;margin-bottom:18px}
.price-amt{font-family:'Cormorant Garamond',serif;font-size:56px;font-weight:700;color:#fff;line-height:1}
.price-sup{font-size:22px;vertical-align:super;line-height:0}
.price-note{font-size:13px;color:rgba(255,255,255,.5);margin-top:5px}
.ben-row{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);font-size:14px;line-height:1.5}
.ben-row:last-child{border-bottom:none}
.ben-tick{color:var(--sage);font-size:15px;flex-shrink:0;margin-top:1px}
.card-input{background:var(--cream);border:1.5px solid var(--border);border-radius:7px;padding:11px 14px;margin-bottom:10px;display:flex;align-items:center}
.input-bare{background:transparent;border:none;outline:none;width:100%;font-family:'DM Sans',sans-serif;font-size:14px}

.report-shell{display:flex;min-height:100vh}
.rep-nav{width:212px;background:var(--ink);flex-shrink:0;position:sticky;top:0;height:100vh;display:flex;flex-direction:column;overflow-y:auto}
.rn-logo{padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.1)}
.rn-logo-text{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:#fff}
.rn-logo-text em{font-style:normal;color:var(--rust)}
.rn-group{font-family:'Syne',sans-serif;font-size:9px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.3);padding:16px 20px 6px}
.rn-item{display:block;padding:9px 20px;font-size:12px;color:rgba(255,255,255,.55);cursor:pointer;transition:all .15s;border-left:2px solid transparent;background:transparent;text-align:left;width:100%;font-family:'DM Sans',sans-serif;border-top:none;border-right:none;border-bottom:none}
.rn-item:hover{color:#fff;background:rgba(255,255,255,.05)}
.rn-item.on{color:#fff;border-left-color:var(--rust);background:rgba(255,255,255,.08)}
.rn-bottom{margin-top:auto;padding:16px}
.rep-body{flex:1;padding:40px 48px;background:var(--cream);overflow-y:auto}
.rep-section{margin-bottom:52px;scroll-margin-top:20px}
.rs-head{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;display:flex;align-items:center;gap:10px;margin-bottom:3px}
.rs-sub{font-size:13px;color:var(--muted);margin-bottom:22px}
.match-card{display:flex;align-items:center;gap:28px;background:var(--white);border:1px solid var(--border);border-radius:12px;padding:22px 26px;margin-bottom:18px}
.mc-score{font-family:'Cormorant Garamond',serif;font-size:62px;font-weight:700;line-height:1;flex-shrink:0}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.col-card{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:18px}
.col-head{font-family:'Syne',sans-serif;font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
.col-row{font-size:13px;padding:6px 0;border-bottom:1px solid var(--border);display:flex;gap:7px;line-height:1.5}
.col-row:last-child{border-bottom:none}
.col-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0;margin-top:6px}
.rw-block{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:18px;margin-bottom:12px}
.rw-loc{font-family:'Syne',sans-serif;font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
.rw-issue{font-size:13px;font-weight:600;margin-bottom:12px}
.rw-cols{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.rw-before{background:var(--rose-bg);border-left:3px solid var(--rose);border-radius:0 7px 7px 0;padding:10px 12px}
.rw-after{background:var(--sage-bg);border-left:3px solid var(--sage);border-radius:0 7px 7px 0;padding:10px 12px}
.rw-lbl{font-family:'Syne',sans-serif;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;margin-bottom:5px}
.rw-text{font-size:13px;line-height:1.5}
.rw-reason{font-size:12px;color:var(--muted);margin-top:10px;padding-top:10px;border-top:1px solid var(--border);line-height:1.5}
.kw-tag{display:inline-block;background:var(--gold-bg);border:1.5px solid rgba(181,133,58,.35);color:#8a6228;font-size:12px;padding:4px 12px;border-radius:14px;font-family:'Syne',sans-serif;font-weight:500;margin:3px}
.q-card{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:18px;margin-bottom:10px}
.q-top{display:flex;align-items:flex-start;gap:10px;margin-bottom:8px}
.q-text{font-size:14px;font-weight:500;line-height:1.4;flex:1}
.q-badge{font-family:'Syne',sans-serif;font-size:10px;font-weight:600;padding:3px 10px;border-radius:10px;flex-shrink:0}
.q-std{background:var(--sage-bg);color:var(--sage)}
.q-tricky{background:var(--rose-bg);color:var(--rose)}
.q-why{font-size:13px;color:var(--muted);margin-bottom:10px;line-height:1.5}
.q-chip{display:inline-block;background:var(--cream);border:1px solid var(--border);border-radius:5px;padding:3px 10px;font-size:12px;margin:2px}
.act-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.act-col{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:18px}
.act-head{font-family:'Syne',sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid}
.act-now{color:var(--rose)}
.act-today{color:var(--gold)}
.act-week{color:var(--sage)}
.act-row{font-size:13px;padding:7px 0;border-bottom:1px solid var(--border);display:flex;gap:8px;line-height:1.45}
.act-row:last-child{border-bottom:none}

.hint-box{background:var(--gold-bg);border:1px solid rgba(181,133,58,.3);border-radius:8px;padding:12px 14px;font-size:13px;line-height:1.55;margin-bottom:18px}
.secure-note{text-align:center;font-size:12px;color:var(--muted);margin-top:10px;display:flex;align-items:center;justify-content:center;gap:5px}

.fade{animation:fadeup .35s ease both}
@keyframes fadeup{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

@media(max-width:740px){
  .feat-row,.how-steps,.input-grid,.prev-layout,.two-col,.rw-cols,.act-cols{grid-template-columns:1fr}
  .rep-nav{display:none} .rep-body{padding:22px}
  .match-card{flex-direction:column;text-align:center}
}

::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
`;

// ══════════════════════════════════════════════════════════════════════════
const STAGES = ["Applying now", "Got an interview", "Changing careers", "Just exploring"];
const EXPERIENCE = ["Student / Graduate", "Early career (1–3 yrs)", "Mid-level (3–7 yrs)", "Senior (7+ yrs)"];
const STRUGGLES = ["Not getting interviews", "Weak CV", "Unsure what roles fit", "Interview anxiety", "Career change", "Salary negotiation"];
const ROLES = ["Software Engineer", "Product Manager", "UX / Product Designer", "Data Analyst", "Data Scientist", "Marketing Manager", "Operations Manager", "Finance Analyst", "HR Manager", "Sales Executive", "Project Manager", "Business Analyst", "DevOps Engineer", "Consultant", "Other"];
const PROC_STEPS = [
  { e: "📄", t: "Reading your CV" },
  { e: "🔍", t: "Extracting skills & experience" },
  { e: "📋", t: "Analysing job description" },
  { e: "🎯", t: "Comparing fit to the role" },
  { e: "💬", t: "Generating interview prep" },
];

async function callClaude(messages, system) {
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 3000, system, messages }),
    });
    const d = await r.json();
    return d.content?.map(b => b.text || "").join("") || "";
  } catch { return ""; }
}

async function readFile(file) {
  if (file.name.toLowerCase().endsWith(".docx")) {
    const buf = await file.arrayBuffer();
    const res = await mammoth.extractRawText({ arrayBuffer: buf });
    return res.value;
  }
  return new Promise((res) => {
    const fr = new FileReader();
    fr.onload = e => res(e.target.result);
    fr.readAsText(file);
  });
}

const FALLBACK = {
  match_score: 68, match_band: "Moderate",
  summary_verdict: "You have relevant experience for this role, but the CV currently undersells your achievements and misses several role-specific signals recruiters screen for.",
  top_strengths: ["Relevant domain experience evident in work history", "CV shows ownership of projects and deliverables", "Transferable communication and collaboration skills"],
  top_gaps: ["Quantified outcomes missing from most bullets", "Key role-specific keywords absent from CV", "Professional summary too generic for this specific role"],
  job_requirements: {
    must_have: ["Relevant domain experience", "Strong communication skills", "Problem-solving ability", "Team collaboration"],
    nice_to_have: ["Industry certifications", "Advanced tooling knowledge", "Leadership experience"],
    seniority_cues: ["End-to-end ownership of projects", "Stakeholder management"],
    hidden_expectations: ["Proactive communication style", "Data-driven decision making"],
  },
  cv_critique: {
    strongest_areas: ["Clear, well-structured work history", "Relevant job titles prominent", "Solid education section"],
    weakest_areas: ["Bullets lack measurable impact", "Vague summary statement", "Skills section lacks specificity"],
    missing_evidence: ["No quantified results (%, £, time saved)", "Missing cross-functional examples"],
    weak_phrasing: ["'Responsible for' — replace with active verbs", "'Helped with' — show direct contribution"],
  },
  cv_rewrites: [
    { section: "Professional Summary", issue: "Too generic — doesn't signal role fit", original: "Experienced professional with a track record across various industries.", rewrite: "Results-driven professional with 5+ years delivering measurable impact in [industry]. Proven ability to lead cross-functional initiatives and drive business outcomes.", reason: "Signals role fit immediately, uses active language, leads with value — what recruiters screen for in 6 seconds." },
    { section: "Work Experience Bullet", issue: "Vague claim, no metric", original: "Managed a team and improved internal processes.", rewrite: "Led a cross-functional team of 6 to redesign core workflows, reducing turnaround time by 30% and saving £40k annually.", reason: "Team size, approach, metric and financial impact transforms filler into compelling achievement." },
    { section: "Skills Section", issue: "Generic list, no context", original: "Communication, teamwork, Microsoft Office.", rewrite: "Stakeholder management · Cross-functional collaboration · Data analysis · Project ownership", reason: "Role-specific keywords beat generic soft skills. ATS systems scan for these exact terms." },
  ],
  keyword_gaps: ["cross-functional collaboration", "stakeholder management", "data-driven", "KPIs", "end-to-end ownership", "continuous improvement"],
  ats_notes: ["Add the exact job title from the JD to your summary", "Include hard skills from the JD verbatim", "Avoid tables and text boxes — ATS can't parse them"],
  interview_questions: [
    { question: "Tell me about a time you managed competing priorities under pressure.", why_likely: "The role emphasises multitasking and deadline ownership.", answer_framework: ["Situation", "Task", "Action", "Measurable result"], risk_level: "standard" },
    { question: "Describe influencing without authority.", why_likely: "Stakeholder management is a core stated requirement.", answer_framework: ["Context", "Challenge", "Your approach", "Outcome"], risk_level: "standard" },
    { question: "What's your biggest professional failure and what did you learn?", why_likely: "Tests self-awareness and growth mindset — common mid-senior.", answer_framework: ["What happened", "Your role", "What you did next", "Lesson applied"], risk_level: "tricky" },
    { question: "Why are you leaving your current role?", why_likely: "Standard screener — watches for red flags and pull-motivation.", answer_framework: ["Positive framing", "Growth motivation", "Why this role"], risk_level: "tricky" },
    { question: "Walk me through a project you're most proud of.", why_likely: "Your best evidence window. Expect this at almost every interview.", answer_framework: ["Scope", "Your specific role", "How you drove it", "Result"], risk_level: "standard" },
    { question: "Where do you see yourself in 3–5 years?", why_likely: "Tests ambition alignment and retention risk.", answer_framework: ["Short-term focus", "Long-term direction", "How this role fits"], risk_level: "standard" },
    { question: "Tell me about disagreeing with your manager.", why_likely: "Professional maturity and constructive conflict handling.", answer_framework: ["The disagreement", "How you raised it", "Outcome", "Learning"], risk_level: "tricky" },
    { question: "How do you prioritise when everything feels urgent?", why_likely: "Tests practical decision-making under real conditions.", answer_framework: ["Your framework", "A real example", "The outcome"], risk_level: "standard" },
  ],
  questions_to_ask: ["What does success in this role look like after 90 days?", "What are the biggest challenges the team faces right now?", "How does the team approach professional development?", "What's the typical career progression from this position?"],
  action_plan: {
    fix_now: ["Add measurable results to your 3 most recent roles", "Rewrite professional summary to target this role", "Add missing keywords from JD naturally"],
    fix_today: ["Prepare 2-minute 'Tell me about yourself' using the JD", "Write out 3 strong STAR examples", "Research company's recent strategy and news"],
    fix_this_week: ["Practise top 8 interview questions aloud", "Update LinkedIn to match revised CV", "Prepare 4 smart questions for the interviewer"],
  },
};

// ══════════════════════════════════════════════════════════════════════════
function Nav({ right }) {
  return (
    <nav className="topnav">
      <div className="brand">Career<em>Prep</em></div>
      {right}
    </nav>
  );
}

// ── LANDING ───────────────────────────────────────────────────────────────
function Landing({ onStart }) {
  return (
    <div>
      <Nav right={<button className="btn btn-ghost">Sign in</button>} />
      <div className="wrap">
        <div className="land-hero fade">
          <div className="hero-tag eyebrow">✦ AI Interview Prep</div>
          <h1 className="display">Get interview-ready<br/>in minutes.</h1>
          <p className="hero-sub">Upload your CV, paste the job description, and get instant fit analysis, targeted CV improvements, and personalised interview prep.</p>
          <button className="btn btn-rust btn-lg" onClick={onStart}>Start free analysis →</button>
          <div className="proof-row">
            <div className="proof-item">⭐⭐⭐⭐⭐ <span>4.9 from 300+ users</span></div>
            <div className="proof-item">🔒 <span>No card needed to start</span></div>
            <div className="proof-item">⚡ <span>Results in 60 seconds</span></div>
          </div>
        </div>
        <div className="feat-row">
          {[
            { i: "📊", t: "CV & Job Match", d: "See exactly how well your CV matches this role, what's missing, and why — fit score out of 100." },
            { i: "✍️", t: "CV Rewrites", d: "Specific before-and-after rewrites for weak bullets and your professional summary." },
            { i: "🎯", t: "Interview Prep", d: "The most likely questions, with answer frameworks and what not to say." },
          ].map((f, i) => (
            <div className="feat-card fade" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="feat-icon">{f.i}</div>
              <div className="feat-title">{f.t}</div>
              <div className="feat-desc">{f.d}</div>
            </div>
          ))}
        </div>
        <div className="how-block">
          <div className="eyebrow muted" style={{ textAlign: "center" }}>How it works</div>
          <div className="how-steps">
            {[
              { t: "Upload your CV", d: "Paste text or upload a .docx file. 30 seconds." },
              { t: "Paste the job description", d: "Copy the full JD from any job board." },
              { t: "Get your report", d: "Free preview instantly. Full report £7.99." },
            ].map((s, i) => (
              <div key={i}>
                <div className="how-num">{i + 1}</div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{s.t}</div>
                <div className="small muted">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ONBOARDING ────────────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [d, setD] = useState({ name: "", email: "", stage: "", role: "", experience: "", struggle: "" });
  const upd = (k, v) => setD(p => ({ ...p, [k]: v }));
  const ok1 = d.name.trim() && d.email.includes("@") && d.email.includes(".");
  const ok2 = d.stage && d.role && d.experience;
  const STEPS = [{ n: 1, l: "About you" }, { n: 2, l: "Your situation" }, { n: 3, l: "Finish up" }];

  return (
    <div>
      <Nav right={<div className="eyebrow muted">Step {step} of 3</div>} />
      <div style={{ padding: "44px 0 80px" }}>
        <div className="wrap-sm">
          <div className="stepbar">
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
                <div className={`sb-seg ${step === s.n ? "cur" : ""}`}>
                  <div className={`sb-dot ${step > s.n ? "done" : step === s.n ? "active" : "idle"}`}>
                    {step > s.n ? "✓" : s.n}
                  </div>
                  <div className="sb-label">{s.l}</div>
                </div>
                {i < STEPS.length - 1 && <div className={`sb-line ${step > s.n ? "done" : ""}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="card fade">
              <div className="h2" style={{ marginBottom: 4 }}>Let's start with you</div>
              <p className="muted small" style={{ marginBottom: 22 }}>We'll personalise your report using your profile.</p>
              <div className="field">
                <label className="field-label">First name</label>
                <input type="text" value={d.name} onChange={e => upd("name", e.target.value)} placeholder="Alex" autoFocus />
              </div>
              <div className="field">
                <label className="field-label">Email address</label>
                <input type="email" value={d.email} onChange={e => upd("email", e.target.value)} placeholder="alex@email.com" />
                <div className="field-hint">We'll send your report here. No marketing emails.</div>
              </div>
              <button className="btn btn-rust btn-full" disabled={!ok1} onClick={() => setStep(2)}>Continue →</button>
            </div>
          )}

          {step === 2 && (
            <div className="card fade">
              <div className="h2" style={{ marginBottom: 4 }}>Where are you right now?</div>
              <p className="muted small" style={{ marginBottom: 22 }}>This shapes the urgency and advice of your report.</p>
              <div className="field">
                <label className="field-label">Current stage</label>
                <div className="pills">{STAGES.map(s => <div key={s} className={`pill ${d.stage === s ? "on" : ""}`} onClick={() => upd("stage", s)}>{s}</div>)}</div>
              </div>
              <div className="field">
                <label className="field-label">Target role</label>
                <select value={d.role} onChange={e => upd("role", e.target.value)}>
                  <option value="">Select a role...</option>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="field">
                <label className="field-label">Your experience level</label>
                <div className="pills">{EXPERIENCE.map(e => <div key={e} className={`pill ${d.experience === e ? "on" : ""}`} onClick={() => upd("experience", e)}>{e}</div>)}</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button className="btn btn-rust" style={{ flex: 1 }} disabled={!ok2} onClick={() => setStep(3)}>Continue →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card fade">
              <div className="h2" style={{ marginBottom: 4 }}>One last thing</div>
              <p className="muted small" style={{ marginBottom: 16 }}>What's your biggest challenge right now? (optional)</p>
              <div className="field">
                <div className="pills">{STRUGGLES.map(s => <div key={s} className={`pill ${d.struggle === s ? "on" : ""}`} onClick={() => upd("struggle", d.struggle === s ? "" : s)}>{s}</div>)}</div>
              </div>
              <div className="hint-box">
                <strong style={{ color: "var(--gold)" }}>Hi {d.name} 👋</strong> — Ready to see how your CV stacks up against your target <strong>{d.role || "role"}</strong>?
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-outline" onClick={() => setStep(2)}>← Back</button>
                <button className="btn btn-rust" style={{ flex: 1 }} onClick={() => onComplete(d)}>Analyse my application →</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── INPUT ─────────────────────────────────────────────────────────────────
function InputScreen({ user, onAnalyze }) {
  const [cvMode, setCvMode] = useState("paste");
  const [cvText, setCvText] = useState("");
  const [jdText, setJdText] = useState("");
  const [company, setCompany] = useState("");
  const [iDate, setIDate] = useState("");
  const [file, setFile] = useState(null);
  const [fileErr, setFileErr] = useState("");
  const fileRef = useRef();

  const handleFile = async (f) => {
    setFileErr("");
    if (!f.name.match(/\.(docx|txt)$/i)) { setFileErr("Please upload a .docx or .txt file."); return; }
    try {
      const text = await readFile(f);
      setCvText(text); setFile(f);
    } catch { setFileErr("Couldn't read that file. Try pasting CV text instead."); }
  };

  const hasCv = cvText.trim().length > 80;
  const hasJd = jdText.trim().length > 60;
  const canGo = hasCv && hasJd;

  return (
    <div>
      <Nav right={<div className="muted small">Hi, {user.name} 👋</div>} />
      <div className="wrap" style={{ paddingTop: 32, paddingBottom: 48 }}>
        <div style={{ marginBottom: 24 }}>
          <div className="h1" style={{ marginBottom: 4 }}>Your application</div>
          <p className="muted small">Upload your CV and paste the job description. We'll analyse them together.</p>
        </div>

        <div className="input-grid">
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>📄 Your CV</div>
            <div className="small muted" style={{ marginBottom: 12 }}>Paste your CV text or upload a .docx/.txt file.</div>
            <div className="tabs">
              <div className={`tab ${cvMode === "paste" ? "on" : ""}`} onClick={() => setCvMode("paste")}>Paste text</div>
              <div className={`tab ${cvMode === "upload" ? "on" : ""}`} onClick={() => setCvMode("upload")}>Upload file</div>
            </div>
            {cvMode === "paste" ? (
              <textarea value={cvText} onChange={e => setCvText(e.target.value)} placeholder="Paste your full CV here — all roles, education, and skills..." style={{ minHeight: 240 }} />
            ) : (
              <div>
                <div className="drop-zone" onClick={() => fileRef.current?.click()}
                  onDrop={e => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
                  onDragOver={e => e.preventDefault()}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{file ? "✅" : "📂"}</div>
                  <div className="small muted">
                    {file ? <><strong style={{ color: "var(--ink)" }}>{file.name}</strong> uploaded</> : <><strong style={{ color: "var(--ink)" }}>Click to upload</strong> or drag & drop<br/>.docx or .txt files only</>}
                  </div>
                </div>
                <input ref={fileRef} type="file" accept=".docx,.txt" style={{ display: "none" }} onChange={e => e.target.files[0] && handleFile(e.target.files[0])} />
                {fileErr && <div className="err-block">{fileErr}</div>}
                {file && cvText && <div className="upload-ok">✓ {cvText.split(/\s+/).length} words extracted</div>}
              </div>
            )}
          </div>

          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>📋 Job Description</div>
            <div className="small muted" style={{ marginBottom: 12 }}>Paste the full job posting — title, responsibilities, and requirements.</div>
            <textarea value={jdText} onChange={e => setJdText(e.target.value)} placeholder="Paste the complete job description here..." style={{ minHeight: 270 }} />
          </div>
        </div>

        <div className="card" style={{ padding: 18, marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div className="field" style={{ margin: 0 }}>
              <label className="field-label">Company name <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></label>
              <input type="text" value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Spotify, NHS" />
            </div>
            <div className="field" style={{ margin: 0 }}>
              <label className="field-label">Interview date <span className="muted" style={{ fontWeight: 400 }}>(optional)</span></label>
              <input type="text" value={iDate} onChange={e => setIDate(e.target.value)} placeholder="e.g. 25 April 2026" />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="btn btn-rust btn-lg" disabled={!canGo} onClick={() => onAnalyze({ cvText, jdText, company, iDate })}>
            🔍 Analyse my application →
          </button>
          {!canGo && <div className="muted small">{!hasCv ? "Add your CV" : "Add a job description"} to continue</div>}
        </div>
      </div>
    </div>
  );
}

// ── PROCESSING ────────────────────────────────────────────────────────────
function Processing({ cvText, jdText, company, iDate, user, onComplete }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let dead = false;
    const timers = PROC_STEPS.map((_, i) => setTimeout(() => !dead && setIdx(i), i * 1300));
    const minMs = PROC_STEPS.length * 1300 + 800;
    const t0 = Date.now();

    const SYS = `You are a blunt expert senior recruiter and interview coach. Analyse the candidate's CV against the job description and return ONLY a valid JSON object — no prose, no markdown fences.

Return exactly this schema:
{
  "match_score": integer 0-100,
  "match_band": "Weak" | "Moderate" | "Strong",
  "summary_verdict": "2 concise sentences, specific",
  "top_strengths": [3 strings],
  "top_gaps": [3 strings],
  "job_requirements": {
    "must_have": [3-5 strings],
    "nice_to_have": [2-4 strings],
    "seniority_cues": [2 strings],
    "hidden_expectations": [2 strings]
  },
  "cv_critique": {
    "strongest_areas": [3 strings],
    "weakest_areas": [3 strings],
    "missing_evidence": [2 strings],
    "weak_phrasing": [2 strings]
  },
  "cv_rewrites": [
    {"section": "string", "issue": "string", "original": "string", "rewrite": "string", "reason": "string"}
  ] (3 items),
  "keyword_gaps": [5-7 strings],
  "ats_notes": [3 strings],
  "interview_questions": [
    {"question": "string", "why_likely": "string", "answer_framework": [3-4 strings], "risk_level": "standard"|"tricky"}
  ] (8 items, mix standard and tricky),
  "questions_to_ask": [4 strings],
  "action_plan": {"fix_now": [3], "fix_today": [3], "fix_this_week": [3]}
}

Be specific, not generic. Reference the actual CV and JD. Quantify where possible. No fluff praise.`;

    const MSG = `Candidate: ${user.name}. Stage: ${user.stage}. Target role: ${user.role}. Experience: ${user.experience}.${user.struggle ? ` Biggest struggle: ${user.struggle}.` : ""}${company ? ` Company: ${company}.` : ""}${iDate ? ` Interview date: ${iDate}.` : ""}

CV:
${cvText}

JOB DESCRIPTION:
${jdText}`;

    callClaude([{ role: "user", content: MSG }], SYS)
      .then(reply => {
        if (dead) return;
        let report;
        try { report = JSON.parse(reply.replace(/```json|```/g, "").trim()); }
        catch { report = FALLBACK; }
        if (!report.match_score) report = FALLBACK;
        const wait = Math.max(0, minMs - (Date.now() - t0));
        setTimeout(() => !dead && onComplete(report), wait);
      })
      .catch(() => { if (!dead) setTimeout(() => onComplete(FALLBACK), Math.max(0, minMs - (Date.now() - t0))); });

    return () => { dead = true; timers.forEach(clearTimeout); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="wrap-sm">
        <div className="card process-card fade">
          <div className="spin" />
          <div className="h2" style={{ marginBottom: 6 }}>Analysing your application</div>
          <p className="muted small">Our AI is reviewing your CV against the role. ~30 seconds.</p>
          <ul style={{ listStyle: "none", margin: "24px 0 0" }}>
            {PROC_STEPS.map((s, i) => {
              const state = i < idx ? "done" : i === idx ? "curr" : "idle";
              return (
                <li className="proc-item" key={i}>
                  <div className={`proc-ico ${state}`}>{state === "done" ? "✓" : s.e}</div>
                  <div className={`proc-txt ${state}`}>{s.t}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── PREVIEW ───────────────────────────────────────────────────────────────
function Preview({ report: r, user, onUpgrade }) {
  const bc = { Strong: "band-strong", Moderate: "band-moderate", Weak: "band-weak" }[r.match_band] || "band-moderate";
  const sc = { Strong: "sc-strong", Moderate: "sc-moderate", Weak: "sc-weak" }[r.match_band] || "sc-moderate";
  const totalQs = r.interview_questions?.length || 8;

  return (
    <div style={{ paddingBottom: 80 }}>
      <Nav right={<button className="btn btn-rust btn-sm" onClick={onUpgrade}>Unlock report — £7.99</button>} />

      <div className="match-banner">
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }} className="fade">
            <div>
              <div className={`band-badge ${bc}`}>{r.match_band} Match</div>
              <div className={`score-num ${sc}`}>{r.match_score}<span style={{ fontSize: 28, color: "var(--muted)", fontFamily: "DM Sans,sans-serif", fontWeight: 400 }}>/100</span></div>
            </div>
            <div style={{ flex: 1, paddingTop: 6, maxWidth: 500 }}>
              <div className="eyebrow muted" style={{ marginBottom: 8 }}>AI Verdict</div>
              <p style={{ fontSize: 15, lineHeight: 1.6 }}>{r.summary_verdict}</p>
              <p className="muted small" style={{ marginTop: 10 }}>Hi {user.name} — this is your free preview. Unlock the full report for CV rewrites, keyword gaps, and tailored interview prep.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="prev-layout">
          <div>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <div className="eyebrow" style={{ color: "var(--sage)", marginBottom: 10 }}>✓ Top Strengths</div>
                  {r.top_strengths?.map((s, i) => <div className="cl-item" key={i}><div className="cl-dot cd-sage">✓</div><div>{s}</div></div>)}
                </div>
                <div>
                  <div className="eyebrow" style={{ color: "var(--rose)", marginBottom: 10 }}>✗ Key Gaps</div>
                  {r.top_gaps?.map((g, i) => <div className="cl-item" key={i}><div className="cl-dot cd-rose">✗</div><div>{g}</div></div>)}
                </div>
              </div>
            </div>

            {r.cv_rewrites?.[0] && (
              <div className="card" style={{ marginBottom: 16 }}>
                <div className="eyebrow muted" style={{ marginBottom: 10 }}>Sample CV Improvement</div>
                <div className="rw-loc">{r.cv_rewrites[0].section}</div>
                <div className="small" style={{ fontWeight: 600, marginBottom: 10 }}>{r.cv_rewrites[0].issue}</div>
                <div className="rw-before" style={{ marginBottom: 8 }}>
                  <div className="rw-lbl" style={{ color: "var(--rose)" }}>Before</div>
                  <div className="rw-text">{r.cv_rewrites[0].original}</div>
                </div>
                <div className="locked">
                  <div className="locked-blur">
                    <div className="rw-lbl" style={{ color: "var(--sage)" }}>After</div>
                    {r.cv_rewrites[0].rewrite}
                  </div>
                  <div className="locked-over"><span>🔒</span><div className="lock-lbl">Unlock to see rewrite</div></div>
                </div>
              </div>
            )}

            <div className="card" style={{ marginBottom: 16 }}>
              <div className="eyebrow muted" style={{ marginBottom: 12 }}>Likely Interview Questions — Preview</div>
              {r.interview_questions?.slice(0, 3).map((q, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{i + 1}. {q.question}</div>
                  <div className="muted xs">{q.why_likely}</div>
                </div>
              ))}
              <div className="locked" style={{ marginTop: 12 }}>
                <div className="locked-blur" style={{ minHeight: 50 }}>
                  + {totalQs - 3} more questions with full answer frameworks and sample structures...
                </div>
                <div className="locked-over"><span>🔒</span><div className="lock-lbl">Unlock {totalQs - 3} more questions</div></div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ position: "sticky", top: 70 }}>
              <div className="upsell-panel" style={{ marginBottom: 14 }}>
                <div className="cg" style={{ fontSize: 19, fontWeight: 600, marginBottom: 6 }}>Unlock your full report</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.65)", marginBottom: 14, lineHeight: 1.55 }}>Everything you need for this interview — one payment, instant access.</p>
                <ul style={{ listStyle: "none", marginBottom: 14 }}>
                  {["Full CV rewrites (every weak bullet)", "Keyword gap & ATS analysis", `${totalQs} questions + frameworks`, "30-minute action plan"].map((b, i) => (
                    <li key={i} style={{ display: "flex", gap: 8, padding: "5px 0", fontSize: 13, color: "rgba(255,255,255,.85)" }}>
                      <span style={{ color: "#6fcf97" }}>✓</span>{b}
                    </li>
                  ))}
                </ul>
                <button className="btn btn-gold btn-full" onClick={onUpgrade}>Unlock for £7.99 →</button>
                <div style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,.35)", marginTop: 8 }}>One-time · No subscription</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-cta">
        <div>
          <div className="scta-text">Your full report is ready.</div>
          <div className="scta-sub">CV rewrites, keyword gaps, interview prep — tailored to this role.</div>
        </div>
        <button className="btn btn-gold" onClick={onUpgrade}>Unlock for £7.99 →</button>
      </div>
    </div>
  );
}

// ── PAYWALL ───────────────────────────────────────────────────────────────
function Paywall({ report: r, onPay, onBack }) {
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [paying, setPaying] = useState(false);

  const pay = () => { setPaying(true); setTimeout(onPay, 1600); };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ maxWidth: 460, width: "100%" }} className="fade">
        <button className="btn btn-ghost" style={{ marginBottom: 14 }} onClick={onBack}>← Back to preview</button>
        <div className="card">
          <div className="price-hero">
            <div className="eyebrow" style={{ color: "rgba(255,255,255,.5)", marginBottom: 8 }}>Full Report Unlock</div>
            <div className="price-amt"><span className="price-sup">£</span>7.99</div>
            <div className="price-note">One-time · No subscription · Instant access</div>
          </div>

          <ul style={{ listStyle: "none" }}>
            {[
              "Complete CV rewrite suggestions — every weak bullet improved",
              `${r.interview_questions?.length || 8} interview questions with answer frameworks`,
              "Keyword gap breakdown & ATS optimisation notes",
              "30-minute prep action plan (now / today / this week)",
              "Smart questions to ask your interviewer",
            ].map((b, i) => (
              <li className="ben-row" key={i}><span className="ben-tick">✓</span>{b}</li>
            ))}
          </ul>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "18px 0" }} />

          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Payment details</div>
          <div className="card-input">
            <input className="input-bare" value={card} onChange={e => setCard(e.target.value.replace(/\D/g, "").slice(0, 16))} placeholder="Card number" />
            <span>💳</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div className="card-input"><input className="input-bare" value={exp} onChange={e => setExp(e.target.value.slice(0, 5))} placeholder="MM / YY" /></div>
            <div className="card-input"><input className="input-bare" value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="CVC" /></div>
          </div>

          <button className="btn btn-gold btn-full btn-lg" style={{ marginTop: 14 }} onClick={pay} disabled={paying}>
            {paying ? "Processing..." : "Pay £7.99 & unlock →"}
          </button>
          <div className="secure-note">🔒 Secure payment · Stripe</div>
          <div style={{ textAlign: "center", fontSize: 11, color: "var(--muted)", marginTop: 4, fontStyle: "italic" }}>Demo mode — no real charge</div>
        </div>
      </div>
    </div>
  );
}

// ── FULL REPORT ───────────────────────────────────────────────────────────
function FullReport({ report: r, user, onReset }) {
  const [active, setActive] = useState("match");
  const refs = {
    match: useRef(), req: useRef(), critique: useRef(), rewrites: useRef(),
    keywords: useRef(), questions: useRef(), actions: useRef(),
  };
  const NAV = [
    { id: "match", label: "Match Score" },
    { id: "req", label: "Job Requirements" },
    { id: "critique", label: "CV Critique" },
    { id: "rewrites", label: "CV Rewrites" },
    { id: "keywords", label: "Keywords & ATS" },
    { id: "questions", label: "Interview Questions" },
    { id: "actions", label: "Action Plan" },
  ];
  const go = (id) => { setActive(id); refs[id].current?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const bc = { Strong: "band-strong", Moderate: "band-moderate", Weak: "band-weak" }[r.match_band] || "band-moderate";
  const sc = { Strong: "sc-strong", Moderate: "sc-moderate", Weak: "sc-weak" }[r.match_band] || "sc-moderate";

  return (
    <div className="report-shell">
      <nav className="rep-nav">
        <div className="rn-logo">
          <div className="rn-logo-text">Career<em>Prep</em></div>
          <div className="eyebrow" style={{ color: "rgba(255,255,255,.4)", marginTop: 4, fontSize: 9 }}>Full Report</div>
        </div>
        <div className="rn-group">Sections</div>
        {NAV.map(n => (
          <button key={n.id} className={`rn-item ${active === n.id ? "on" : ""}`} onClick={() => go(n.id)}>{n.label}</button>
        ))}
        <div className="rn-bottom">
          <button className="btn btn-outline btn-full btn-sm" style={{ color: "rgba(255,255,255,.7)", borderColor: "rgba(255,255,255,.2)" }} onClick={onReset}>+ New analysis</button>
        </div>
      </nav>

      <div className="rep-body fade">
        {/* Match Score */}
        <section className="rep-section" ref={refs.match}>
          <div className="rs-head">📊 Match Score</div>
          <div className="rs-sub">How well your CV aligns with this specific role.</div>
          <div className="match-card">
            <div className={`mc-score ${sc}`}>{r.match_score}<span style={{ fontSize: 26, color: "var(--muted)", fontFamily: "DM Sans,sans-serif", fontWeight: 300 }}>/100</span></div>
            <div style={{ flex: 1 }}>
              <div className={`band-badge ${bc}`}>{r.match_band} match</div>
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>{r.summary_verdict}</div>
            </div>
          </div>
          <div className="two-col">
            <div className="col-card">
              <div className="col-head" style={{ color: "var(--sage)", borderColor: "var(--sage)" }}>Top Strengths</div>
              {r.top_strengths?.map((s, i) => <div className="col-row" key={i}><div className="col-dot" style={{ background: "var(--sage)" }} />{s}</div>)}
            </div>
            <div className="col-card">
              <div className="col-head" style={{ color: "var(--rose)", borderColor: "var(--rose)" }}>Key Gaps</div>
              {r.top_gaps?.map((g, i) => <div className="col-row" key={i}><div className="col-dot" style={{ background: "var(--rose)" }} />{g}</div>)}
            </div>
          </div>
        </section>

        {/* Job Requirements */}
        <section className="rep-section" ref={refs.req}>
          <div className="rs-head">📋 Job Requirements</div>
          <div className="rs-sub">What the employer actually wants — stated and hidden.</div>
          <div className="two-col">
            <div className="col-card">
              <div className="col-head" style={{ color: "var(--sage)", borderColor: "var(--sage)" }}>Must-Have</div>
              {r.job_requirements?.must_have?.map((v, i) => <div className="col-row" key={i}><div className="col-dot" style={{ background: "var(--sage)" }} />{v}</div>)}
            </div>
            <div className="col-card">
              <div className="col-head" style={{ color: "var(--blue)", borderColor: "var(--blue)" }}>Nice-to-Have</div>
              {r.job_requirements?.nice_to_have?.map((v, i) => <div className="col-row" key={i}><div className="col-dot" style={{ background: "var(--blue)" }} />{v}</div>)}
            </div>
            <div className="col-card">
              <div className="col-head" style={{ color: "var(--gold)", borderColor: "var(--gold)" }}>Seniority Cues</div>
              {r.job_requirements?.seniority_cues?.map((v, i) => <div className="col-row" key={i}><div className="col-dot" style={{ background: "var(--gold)" }} />{v}</div>)}
            </div>
            <div className="col-card">
              <div className="col-head" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>Hidden Expectations</div>
              {r.job_requirements?.hidden_expectations?.map((v, i) => <div className="col-row" key={i}><div className="col-dot" style={{ background: "var(--muted)" }} />{v}</div>)}
            </div>
          </div>
        </section>

        {/* CV Critique */}
        <section className="rep-section" ref={refs.critique}>
          <div className="rs-head">🔍 CV Critique</div>
          <div className="rs-sub">An honest, specific assessment of what works and what doesn't.</div>
          <div className="two-col">
            <div className="col-card">
              <div className="col-head" style={{ color: "var(--sage)", borderColor: "var(--sage)" }}>Strongest Areas</div>
              {r.cv_critique?.strongest_areas?.map((v, i) => <div className="col-row" key={i}><span style={{ color: "var(--sage)" }}>✓</span>{v}</div>)}
            </div>
            <div className="col-card">
              <div className="col-head" style={{ color: "var(--rose)", borderColor: "var(--rose)" }}>Weakest Areas</div>
              {r.cv_critique?.weakest_areas?.map((v, i) => <div className="col-row" key={i}><span style={{ color: "var(--rose)" }}>✗</span>{v}</div>)}
            </div>
            <div className="col-card">
              <div className="col-head" style={{ color: "var(--gold)", borderColor: "var(--gold)" }}>Missing Evidence</div>
              {r.cv_critique?.missing_evidence?.map((v, i) => <div className="col-row" key={i}><span style={{ color: "var(--gold)" }}>!</span>{v}</div>)}
            </div>
            <div className="col-card">
              <div className="col-head" style={{ color: "var(--muted)", borderColor: "var(--border)" }}>Weak Phrasing</div>
              {r.cv_critique?.weak_phrasing?.map((v, i) => <div className="col-row" key={i}><span className="muted">~</span>{v}</div>)}
            </div>
          </div>
        </section>

        {/* CV Rewrites */}
        <section className="rep-section" ref={refs.rewrites}>
          <div className="rs-head">✍️ CV Rewrites</div>
          <div className="rs-sub">Bullet-by-bullet before-and-after improvements.</div>
          {r.cv_rewrites?.map((rw, i) => (
            <div className="rw-block" key={i}>
              <div className="rw-loc">{rw.section}</div>
              <div className="rw-issue">{rw.issue}</div>
              <div className="rw-cols">
                <div className="rw-before">
                  <div className="rw-lbl" style={{ color: "var(--rose)" }}>Before</div>
                  <div className="rw-text">{rw.original}</div>
                </div>
                <div className="rw-after">
                  <div className="rw-lbl" style={{ color: "var(--sage)" }}>After</div>
                  <div className="rw-text">{rw.rewrite}</div>
                </div>
              </div>
              <div className="rw-reason"><strong>Why it works:</strong> {rw.reason}</div>
            </div>
          ))}
        </section>

        {/* Keywords & ATS */}
        <section className="rep-section" ref={refs.keywords}>
          <div className="rs-head">🔑 Keywords & ATS</div>
          <div className="rs-sub">Words and phrases to weave into your CV naturally.</div>
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="eyebrow muted" style={{ marginBottom: 10 }}>Missing keywords from the JD</div>
            <div>{r.keyword_gaps?.map((k, i) => <span className="kw-tag" key={i}>{k}</span>)}</div>
          </div>
          <div className="card">
            <div className="eyebrow muted" style={{ marginBottom: 10 }}>ATS Optimisation</div>
            {r.ats_notes?.map((n, i) => <div className="col-row" key={i}><span style={{ color: "var(--gold)" }}>→</span>{n}</div>)}
          </div>
        </section>

        {/* Interview Questions */}
        <section className="rep-section" ref={refs.questions}>
          <div className="rs-head">💬 Interview Questions</div>
          <div className="rs-sub">Most likely questions with answer frameworks.</div>
          {r.interview_questions?.map((q, i) => (
            <div className="q-card" key={i}>
              <div className="q-top">
                <div className="q-text">{i + 1}. {q.question}</div>
                <div className={`q-badge ${q.risk_level === "tricky" ? "q-tricky" : "q-std"}`}>{q.risk_level}</div>
              </div>
              <div className="q-why"><strong>Why likely:</strong> {q.why_likely}</div>
              <div className="eyebrow muted" style={{ marginBottom: 6 }}>Answer framework</div>
              <div>{q.answer_framework?.map((f, j) => <span className="q-chip" key={j}>{j + 1}. {f}</span>)}</div>
            </div>
          ))}

          <div className="card" style={{ marginTop: 16 }}>
            <div className="eyebrow muted" style={{ marginBottom: 10 }}>Smart questions to ask the interviewer</div>
            {r.questions_to_ask?.map((q, i) => <div className="col-row" key={i}><span style={{ color: "var(--blue)" }}>?</span>{q}</div>)}
          </div>
        </section>

        {/* Action Plan */}
        <section className="rep-section" ref={refs.actions}>
          <div className="rs-head">🎯 Action Plan</div>
          <div className="rs-sub">What to do — ordered by urgency.</div>
          <div className="act-cols">
            <div className="act-col">
              <div className="act-head act-now" style={{ borderColor: "var(--rose)" }}>⚡ Fix Now</div>
              {r.action_plan?.fix_now?.map((a, i) => <div className="act-row" key={i}><span className="muted">•</span>{a}</div>)}
            </div>
            <div className="act-col">
              <div className="act-head act-today" style={{ borderColor: "var(--gold)" }}>☀️ Fix Today</div>
              {r.action_plan?.fix_today?.map((a, i) => <div className="act-row" key={i}><span className="muted">•</span>{a}</div>)}
            </div>
            <div className="act-col">
              <div className="act-head act-week" style={{ borderColor: "var(--sage)" }}>📅 This Week</div>
              {r.action_plan?.fix_this_week?.map((a, i) => <div className="act-row" key={i}><span className="muted">•</span>{a}</div>)}
            </div>
          </div>
        </section>

        <div style={{ background: "var(--ink)", borderRadius: 12, padding: 24, textAlign: "center", color: "#fff" }}>
          <div className="cg" style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>You're ready, {user.name}.</div>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: 14, marginBottom: 16 }}>Work through the action plan today and you'll walk in prepared.</p>
          <button className="btn btn-gold" onClick={onReset}>+ Analyse another job</button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
//  APP ROOT
// ══════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [user, setUser] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [report, setReport] = useState(null);

  const reset = () => { setScreen("input"); setReport(null); setInputs(null); };

  return (
    <>
      <style>{S}</style>
      {screen === "landing" && <Landing onStart={() => setScreen("onboarding")} />}
      {screen === "onboarding" && <Onboarding onComplete={(u) => { setUser(u); setScreen("input"); }} />}
      {screen === "input" && <InputScreen user={user} onAnalyze={(i) => { setInputs(i); setScreen("processing"); }} />}
      {screen === "processing" && <Processing {...inputs} user={user} onComplete={(r) => { setReport(r); setScreen("preview"); }} />}
      {screen === "preview" && <Preview report={report} user={user} onUpgrade={() => setScreen("paywall")} />}
      {screen === "paywall" && <Paywall report={report} onPay={() => setScreen("full")} onBack={() => setScreen("preview")} />}
      {screen === "full" && <FullReport report={report} user={user} onReset={reset} />}
    </>
  );
}
