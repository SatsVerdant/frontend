"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Menu, X, Home, ArrowRight, Leaf, Bitcoin, Shield, BarChart3, Users, Settings, ChevronLeft, ChevronRight } from "lucide-react"

/*********************************
 * THEME TOKENS (Enhanced with semantic design tokens)
 *****************/
const THEME_DEFS: Record<string, React.CSSProperties> = {
  "sats-soil": {
    // Bitcoin orange x deep forest theme
    ["--theme-bg" as any]: "oklch(0.08 0.02 120)", // Deep forest background
    ["--theme-panel" as any]: "oklch(0.12 0.03 120)", // Forest panel
    ["--theme-muted" as any]: "oklch(0.5 0.02 120)", // Forest muted
    ["--theme-text" as any]: "oklch(0.95 0.01 120)", // Light forest text
    ["--theme-accent" as any]: "oklch(0.65 0.2 45)", // Bitcoin orange
    ["--theme-accent-2" as any]: "oklch(0.6 0.15 140)", // Forest mint
    ["--theme-ring" as any]: "oklch(0.6 0.15 140)",
    ["--theme-card" as any]: "linear-gradient(135deg, oklch(0.6 0.15 140 / 0.08), oklch(0.65 0.2 45 / 0.08))",
  },
  "topograph-carbon": {
    // Charcoal x cyber-mint theme
    ["--theme-bg" as any]: "oklch(0.08 0.01 240)", // Deep charcoal
    ["--theme-panel" as any]: "oklch(0.12 0.02 240)", // Charcoal panel
    ["--theme-muted" as any]: "oklch(0.55 0.02 240)", // Charcoal muted
    ["--theme-text" as any]: "oklch(0.95 0.01 240)", // Light charcoal text
    ["--theme-accent" as any]: "oklch(0.75 0.15 180)", // Cyber-mint
    ["--theme-accent-2" as any]: "oklch(0.7 0.12 260)", // Cool periwinkle
    ["--theme-ring" as any]: "oklch(0.75 0.15 180)",
    ["--theme-card" as any]: "linear-gradient(160deg, oklch(0.75 0.15 180 / 0.08), oklch(0.7 0.12 260 / 0.08))",
  },
  "proof-of-recycle": {
    // Ocean teal x sandy beige theme
    ["--theme-bg" as any]: "oklch(0.08 0.03 200)", // Deep ocean
    ["--theme-panel" as any]: "oklch(0.12 0.04 200)", // Ocean panel
    ["--theme-muted" as any]: "oklch(0.55 0.03 200)", // Ocean muted
    ["--theme-text" as any]: "oklch(0.95 0.01 200)", // Light ocean text
    ["--theme-accent" as any]: "oklch(0.65 0.12 180)", // Ocean teal
    ["--theme-accent-2" as any]: "oklch(0.75 0.1 60)", // Sandy gold
    ["--theme-ring" as any]: "oklch(0.65 0.12 180)",
    ["--theme-card" as any]: "linear-gradient(145deg, oklch(0.65 0.12 180 / 0.10), oklch(0.75 0.1 60 / 0.10))",
  },
}

/*********************************
 * LAYOUT PRIMITIVES (Enhanced with semantic tokens)
 *****************/
const Panel: React.FC<{
  title?: string
  subtitle?: string
  children?: React.ReactNode
  className?: string
  toolbar?: React.ReactNode
}> = ({ title, subtitle, children, className, toolbar }) => (
  <Card
    className={cn(
      "border-border/50 shadow-lg hover:shadow-xl transition-all duration-300",
      "bg-card/90 backdrop-blur-sm",
      className,
    )}
    style={{ backgroundImage: "var(--theme-card)" }}
  >
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          {title && <CardTitle className="text-foreground text-balance">{title}</CardTitle>}
          {subtitle && <CardDescription className="text-muted-foreground text-pretty">{subtitle}</CardDescription>}
        </div>
        {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
      </div>
    </CardHeader>
    <CardContent className="text-foreground/90">{children}</CardContent>
  </Card>
)

const Kpi: React.FC<{ label: string; value: string; hint?: string }> = ({ label, value, hint }) => (
  <Card
    className="border-border/50 bg-card/80 shadow-md hover:shadow-lg transition-shadow"
    style={{ backgroundImage: "var(--theme-card)" }}
  >
    <CardContent className="p-4 sm:p-5">
      <div className="text-muted-foreground text-xs uppercase tracking-wider font-medium">{label}</div>
      <div className="text-2xl sm:text-3xl font-bold text-foreground mt-1 text-balance">{value}</div>
      {hint && <div className="text-muted-foreground text-xs mt-2">{hint}</div>}
    </CardContent>
  </Card>
)

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Badge
    variant="outline"
    className="border-primary/40 text-primary/90 bg-primary/10 hover:bg-primary/20 transition-colors"
  >
    {children}
  </Badge>
)

/*********************************
 * NAVIGATION / ROUTING
 *****************/
type RouteKey =
  | "landing"
  | "dashboard"
  | "waste"
  | "rewards"
  | "validator"
  | "governance"
  | "esg"
  | "market"
  | "guide"
  | "settings"

