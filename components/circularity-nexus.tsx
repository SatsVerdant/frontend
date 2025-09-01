"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

/*********************************
 * THEME TOKENS (Enhanced with semantic design tokens)
 *********************************/
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
 *********************************/
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
    <CardContent className="p-5">
      <div className="text-muted-foreground text-xs uppercase tracking-wider font-medium">{label}</div>
      <div className="text-3xl font-bold text-foreground mt-1 text-balance">{value}</div>
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
 *********************************/
type RouteKey =
  | "home"
  | "dashboard"
  | "waste"
  | "rewards"
  | "validator"
  | "governance"
  | "esg"
  | "market"
  | "guide"
  | "settings"

const NAV_ITEMS: { key: RouteKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "dashboard", label: "Recycler Dashboard" },
  { key: "waste", label: "Waste Submission" },
  { key: "rewards", label: "Rewards" },
  { key: "validator", label: "Validator Hub" },
  { key: "governance", label: "Governance" },
  { key: "esg", label: "ESG Dashboard" },
  { key: "market", label: "Marketplace" },
  { key: "guide", label: "Implementation Guide" },
  { key: "settings", label: "Settings" },
]

/*********************************
 * PAGE FRAGMENTS
 *********************************/
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

const HeroCard = () => (
  <Panel
    title="Circularity Nexus"
    subtitle="Turn Trash into Bitcoin while Healing the Planet"
    toolbar={
      <div className="flex gap-2">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">Connect Wallet</Button>
        <Button variant="outline" className="border-border hover:bg-accent/10 bg-transparent">
          View Docs
        </Button>
      </div>
    }
  >
    <div className="grid md:grid-cols-3 gap-6 mb-6">
      <Kpi label="Waste Tokens Minted" value="123,400" hint="All-time" />
      <Kpi label="sBTC Rewards" value="0.52 BTC" hint="Distributed" />
      <Kpi label="CO₂ Offset" value="1,204 t" hint="Verified" />
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      <Panel title="AI Classification" subtitle="Upload → Classify → Mint" className="md:col-span-2">
        <div className="h-32 rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer">
          Drop waste photo or click to upload
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Tag>plastic · 2.4kg</Tag>
          <Tag>paper · 1.1kg</Tag>
          <Tag>metal · 0.6kg</Tag>
        </div>
      </Panel>
      <Panel title="Fast Actions">
        <div className="grid gap-3">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Mint Verified Waste</Button>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent">
            Claim sBTC Rewards
          </Button>
          <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent">
            Stake as Validator
          </Button>
        </div>
      </Panel>
    </div>
  </Panel>
)

const DashboardPage = () => (
  <div className="grid xl:grid-cols-3 gap-6">
    <Panel title="Impact Overview" subtitle="Your last 30 days" className="xl:col-span-2">
      <div className="h-48 rounded-lg border border-dashed border-border/50 grid place-items-center text-muted-foreground mb-4">
        Chart: Waste distribution over time
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <Kpi label="Tokens Minted" value="4,210" />
        <Kpi label="Rewards Earned" value="0.006 BTC" />
        <Kpi label="CO₂ Offset" value="3.2 t" />
      </div>
    </Panel>
    <Panel title="Recent Activity" subtitle="Transactions & events">
      <div className="space-y-3 text-sm">
        <div className="py-3 border-b border-border/50 text-foreground">Minted 2.4kg plastic → 240 tokens</div>
        <div className="py-3 border-b border-border/50 text-foreground">Claimed 0.0002 BTC</div>
        <div className="py-3 text-foreground">Staked 500 STX as validator</div>
      </div>
    </Panel>
    <Panel title="Badges" subtitle="Gamified milestones" className="xl:col-span-3">
      <div className="flex flex-wrap gap-2">
        <Tag>Plastic Pioneer</Tag>
        <Tag>Carbon Saver</Tag>
        <Tag>Local Hero</Tag>
        <Tag>Validator Rookie</Tag>
      </div>
    </Panel>
  </div>
)

