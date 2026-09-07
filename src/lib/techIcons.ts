import React from "react";
import {
  Globe,
  Layout,
  Database,
  Cpu,
  Code,
  Package,
  Wind,
  Component,
  ShieldCheck,
  CreditCard,
  Lock,
  Cloud,
  Mail,
  FileCode2,
  Terminal,
  Radio,
  Coins,
  Wallet,
  Blocks,
  TrendingUp,
  Bot,
  Film,
  Image as ImageIcon,
  GitBranch,
  Box,
  Triangle,
  LayoutGrid,
  Server,
  Flame,
  Zap,
  HardDrive,
  RefreshCw,
  Palette,
  CheckCircle2,
  Building2,
  LucideIcon,
} from "lucide-react";

/**
 * Normalized tech icon mapping for all portfolio technologies
 */
const TECH_ICON_MAP: Record<string, LucideIcon> = {
  // Frameworks & Libraries
  react: Globe,
  reactjs: Globe,
  "react.js": Globe,
  "next.js": Globe,
  nextjs: Globe,
  "next js": Globe,
  vue: Globe,
  angular: Globe,

  // Languages
  typescript: FileCode2,
  ts: FileCode2,
  javascript: Code,
  js: Code,
  html: FileCode2,
  html5: FileCode2,
  css: Palette,
  css3: Palette,
  "css modules": Palette,
  python: Terminal,
  move: Blocks,

  // Styling & UI
  tailwind: Wind,
  "tailwind css": Wind,
  "shadcn/ui": Component,
  "shadcn ui": Component,
  shadcn: Component,
  "material ui": LayoutGrid,
  mui: LayoutGrid,

  // State & Forms & Validation
  zod: ShieldCheck,
  "react hook form": CheckCircle2,
  "redux toolkit": RefreshCw,
  redux: RefreshCw,

  // Databases & ORM
  prisma: Database,
  postgresql: HardDrive,
  postgres: HardDrive,
  mysql: HardDrive,
  mongodb: Database,
  mongoose: Database,
  redis: Zap,
  bullmq: Zap,
  supabase: Server,
  appwrite: Server,

  // Backend & Servers
  "express.js": Server,
  express: Server,
  "express js": Server,
  "node.js": Cpu,
  nodejs: Cpu,
  "node js": Cpu,
  "socket.io": Radio,
  "erpnext / frappe": Building2,
  erpnext: Building2,
  frappe: Building2,
  "node-cron": Cpu,

  // Cloud & Storage & Auth
  "auth.js": Lock,
  nextauth: Lock,
  "cloudflare r2": Cloud,
  cloudflare: Cloud,
  "firebase storage": Flame,
  firebase: Flame,

  // Payments & APIs & Services
  credimax: CreditCard,
  benefitpay: CreditCard,
  "paystack api": CreditCard,
  paystack: CreditCard,
  "stripe api": CreditCard,
  stripe: CreditCard,
  resend: Mail,
  nodemailer: Mail,
  "tradingview widget": TrendingUp,
  "telegram bot api": Bot,
  "coinlore api": Coins,
  "tmdb api": Film,
  sharp: ImageIcon,

  // Blockchain & Web3
  aptos: Blocks,
  "aptos move smart contracts": Blocks,
  "aptos wallet adapter": Wallet,
  "aptos node api": Coins,

  // Tools & DevOps
  git: GitBranch,
  docker: Box,
  vercel: Triangle,
  linux: Terminal,
  "vs code": Code,
  "visual studio code": Code,
};

/**
 * Returns the appropriate Lucide icon for a given technology name
 */
export function getTechIcon(techName: string): LucideIcon {
  if (!techName) return Package;
  const normalized = techName.toLowerCase().trim();
  return TECH_ICON_MAP[normalized] || Package;
}