const NAV_ITEMS: { key: RouteKey; label: string; icon: React.ReactNode }[] = [
  { key: "dashboard", label: "Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
  { key: "waste", label: "Waste Submission", icon: <Leaf className="w-4 h-4" /> },
  { key: "rewards", label: "Rewards", icon: <Bitcoin className="w-4 h-4" /> },
  { key: "validator", label: "Validator Hub", icon: <Shield className="w-4 h-4" /> },
  { key: "governance", label: "Governance", icon: <Users className="w-4 h-4" /> },
  { key: "esg", label: "ESG Dashboard", icon: <BarChart3 className="w-4 h-4" /> },
  { key: "market", label: "Marketplace", icon: <BarChart3 className="w-4 h-4" /> },
  { key: "guide", label: "Implementation Guide", icon: <BarChart3 className="w-4 h-4" /> },
  { key: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
]

/*********************************
 * PAGE FRAGMENTS
 *****************/
function TopoBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
      style={{
        backgroundImage:
          "radial-gradient(40rem 20rem at 20% -10%, var(--theme-accent)/20 10%, transparent 60%), " +
          "radial-gradient(30rem 16rem at 100% 0%, var(--theme-accent-2)/20 5%, transparent 60%)",
        maskImage:
          "radial-gradient(60rem 40rem at 30% 0%, black 0%, transparent 70%), radial-gradient(60rem 40rem at 80% 0%, black 0%, transparent 70%)",
      }}
    />
  )
}

