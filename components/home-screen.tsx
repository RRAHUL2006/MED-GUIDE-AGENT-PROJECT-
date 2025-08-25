"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Stethoscope,
  Video,
  Phone,
  Calendar,
  Search,
  AlertTriangle,
  HelpCircle,
  Shield,
  Heart,
  MessageSquare,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Medical3DScene } from "./medical-3d-scene"

export function HomeScreen() {
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  const getLanguageClass = () => {
    switch (language) {
      case "tamil":
        return "tamil-text"
      case "hindi":
        return "hindi-text"
      default:
        return ""
    }
  }

  const primaryActions = [
    {
      title: t.checkSymptoms,
      description: t.checkSymptomsDesc,
      icon: Stethoscope,
      color: "bg-accent hover:bg-accent/90",
      href: "/symptoms",
    },
    {
      title: t.watchVideos,
      description: t.watchVideosDesc,
      icon: Video,
      color: "bg-primary hover:bg-primary/90",
      href: "/videos",
    },
    {
      title: t.callAgent,
      description: t.callAgentDesc,
      icon: Phone,
      color: "bg-chart-1 hover:bg-chart-1/90",
      href: "/agent",
    },
    {
      title: t.bookAppointment,
      description: t.bookAppointmentDesc,
      icon: Calendar,
      color: "bg-chart-2 hover:bg-chart-2/90",
      href: "/appointments",
    },
  ]

  const quickLinks = [
    { title: "AI Chat", icon: MessageSquare, href: "/chatbot" },
    { title: t.emergencyHelp, icon: AlertTriangle, href: "/emergency" },
    { title: t.faqs, icon: HelpCircle, href: "/faq" },
    { title: t.privacyPolicy, icon: Shield, href: "/privacy" },
  ]

  return (
    <div className={`min-h-screen bg-background relative overflow-hidden ${getLanguageClass()}`}>
      <Medical3DScene />

      {/* Top Section */}
      <div className="bg-card/90 backdrop-blur-sm border-b border-border relative z-10">
        <div className="max-w-md mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30">
                <Heart className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="text-align-center-balanced">
                <h1 className="text-2xl font-bold text-foreground drop-shadow-sm">{t.appName}</h1>
                <p className="text-sm text-muted-foreground">{t.tagline}</p>
              </div>
            </div>

            <div className="w-full max-w-xs mx-auto">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full bg-background/80 backdrop-blur-sm">
                  <SelectValue placeholder={t.selectLanguage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="tamil" className="tamil-text">
                    தமிழ் (Tamil)
                  </SelectItem>
                  <SelectItem value="hindi" className="hindi-text">
                    हिंदी (Hindi)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Primary Actions */}
      <div className="max-w-md mx-auto px-6 py-8 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          {primaryActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card
                key={index}
                className="p-0 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Button
                  className={`w-full h-32 flex flex-col items-center justify-center gap-3 text-white ${action.color} rounded-lg backdrop-blur-sm`}
                  onClick={() => {
                    router.push(action.href)
                  }}
                >
                  <Icon className="w-8 h-8 drop-shadow-lg" />
                  <div className="text-center text-align-center-balanced px-2">
                    <div className="font-semibold text-sm drop-shadow-sm leading-tight">{action.title}</div>
                    <div className="text-xs opacity-90 mt-1 leading-relaxed">{action.description}</div>
                  </div>
                </Button>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-md mx-auto px-6 pb-8 relative z-10">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              className="pl-10 h-12 bg-muted/80 backdrop-blur-sm border-border shadow-sm text-align-start"
            />
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground text-align-start">{t.quickAccess}</h3>
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-xs bg-background/80 backdrop-blur-sm hover:bg-accent/10 transition-all duration-200 shadow-sm hover:shadow-md"
                    onClick={() => {
                      if (link.href === "/chatbot") {
                        router.push(link.href)
                      } else {
                        console.log(`Navigate to ${link.href}`)
                      }
                    }}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="leading-tight">{link.title}</span>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