// Additional page components would follow similar patterns...
const WasteSubmissionPage = () => (
  <div className="grid lg:grid-cols-3 gap-6">
    <Panel title="Upload & Classify" subtitle="AI assisted">
      <div className="h-64 rounded-lg border-2 border-dashed border-border/50 grid place-items-center text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer mb-4">
        Upload box
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Waste Type", value: "Plastic (PET)" },
          { label: "Estimated Weight", value: "2.4 kg" },
          { label: "Quality Grade", value: "A-" },
          { label: "Location", value: "Lagos, NG" },
        ].map((item, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-3">
              <div className="text-xs text-muted-foreground">{item.label}</div>
              <div className="font-semibold text-foreground">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-2">
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Mint Waste Tokens</Button>
        <Button variant="outline" className="border-border hover:bg-accent/10 bg-transparent">
          Save Draft
        </Button>
      </div>
    </Panel>
    <Panel title="Carbon Impact" subtitle="Deterministic clarity">
      <div className="h-64 rounded-lg border border-dashed border-border/50 grid place-items-center text-muted-foreground mb-3">
        Chart: CO₂ impact
      </div>
      <div className="text-sm text-muted-foreground">500g CO₂ per kg plastic · Configurable via contract</div>
    </Panel>
    <Panel title="sBTC Reward Estimate" subtitle="Based on grading & tokens">
      <div className="text-3xl font-bold text-foreground mb-2">~ 0.00012 BTC</div>
      <div className="text-sm text-muted-foreground mb-4">Estimated. Final amount on-chain at claim.</div>
      <Button variant="outline" className="w-full border-border hover:bg-accent/10 bg-transparent">
        Claim Preview
      </Button>
    </Panel>
  </div>
)

/*********************************
 * APP SHELL
 *********************************/
const CircularityNexus: React.FC = () => {
  const [route, setRoute] = useState<RouteKey>("home")
  const [theme, setTheme] = useState<string>("sats-soil")

  useEffect(() => {
    const style = document.documentElement.style
    const def = THEME_DEFS[theme]
    Object.entries(def).forEach(([k, v]) => style.setProperty(k, String(v)))
    document.body.style.backgroundColor = "var(--theme-bg)"
  }, [theme])

  return (
    <div className="relative min-h-screen text-foreground" style={{ backgroundColor: "var(--theme-bg)" }}>
      <TopoBackground />

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/60 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary shadow-md" />
            <div>
              <div className="font-bold text-lg text-foreground">Circularity Nexus</div>
              <div className="text-xs text-muted-foreground">Stacks • sBTC • ESG</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select
              className="px-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground focus:ring-2 focus:ring-ring"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="sats-soil">Theme: Sats & Soil</option>
              <option value="topograph-carbon">Theme: Topograph Carbon</option>
              <option value="proof-of-recycle">Theme: Proof-of-Recycle</option>
            </select>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">Connect Wallet</Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="md:sticky md:top-[88px] h-max">
          <nav className="grid gap-2 mb-6">
            {NAV_ITEMS.map((n) => (
              <Button
                key={n.key}
                variant={route === n.key ? "default" : "ghost"}
                className={cn(
                  "justify-start text-left",
                  route === n.key
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground hover:bg-accent/10",
                )}
                onClick={() => setRoute(n.key)}
              >
                {n.label}
              </Button>
            ))}
          </nav>

          <Card className="border-border/50 bg-card/80" style={{ backgroundImage: "var(--theme-card)" }}>
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground font-medium mb-2">Wireframe Map</div>
              <ul className="text-sm space-y-1 text-foreground/80">
                <li>• Landing overview</li>
                <li>• Recycler KPIs</li>
                <li>• AI classification → Mint</li>
                <li>• sBTC Rewards</li>
                <li>• Validator queue & staking</li>
                <li>• Governance voting</li>
                <li>• ESG reporting & certificates</li>
                <li>• Carbon marketplace</li>
                <li>• Settings & security</li>
                <li>• Implementation guide</li>
              </ul>
            </CardContent>
          </Card>
        </aside>

        {/* Content */}
        <section className="space-y-8">
          {route === "home" && <HeroCard />}
          {route === "dashboard" && <DashboardPage />}
          {route === "waste" && <WasteSubmissionPage />}
          {route === "rewards" && (
            <Panel title="Rewards" subtitle="Your Bitcoin earnings">
              <div className="text-center py-12 text-muted-foreground">Rewards page coming soon...</div>
            </Panel>
          )}
          {route === "validator" && (
            <Panel title="Validator Hub" subtitle="Stake and validate">
              <div className="text-center py-12 text-muted-foreground">Validator hub coming soon...</div>
            </Panel>
          )}
          {route === "governance" && (
            <Panel title="Governance" subtitle="Vote on proposals">
              <div className="text-center py-12 text-muted-foreground">Governance page coming soon...</div>
            </Panel>
          )}
          {route === "esg" && (
            <Panel title="ESG Dashboard" subtitle="Environmental impact">
              <div className="text-center py-12 text-muted-foreground">ESG dashboard coming soon...</div>
            </Panel>
          )}
          {route === "market" && (
            <Panel title="Marketplace" subtitle="Trade carbon credits">
              <div className="text-center py-12 text-muted-foreground">Marketplace coming soon...</div>
            </Panel>
          )}
          {route === "guide" && (
            <Panel title="Implementation Guide" subtitle="Step-by-step development">
              <div className="text-center py-12 text-muted-foreground">Implementation guide coming soon...</div>
            </Panel>
          )}
          {route === "settings" && (
            <Panel title="Settings" subtitle="Account preferences">
              <div className="text-center py-12 text-muted-foreground">Settings page coming soon...</div>
            </Panel>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Circularity Nexus — Designed for Stacks • Non-generic themes: Sats & Soil ·
        Topograph Carbon · Proof-of-Recycle
      </footer>
    </div>
  )
}

export default CircularityNexus