const LandingPage = ({ onEnterApp }: { onEnterApp: () => void }) => (
  <div className="space-y-12">
    {/* Hero Section */}
    <div className="relative text-center space-y-6">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: `url('/background-recycling.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/50 to-background/70" />

      <div className="relative z-10 space-y-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-foreground text-balance">
          Turn Waste into <span className="text-primary">Bitcoin</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          SatsVerdant uses AI to verify your recycling efforts and rewards you with sBTC while healing the planet
        </p>
      </div>
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-8"
          onClick={onEnterApp}
        >
          Enter App <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button variant="outline" size="lg" className="border-border hover:bg-accent/10 bg-transparent px-8">
          View Documentation
        </Button>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <Kpi label="Waste Tokens Minted" value="2.4M" hint="All-time verified" />
      <Kpi label="sBTC Rewards Distributed" value="12.8 BTC" hint="To recyclers globally" />
      <Kpi label="CO₂ Offset Verified" value="45,200 t" hint="Carbon impact tracked" />
    </div>

    {/* Features */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Panel title="AI-Powered Classification" subtitle="Upload photos, get instant verification">
        <div className="space-y-3">
          <div className="h-32 rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center text-muted-foreground">
            📸 Smart waste detection
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag>Plastic Detection</Tag>
            <Tag>Weight Estimation</Tag>
            <Tag>Quality Grading</Tag>
          </div>
        </div>
      </Panel>

      <Panel title="Bitcoin Rewards" subtitle="Earn sBTC for verified recycling">
        <div className="space-y-4">
          <div className="text-3xl font-bold text-primary">0.00024 BTC</div>
          <div className="text-sm text-muted-foreground">Average reward per kg of verified plastic</div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Start Earning</Button>
        </div>
      </Panel>

      <Panel title="Validator Network" subtitle="Stake STX, validate submissions">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">Active Validators</div>
              <div className="font-semibold text-foreground">1,247</div>
            </div>
            <div>
              <div className="text-muted-foreground">Staked STX</div>
              <div className="font-semibold text-foreground">2.1M</div>
            </div>
          </div>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent">
            Become Validator
          </Button>
        </div>
      </Panel>
    </div>

    {/* How it Works */}
    <Panel title="How SatsVerdant Works" subtitle="Simple steps to earn Bitcoin from recycling">
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { step: "1", title: "Upload Waste", desc: "Take photos of your recyclable materials" },
          { step: "2", title: "AI Verification", desc: "Our AI classifies and grades your submission" },
          { step: "3", title: "Mint Tokens", desc: "Verified waste becomes blockchain tokens" },
          { step: "4", title: "Earn sBTC", desc: "Claim your Bitcoin rewards instantly" },
        ].map((item) => (
          <div key={item.step} className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto">
              {item.step}
            </div>
            <div>
              <div className="font-semibold text-foreground">{item.title}</div>
              <div className="text-sm text-muted-foreground text-pretty">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  </div>
)

const DashboardPage = ({ onGoHome }: { onGoHome: () => void }) => (
  <div className="space-y-6">
    {/* Header with back button */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Recycler Dashboard</h1>
        <p className="text-muted-foreground">Track your impact and earnings</p>
      </div>
      <Button variant="outline" onClick={onGoHome} className="border-border hover:bg-accent/10 bg-transparent">
        <Home className="w-4 h-4 mr-2" />
        Home
      </Button>
    </div>

    <div className="grid xl:grid-cols-3 gap-6">
      <Panel title="Impact Overview" subtitle="Your last 30 days" className="xl:col-span-2">
        <div className="h-48 rounded-lg border border-dashed border-border/50 grid place-items-center text-muted-foreground mb-4">
          📊 Chart: Daily waste submissions and rewards over time
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Kpi label="Tokens Minted" value="4,210" hint="+12% vs last month" />
          <Kpi label="Rewards Earned" value="0.006 BTC" hint="≈ $240 USD" />
          <Kpi label="CO₂ Offset" value="3.2 t" hint="Verified impact" />
        </div>
      </Panel>

      <Panel title="Recent Activity" subtitle="Latest transactions">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <div>
              <div className="text-foreground font-medium">Plastic Bottles</div>
              <div className="text-muted-foreground">2.4kg → 240 tokens</div>
            </div>
            <div className="text-primary font-semibold">+0.0002 BTC</div>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-border/50">
            <div>
              <div className="text-foreground font-medium">Aluminum Cans</div>
              <div className="text-muted-foreground">1.8kg → 360 tokens</div>
            </div>
            <div className="text-primary font-semibold">+0.0003 BTC</div>
          </div>
          <div className="flex justify-between items-center py-3">
            <div>
              <div className="text-foreground font-medium">Paper Waste</div>
              <div className="text-muted-foreground">5.2kg → 156 tokens</div>
            </div>
            <div className="text-primary font-semibold">+0.0001 BTC</div>
          </div>
        </div>
      </Panel>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <Panel title="Achievement Badges" subtitle="Unlock milestones as you recycle">
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Plastic Pioneer", desc: "100kg plastic recycled", earned: true },
            { name: "Carbon Saver", desc: "1 ton CO₂ offset", earned: true },
            { name: "Local Hero", desc: "Top recycler in area", earned: true },
            { name: "Bitcoin Earner", desc: "0.01 BTC earned", earned: false },
          ].map((badge) => (
            <div
              key={badge.name}
              className={cn(
                "p-3 rounded-lg border text-center space-y-2",
                badge.earned ? "border-primary/40 bg-primary/10" : "border-border/50 bg-card/50",
              )}
            >
              <div className="text-2xl">{badge.earned ? "🏆" : "🔒"}</div>
              <div>
                <div className={cn("font-semibold text-sm", badge.earned ? "text-primary" : "text-muted-foreground")}>
                  {badge.name}
                </div>
                <div className="text-xs text-muted-foreground">{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Quick Actions" subtitle="Common tasks">
        <div className="grid gap-3">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground justify-start">
            <Leaf className="w-4 h-4 mr-2" />
            Submit New Waste
          </Button>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent justify-start">
            <Bitcoin className="w-4 h-4 mr-2" />
            Claim Pending Rewards
          </Button>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Stake as Validator
          </Button>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent justify-start">
            <Users className="w-4 h-4 mr-2" />
            View Governance
          </Button>
        </div>
      </Panel>
    </div>
  </div>
)

const WasteSubmissionPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Waste Submission</h1>
      <p className="text-muted-foreground">Upload photos for AI classification and token minting</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <Panel title="Upload & Classify" subtitle="AI-powered waste detection" className="lg:col-span-2">
        <div className="space-y-4">
          <div className="h-64 rounded-lg border-2 border-dashed border-border/50 grid place-items-center text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
            <div className="text-center space-y-2">
              <div className="text-4xl">📸</div>
              <div>Drop waste photos here or click to upload</div>
              <div className="text-xs">Supports JPG, PNG up to 10MB</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Waste Type", value: "Plastic Bottles (PET)", confidence: "98%" },
              { label: "Estimated Weight", value: "2.4 kg", confidence: "±0.2kg" },
              { label: "Quality Grade", value: "Grade A", confidence: "Clean, sorted" },
              { label: "Location", value: "Lagos, Nigeria", confidence: "GPS verified" },
            ].map((item, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-3">
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="font-semibold text-foreground">{item.value}</div>
                  <div className="text-xs text-primary">{item.confidence}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-2">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1">
              Mint 240 Waste Tokens
            </Button>
            <Button variant="outline" className="border-border hover:bg-accent/10 bg-transparent">
              Save Draft
            </Button>
          </div>
        </div>
      </Panel>

      <div className="space-y-6">
        <Panel title="Carbon Impact" subtitle="Environmental benefit calculation">
          <div className="space-y-4">
            <div className="h-32 rounded-lg border border-dashed border-border/50 grid place-items-center text-muted-foreground">
              🌱 CO₂ Impact Visualization
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">CO₂ per kg plastic:</span>
                <span className="text-sm font-semibold text-foreground">0.5 kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total offset:</span>
                <span className="text-sm font-semibold text-primary">1.2 kg CO₂</span>
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="sBTC Reward Estimate" subtitle="Your Bitcoin earnings">
          <div className="space-y-4">
            <div>
              <div className="text-3xl font-bold text-primary">0.00024 BTC</div>
              <div className="text-sm text-muted-foreground">≈ $9.60 USD at current rate</div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base rate (240 tokens):</span>
                <span className="text-foreground">0.00020 BTC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quality bonus (Grade A):</span>
                <span className="text-foreground">0.00004 BTC</span>
              </div>
            </div>
            <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent">
              Preview Claim
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  </div>
)

const RewardsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Rewards Dashboard</h1>
      <p className="text-muted-foreground">Track and claim your Bitcoin earnings</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <Panel title="Total Earnings" subtitle="All-time Bitcoin rewards" className="lg:col-span-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Kpi label="Total Earned" value="0.0847 BTC" hint="≈ $3,388 USD" />
          <Kpi label="Pending Claims" value="0.0023 BTC" hint="≈ $92 USD" />
          <Kpi label="This Month" value="0.0156 BTC" hint="≈ $624 USD" />
        </div>
        <div className="h-48 rounded-lg border border-dashed border-border/50 grid place-items-center text-muted-foreground">
          📈 Chart: Monthly Bitcoin earnings over time
        </div>
      </Panel>

      <Panel title="Quick Claim" subtitle="Available rewards">
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">0.0023 BTC</div>
            <div className="text-sm text-muted-foreground">Ready to claim</div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Claim Now</Button>
          <div className="text-xs text-muted-foreground text-center">Gas fees: ~0.00001 BTC</div>
        </div>
      </Panel>
    </div>

    <Panel title="Reward History" subtitle="Recent Bitcoin payments">
      <div className="space-y-3">
        {[
          { date: "2024-01-15", amount: "0.00024 BTC", source: "Plastic bottles (2.4kg)", status: "Claimed" },
          { date: "2024-01-14", amount: "0.00036 BTC", source: "Aluminum cans (1.8kg)", status: "Claimed" },
          { date: "2024-01-13", amount: "0.00015 BTC", source: "Paper waste (5.2kg)", status: "Pending" },
          { date: "2024-01-12", amount: "0.00028 BTC", source: "Mixed plastics (3.1kg)", status: "Claimed" },
        ].map((reward, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
            <div>
              <div className="font-medium text-foreground">{reward.source}</div>
              <div className="text-sm text-muted-foreground">{reward.date}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-primary">{reward.amount}</div>
              <div
                className={cn(
                  "text-xs px-2 py-1 rounded",
                  reward.status === "Claimed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400",
                )}
              >
                {reward.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  </div>
)

const ValidatorPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Validator Hub</h1>
      <p className="text-muted-foreground">Stake STX tokens and validate waste submissions to earn rewards</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <Panel title="Validator Stats" subtitle="Network overview" className="lg:col-span-2">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <Kpi label="Active Validators" value="1,247" hint="Online now" />
          <Kpi label="Total Staked" value="2.1M STX" hint="≈ $420K USD" />
          <Kpi label="Pending Queue" value="89" hint="Submissions" />
          <Kpi label="Avg APY" value="12.4%" hint="Annual yield" />
        </div>
        <div className="h-48 rounded-lg border border-dashed border-border/50 grid place-items-center text-muted-foreground">
          📊 Chart: Validation activity and rewards over time
        </div>
      </Panel>

      <Panel title="Your Validator Status" subtitle="Staking overview">
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">5,000 STX</div>
            <div className="text-sm text-muted-foreground">Currently staked</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Validations completed:</span>
              <span className="text-foreground font-semibold">247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Success rate:</span>
              <span className="text-green-400 font-semibold">98.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rewards earned:</span>
              <span className="text-primary font-semibold">0.0034 BTC</span>
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Increase Stake</Button>
        </div>
      </Panel>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <Panel title="Validation Queue" subtitle="Pending waste submissions">
        <div className="space-y-3">
          {[
            { id: "#V2847", type: "Plastic bottles", weight: "3.2kg", confidence: "High", reward: "0.00008 BTC" },
            { id: "#V2846", type: "Aluminum cans", weight: "1.8kg", confidence: "Medium", reward: "0.00012 BTC" },
            { id: "#V2845", type: "Paper waste", weight: "4.5kg", confidence: "High", reward: "0.00006 BTC" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
              <div>
                <div className="font-medium text-foreground">{item.id}</div>
                <div className="text-sm text-muted-foreground">
                  {item.type} • {item.weight}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-primary">{item.reward}</div>
                <div
                  className={cn(
                    "text-xs px-2 py-1 rounded",
                    item.confidence === "High" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400",
                  )}
                >
                  {item.confidence}
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 border-border hover:bg-accent/10 bg-transparent">
          View All Submissions
        </Button>
      </Panel>

      <Panel title="Staking Actions" subtitle="Manage your validator stake">
        <div className="space-y-4">
          <div className="grid gap-3">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground justify-start">
              <Shield className="w-4 h-4 mr-2" />
              Stake More STX
            </Button>
            <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent justify-start">
              <Bitcoin className="w-4 h-4 mr-2" />
              Claim Validator Rewards
            </Button>
            <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Update Validator Settings
            </Button>
          </div>
          <div className="p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="text-xs text-muted-foreground mb-1">Minimum stake required</div>
            <div className="font-semibold text-foreground">1,000 STX</div>
          </div>
        </div>
      </Panel>
    </div>
  </div>
)

const GovernancePage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Governance</h1>
      <p className="text-muted-foreground">Participate in protocol decisions and vote on proposals</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <Panel title="Governance Overview" subtitle="Protocol statistics" className="lg:col-span-2">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <Kpi label="Active Proposals" value="3" hint="Voting now" />
          <Kpi label="Total Voters" value="8,247" hint="Registered" />
          <Kpi label="Voting Power" value="12.4M STX" hint="Total staked" />
          <Kpi label="Participation" value="67%" hint="Last proposal" />
        </div>
        <div className="h-48 rounded-lg border border-dashed border-border/50 grid place-items-center text-muted-foreground">
          📊 Chart: Governance participation over time
        </div>
      </Panel>

      <Panel title="Your Voting Power" subtitle="Governance participation">
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">5,000 STX</div>
            <div className="text-sm text-muted-foreground">Voting power</div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Proposals voted:</span>
              <span className="text-foreground font-semibold">12/15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Participation rate:</span>
              <span className="text-green-400 font-semibold">80%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Governance rewards:</span>
              <span className="text-primary font-semibold">247 STX</span>
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Delegate Voting Power
          </Button>
        </div>
      </Panel>
    </div>

    <Panel title="Active Proposals" subtitle="Vote on current protocol changes">
      <div className="space-y-4">
        {[
          {
            id: "SIP-024",
            title: "Increase Validator Rewards by 15%",
            description:
              "Proposal to increase validator rewards to incentivize more participation in waste verification",
            status: "Active",
            votes: { for: 4247, against: 1832, abstain: 234 },
            timeLeft: "3 days",
            yourVote: null,
          },
          {
            id: "SIP-023",
            title: "Add Support for Glass Recycling",
            description: "Extend the platform to support glass waste classification and token minting",
            status: "Active",
            votes: { for: 6891, against: 892, abstain: 156 },
            timeLeft: "1 day",
            yourVote: "For",
          },
          {
            id: "SIP-022",
            title: "Update Carbon Credit Calculation",
            description: "Revise the formula for calculating carbon credits based on latest environmental data",
            status: "Passed",
            votes: { for: 8234, against: 1456, abstain: 445 },
            timeLeft: "Ended",
            yourVote: "For",
          },
        ].map((proposal, i) => (
          <div key={i} className="p-4 border border-border/50 rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-foreground">
                    {proposal.id}: {proposal.title}
                  </div>
                  <div
                    className={cn(
                      "text-xs px-2 py-1 rounded",
                      proposal.status === "Active"
                        ? "bg-blue-500/20 text-blue-400"
                        : proposal.status === "Passed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-gray-500/20 text-gray-400",
                    )}
                  >
                    {proposal.status}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{proposal.description}</div>
              </div>
              <div className="text-right text-sm">
                <div className="text-muted-foreground">{proposal.timeLeft}</div>
                {proposal.yourVote && <div className="text-primary font-semibold">Voted: {proposal.yourVote}</div>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center">
                <div className="text-green-400 font-semibold">{proposal.votes.for.toLocaleString()}</div>
                <div className="text-muted-foreground">For</div>
              </div>
              <div className="text-center">
                <div className="text-red-400 font-semibold">{proposal.votes.against.toLocaleString()}</div>
                <div className="text-muted-foreground">Against</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-semibold">{proposal.votes.abstain.toLocaleString()}</div>
                <div className="text-muted-foreground">Abstain</div>
              </div>
            </div>

            {proposal.status === "Active" && !proposal.yourVote && (
              <div className="flex gap-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white flex-1">
                  Vote For
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/10 flex-1 bg-transparent"
                >
                  Vote Against
                </Button>
                <Button size="sm" variant="outline" className="border-border hover:bg-accent/10 bg-transparent">
                  Abstain
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Panel>
  </div>
)

const ESGPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">ESG Dashboard</h1>
      <p className="text-muted-foreground">Environmental, Social & Governance impact metrics</p>
    </div>

    <div className="grid lg:grid-cols-4 gap-6">
      <Kpi label="CO₂ Offset Total" value="45,200 t" hint="Verified impact" />
      <Kpi label="Waste Diverted" value="2.4M kg" hint="From landfills" />
      <Kpi label="Communities" value="127" hint="Active globally" />
      <Kpi label="ESG Score" value="A+" hint="Third-party rated" />
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <Panel title="Environmental Impact" subtitle="Carbon and waste metrics">
        <div className="space-y-4">
          <div className="h-48 rounded-lg border border-dashed border-border/50 grid place-items-center text-muted-foreground">
            🌍 Chart: Monthly environmental impact trends
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-card/50 rounded-lg border border-border/50">
              <div className="text-xs text-muted-foreground">Plastic Recycled</div>
              <div className="font-semibold text-foreground">1.8M kg</div>
              <div className="text-xs text-green-400">+12% this month</div>
            </div>
            <div className="p-3 bg-card/50 rounded-lg border border-border/50">
              <div className="text-xs text-muted-foreground">Energy Saved</div>
              <div className="font-semibold text-foreground">2.1 GWh</div>
              <div className="text-xs text-green-400">+8% this month</div>
            </div>
          </div>
        </div>
      </Panel>

      <Panel title="Social Impact" subtitle="Community engagement metrics">
        <div className="space-y-4">
          <div className="h-48 rounded-lg border border-dashed border-border/50 grid place-items-center text-muted-foreground">
            👥 Chart: Community participation by region
          </div>
          <div className="space-y-2">
            {[
              { region: "Sub-Saharan Africa", participants: "45,200", growth: "+23%" },
              { region: "Southeast Asia", participants: "38,900", growth: "+18%" },
              { region: "Latin America", participants: "29,400", growth: "+15%" },
              { region: "Other Regions", participants: "12,800", growth: "+9%" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <div>
                  <div className="font-medium text-foreground">{item.region}</div>
                  <div className="text-sm text-muted-foreground">{item.participants} participants</div>
                </div>
                <div className="text-green-400 font-semibold">{item.growth}</div>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>

    <Panel title="ESG Certifications & Reports" subtitle="Third-party verification and compliance">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            title: "Carbon Trust Certification",
            status: "Verified",
            date: "2024-01-15",
            description: "Independently verified carbon offset calculations",
          },
          {
            title: "B-Corp Assessment",
            status: "In Progress",
            date: "2024-02-01",
            description: "Social and environmental performance evaluation",
          },
          {
            title: "UN SDG Alignment",
            status: "Certified",
            date: "2023-12-10",
            description: "Aligned with Sustainable Development Goals 12, 13, 14",
          },
        ].map((cert, i) => (
          <div key={i} className="p-4 border border-border/50 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-foreground">{cert.title}</div>
              <div
                className={cn(
                  "text-xs px-2 py-1 rounded",
                  cert.status === "Verified" || cert.status === "Certified"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400",
                )}
              >
                {cert.status}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{cert.description}</div>
            <div className="text-xs text-muted-foreground">{cert.date}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Download ESG Report</Button>
        <Button variant="outline" className="border-border hover:bg-accent/10 bg-transparent">
          View Certifications
        </Button>
      </div>
    </Panel>
  </div>
)

const MarketplacePage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Carbon Marketplace</h1>
      <p className="text-muted-foreground">Trade verified carbon credits and environmental assets</p>
    </div>

    <div className="grid lg:grid-cols-4 gap-6">
      <Kpi label="Credits Available" value="12,847" hint="Verified tons CO₂" />
      <Kpi label="Average Price" value="$24.50" hint="Per ton CO₂" />
      <Kpi label="Volume Today" value="247 t" hint="Credits traded" />
      <Kpi label="Your Portfolio" value="45 t" hint="Credits owned" />
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <Panel title="Market Activity" subtitle="Recent trading data" className="lg:col-span-2">
        <div className="h-48 rounded-lg border border-dashed border-border/50 grid place-items-center text-muted-foreground mb-4">
          📈 Chart: Carbon credit prices and volume over time
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="text-xs text-muted-foreground">24h Volume</div>
            <div className="font-semibold text-foreground">1,247 t CO₂</div>
            <div className="text-xs text-green-400">+15.2%</div>
          </div>
          <div className="p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="text-xs text-muted-foreground">Price Change</div>
            <div className="font-semibold text-foreground">$24.50</div>
            <div className="text-xs text-green-400">+$1.20</div>
          </div>
          <div className="p-3 bg-card/50 rounded-lg border border-border/50">
            <div className="text-xs text-muted-foreground">Market Cap</div>
            <div className="font-semibold text-foreground">$314.7K</div>
            <div className="text-xs text-green-400">+8.4%</div>
          </div>
        </div>
      </Panel>

      <Panel title="Quick Trade" subtitle="Buy/sell carbon credits">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white">Buy Credits</Button>
            <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent">
              Sell Credits
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Your balance:</span>
              <span className="text-foreground font-semibold">45 t CO₂</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Est. value:</span>
              <span className="text-primary font-semibold">$1,102.50</span>
            </div>
          </div>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent">
            View Portfolio
          </Button>
        </div>
      </Panel>
    </div>

    <Panel title="Available Carbon Credits" subtitle="Verified environmental assets for trading">
      <div className="space-y-3">
        {[
          {
            id: "CC-2024-001",
            type: "Plastic Recycling",
            amount: "125 t CO₂",
            price: "$24.50",
            location: "Lagos, Nigeria",
            verification: "Gold Standard",
            vintage: "2024",
          },
          {
            id: "CC-2024-002",
            type: "Waste Diversion",
            amount: "89 t CO₂",
            price: "$23.80",
            location: "Manila, Philippines",
            verification: "Verra VCS",
            vintage: "2024",
          },
          {
            id: "CC-2023-156",
            type: "Aluminum Recycling",
            amount: "67 t CO₂",
            price: "$25.20",
            location: "São Paulo, Brazil",
            verification: "Gold Standard",
            vintage: "2023",
          },
        ].map((credit, i) => (
          <div key={i} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="font-semibold text-foreground">{credit.id}</div>
                <div className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">{credit.verification}</div>
              </div>
              <div className="text-sm text-muted-foreground">
                {credit.type} • {credit.location} • {credit.vintage}
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="font-semibold text-foreground">{credit.amount}</div>
              <div className="text-primary font-semibold">{credit.price}/t</div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Buy
              </Button>
              <Button size="sm" variant="outline" className="border-border hover:bg-accent/10 bg-transparent">
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" className="w-full mt-4 border-border hover:bg-accent/10 bg-transparent">
        View All Credits
      </Button>
    </Panel>
  </div>
)

const GuidePage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Implementation Guide</h1>
      <p className="text-muted-foreground">Technical documentation and integration resources</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <Panel title="Quick Start" subtitle="Get started in minutes" className="lg:col-span-2">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { step: "1", title: "Connect Wallet", desc: "Link your Stacks wallet to start earning" },
              { step: "2", title: "Upload Waste", desc: "Take photos of recyclable materials" },
              { step: "3", title: "Get Verified", desc: "AI classifies and validators confirm" },
              { step: "4", title: "Earn sBTC", desc: "Claim your Bitcoin rewards" },
            ].map((item) => (
              <div key={item.step} className="flex gap-3 p-3 border border-border/50 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Start Tutorial</Button>
        </div>
      </Panel>

      <Panel title="Developer Resources" subtitle="APIs and SDKs">
        <div className="space-y-3">
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent justify-start">
            📚 API Documentation
          </Button>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent justify-start">
            🔧 JavaScript SDK
          </Button>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent justify-start">
            🐍 Python SDK
          </Button>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent justify-start">
            📱 Mobile SDK
          </Button>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent justify-start">
            🔗 Webhook Guide
          </Button>
        </div>
      </Panel>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <Panel title="Smart Contract Architecture" subtitle="Blockchain implementation details">
        <div className="space-y-4">
          <div className="h-32 rounded-lg border border-dashed border-border/50 grid place-items-center text-muted-foreground">
            🏗️ Contract architecture diagram
          </div>
          <div className="space-y-2">
            {[
              { name: "WasteToken Contract", desc: "Mints tokens for verified waste submissions" },
              { name: "Validator Contract", desc: "Manages staking and validation rewards" },
              { name: "Governance Contract", desc: "Handles protocol proposals and voting" },
              { name: "Reward Contract", desc: "Distributes sBTC rewards to users" },
            ].map((contract, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                <div>
                  <div className="font-medium text-foreground">{contract.name}</div>
                  <div className="text-sm text-muted-foreground">{contract.desc}</div>
                </div>
                <Button size="sm" variant="outline" className="border-border hover:bg-accent/10 bg-transparent">
                  View Code
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <Panel title="Integration Examples" subtitle="Code samples and tutorials">
        <div className="space-y-3">
          {[
            { title: "Waste Submission Flow", lang: "JavaScript", desc: "Complete user submission process" },
            { title: "Validator Integration", lang: "Python", desc: "Build custom validation logic" },
            { title: "Reward Claiming", lang: "React", desc: "Frontend reward interface" },
            { title: "Webhook Handling", lang: "Node.js", desc: "Process platform events" },
          ].map((example, i) => (
            <div key={i} className="p-3 border border-border/50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-foreground">{example.title}</div>
                <div className="text-xs px-2 py-1 rounded bg-card/50 text-muted-foreground">{example.lang}</div>
              </div>
              <div className="text-sm text-muted-foreground mb-2">{example.desc}</div>
              <Button size="sm" variant="outline" className="border-border hover:bg-accent/10 bg-transparent">
                View Example
              </Button>
            </div>
          ))}
        </div>
      </Panel>
    </div>

    <Panel title="FAQ & Troubleshooting" subtitle="Common questions and solutions">
      <div className="space-y-3">
        {[
          {
            q: "How accurate is the AI waste classification?",
            a: "Our AI achieves 98.4% accuracy on common waste types like plastic, paper, and metal. Edge cases are reviewed by human validators.",
          },
          {
            q: "What happens if my waste submission is rejected?",
            a: "Rejected submissions don't incur penalties. You can resubmit with better photos or different angles for re-evaluation.",
          },
          {
            q: "How long does it take to receive sBTC rewards?",
            a: "Rewards are typically available within 24-48 hours after validation. Claim them anytime from your dashboard.",
          },
          {
            q: "Can I integrate SatsVerdant into my existing app?",
            a: "Yes! Use our REST API or SDKs to integrate waste submission and reward features into your application.",
          },
        ].map((faq, i) => (
          <div key={i} className="p-4 border border-border/50 rounded-lg">
            <div className="font-semibold text-foreground mb-2">{faq.q}</div>
            <div className="text-sm text-muted-foreground">{faq.a}</div>
          </div>
        ))}
      </div>
    </Panel>
  </div>
)

const SettingsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-muted-foreground">Manage your account preferences and security</p>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <Panel title="Account Information" subtitle="Personal details and preferences">
        <div className="space-y-4">
          <div className="grid gap-3">
            <div>
              <label className="text-sm font-medium text-foreground">Display Name</label>
              <div className="mt-1 p-2 border border-border/50 rounded-lg bg-card/50 text-foreground">
                EcoRecycler247
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <div className="mt-1 p-2 border border-border/50 rounded-lg bg-card/50 text-foreground">
                user@example.com
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Location</label>
              <div className="mt-1 p-2 border border-border/50 rounded-lg bg-card/50 text-foreground">
                Lagos, Nigeria
              </div>
            </div>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Update Profile</Button>
        </div>
      </Panel>

      <Panel title="Wallet & Security" subtitle="Connected wallets and security settings">
        <div className="space-y-4">
          <div className="p-3 border border-border/50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-foreground">Stacks Wallet</div>
                <div className="text-sm text-muted-foreground">SP2J6ZY...K8X9</div>
              </div>
              <div className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Connected</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">Two-Factor Authentication</span>
              <div className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400">Disabled</div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">Email Notifications</span>
              <div className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Enabled</div>
            </div>
          </div>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent">
            Security Settings
          </Button>
        </div>
      </Panel>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">
      <Panel title="Notification Preferences" subtitle="Control what updates you receive">
        <div className="space-y-3">
          {[
            { label: "Validation Complete", desc: "When your waste is verified", enabled: true },
            { label: "Reward Available", desc: "When sBTC rewards are ready", enabled: true },
            { label: "Governance Proposals", desc: "New voting opportunities", enabled: false },
            { label: "Platform Updates", desc: "Feature announcements", enabled: true },
            { label: "Weekly Summary", desc: "Your impact report", enabled: true },
          ].map((notif, i) => (
            <div key={i} className="flex justify-between items-center py-2">
              <div>
                <div className="font-medium text-foreground">{notif.label}</div>
                <div className="text-sm text-muted-foreground">{notif.desc}</div>
              </div>
              <div
                className={cn(
                  "text-xs px-2 py-1 rounded",
                  notif.enabled ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400",
                )}
              >
                {notif.enabled ? "On" : "Off"}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Data & Privacy" subtitle="Control your data and privacy settings">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">Share impact data publicly</span>
              <div className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Enabled</div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">Allow location tracking</span>
              <div className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Enabled</div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">Analytics & performance</span>
              <div className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Enabled</div>
            </div>
          </div>
          <div className="grid gap-2">
            <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent">
              Download My Data
            </Button>
            <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent">
              Delete Account
            </Button>
          </div>
        </div>
      </Panel>
    </div>

    <Panel title="App Preferences" subtitle="Customize your SatsVerdant experience">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground">Default Theme</label>
            <select className="mt-1 w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-ring">
              <option>Sats & Soil</option>
              <option>Topograph Carbon</option>
              <option>Proof-of-Recycle</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Language</label>
            <select className="mt-1 w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-ring">
              <option>English</option>
              <option>Spanish</option>
              <option>Portuguese</option>
              <option>French</option>
            </select>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-foreground">Currency Display</label>
            <select className="mt-1 w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-ring">
              <option>USD ($)</option>
              <option>BTC (₿)</option>
              <option>EUR (€)</option>
              <option>Local Currency</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Time Zone</label>
            <select className="mt-1 w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground focus:ring-2 focus:ring-ring">
              <option>UTC+1 (Lagos)</option>
              <option>UTC-5 (New York)</option>
              <option>UTC+0 (London)</option>
              <option>UTC+8 (Singapore)</option>
            </select>
          </div>
        </div>
      </div>
      <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">Save Preferences</Button>
    </Panel>
  </div>
)

const SatsVerdant: React.FC = () => {
  const [route, setRoute] = useState<RouteKey>("landing")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const navigate = (key: RouteKey) => {
    setRoute(key)
    setIsMenuOpen(false)
  }

  const goHome = () => {
    setRoute("landing")
  }

  const onEnterApp = () => {
    navigate("dashboard")
  }

  const currentTheme = "sats-soil" // Default theme

  useEffect(() => {
    // Apply theme on mount
    const theme = THEME_DEFS[currentTheme]
    if (theme) {
      for (const key in theme) {
        const val = theme[key as keyof typeof theme]
        document.documentElement.style.setProperty(key as string, String(val))
      }
    }
  }, [currentTheme])

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <TopoBackground />

      {/* Mobile Header */}
      <header className="sticky top-0 z-50 bg-panel/80 backdrop-blur-xl border-b border-border/50 sm:hidden">
        <div className="container relative flex items-center justify-between h-16">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="font-semibold text-lg text-foreground">SatsVerdant</div>
          <div></div>
          {/* Balance the layout */}
        </div>
      </header>

      {/* Main Content */}
      <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-background/95">
        {route === "landing" && (
          <div className="relative min-h-screen w-full">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('/background-recycling.jpg')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80" />

            <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center space-y-12">
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-6xl font-bold text-foreground text-balance">
                    Turn Waste into <span className="text-primary">Bitcoin</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                    SatsVerdant uses AI to verify your recycling efforts and rewards you with sBTC while healing the
                    planet
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-8"
                    onClick={onEnterApp}
                  >
                    Enter App <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-border hover:bg-accent/10 bg-transparent px-8">
                    View Documentation
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Kpi label="Waste Tokens Minted" value="2.4M" hint="All-time verified" />
                <Kpi label="sBTC Rewards Distributed" value="12.8 BTC" hint="To recyclers globally" />
                <Kpi label="CO₂ Offset Verified" value="45,200 t" hint="Carbon impact tracked" />
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Panel title="AI-Powered Classification" subtitle="Upload photos, get instant verification">
                  <div className="space-y-3">
                    <div className="h-32 rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center text-muted-foreground">
                      📸 Smart waste detection
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Tag>Plastic Detection</Tag>
                      <Tag>Weight Estimation</Tag>
                      <Tag>Quality Grading</Tag>
                    </div>
                  </div>
                </Panel>

                <Panel title="Bitcoin Rewards" subtitle="Earn sBTC for verified recycling">
                  <div className="space-y-4">
                    <div className="text-3xl font-bold text-primary">0.00024 BTC</div>
                    <div className="text-sm text-muted-foreground">Average reward per kg of verified plastic</div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Start Earning
                    </Button>
                  </div>
                </Panel>

                <Panel title="Validator Network" subtitle="Stake STX, validate submissions">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Active Validators</div>
                        <div className="font-semibold text-foreground">1,247</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Staked STX</div>
                        <div className="font-semibold text-foreground">2.1M</div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent">
                      Become Validator
                    </Button>
                  </div>
                </Panel>
              </div>

              {/* How it Works */}
              <Panel title="How SatsVerdant Works" subtitle="Simple steps to earn Bitcoin from recycling">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { step: "1", title: "Upload Waste", desc: "Take photos of your recyclable materials" },
                    { step: "2", title: "AI Verification", desc: "Our AI classifies and grades your submission" },
                    { step: "3", title: "Mint Tokens", desc: "Verified waste becomes blockchain tokens" },
                    { step: "4", title: "Earn sBTC", desc: "Claim your Bitcoin rewards instantly" },
                  ].map((item) => (
                    <div key={item.step} className="text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{item.title}</div>
                        <div className="text-sm text-muted-foreground text-pretty">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>
        )}
        {route !== "landing" && (
          <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={cn(
                "grid gap-6 lg:gap-8 py-8 lg:py-12 min-h-[calc(100vh-80px)]",
                isSidebarCollapsed
                  ? "md:grid-cols-[72px_1fr] lg:grid-cols-[80px_1fr]"
                  : "md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]",
              )}
            >
              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl animate-in fade-in-0 duration-300">
                  <div className="flex flex-col h-full max-w-sm mx-auto border-r border-border/20 bg-card/50">
                    <header className="shrink-0 border-b border-border/30 p-6 bg-gradient-to-r from-primary/5 to-accent/5">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xl text-foreground">SatsVerdant</div>
                        <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(false)} className="h-8 w-8 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </header>
                    <nav className="flex-1 overflow-y-auto p-6 space-y-3">
                      {NAV_ITEMS.map((item, index) => (
                        <Button
                          key={item.key}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start h-12 rounded-xl transition-all duration-200 hover:bg-accent/20 hover:scale-[1.02]",
                            route === item.key && "bg-primary/10 text-primary border border-primary/20",
                          )}
                          onClick={() => {
                            navigate(item.key)
                            setIsMenuOpen(false)
                          }}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="p-1.5 rounded-lg bg-accent/10">{item.icon}</div>
                            <span className="font-medium">{item.label}</span>
                          </div>
                        </Button>
                      ))}
                    </nav>
                    <footer className="shrink-0 border-t border-border/30 p-6 bg-gradient-to-r from-accent/5 to-primary/5">
                      <Button
                        variant="outline"
                        className="w-full h-12 rounded-xl bg-card/50 border-border/50 hover:bg-accent/10 transition-all duration-200"
                        onClick={() => {
                          navigate("settings")
                          setIsMenuOpen(false)
                        }}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </footer>
                  </div>
                </div>
              )}

              {/* Desktop Navigation */}
              <aside className="hidden md:block">
                <div className="sticky top-8">
                  <Panel
                    className="bg-card/60 backdrop-blur-sm border-border/50 shadow-lg shadow-black/5"
                    toolbar={
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="h-8 w-8"
                      >
                        {isSidebarCollapsed ? (
                          <ChevronRight className="w-4 h-4" />
                        ) : (
                          <ChevronLeft className="w-4 h-4" />
                        )}
                      </Button>
                    }
                  >
                    <div className={cn(isSidebarCollapsed ? "p-3" : "p-6")}>
                      <div className="mb-6">
                        <h2 className="font-bold text-lg text-foreground mb-1">Navigation</h2>
                        <p className="text-sm text-muted-foreground">Manage your waste, earn rewards</p>
                      </div>
                      <nav className="space-y-2">
                        {NAV_ITEMS.map((item, index) => (
                          <Button
                            key={item.key}
                            variant="ghost"
                            className={cn(
                              "w-full justify-start h-10 rounded-lg transition-all duration-200 hover:bg-accent/20",
                              route === item.key && "bg-primary/10 text-primary border border-primary/20",
                            )}
                            onClick={() => navigate(item.key)}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={cn(
                                  "p-1.5 rounded-md transition-colors",
                                  route === item.key ? "bg-primary/20" : "bg-accent/10",
                                )}
                              >
                                {item.icon}
                              </div>
                              {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
                            </div>
                          </Button>
                        ))}
                      </nav>
                    </div>
                  </Panel>
                </div>
              </aside>

              {/* Main Content Area */}
              <main className="min-h-0">
                <div className="h-full">
                  {route === "landing" ? (
                    <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                      <LandingPage onEnterApp={() => navigate("dashboard")} />
                    </div>
                  ) : (
                    <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
                      {route === "dashboard" && <DashboardPage onGoHome={goHome} />}
                      {route === "waste" && <WasteSubmissionPage />}
                      {route === "rewards" && <RewardsPage />}
                      {route === "validator" && <ValidatorPage />}
                      {route === "governance" && <GovernancePage />}
                      {route === "esg" && <ESGPage />}
                      {route === "market" && <MarketplacePage />}
                      {route === "guide" && <GuidePage />}
                      {route === "settings" && <SettingsPage />}
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SatsVerdant
