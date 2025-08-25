"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Phone,
  PhoneCall,
  Clock,
  Pill,
  AlertTriangle,
  MessageSquare,
  Star,
  Mic,
  MicOff,
  Bot,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Medical3DScene } from "./medical-3d-scene"

interface RecentQuery {
  id: string
  question: string
  date: string
  category: string
}

interface SuggestedMedication {
  id: string
  name: string
  condition: string
  dosage: string
  warning: string
}

const recentQueries: RecentQuery[] = [
  {
    id: "1",
    question: "Last time you asked about acidity",
    date: "2 days ago",
    category: "Digestive",
  },
  {
    id: "2",
    question: "Headache relief options",
    date: "1 week ago",
    category: "Pain",
  },
  {
    id: "3",
    question: "Cold and cough symptoms",
    date: "2 weeks ago",
    category: "Respiratory",
  },
]

const suggestedMedications: SuggestedMedication[] = [
  {
    id: "1",
    name: "Paracetamol",
    condition: "Fever & Pain",
    dosage: "500mg every 6 hours",
    warning: "Max 4 doses per day",
  },
  {
    id: "2",
    name: "Antacid",
    condition: "Acidity & Heartburn",
    dosage: "1-2 tablets after meals",
    warning: "Consult doctor if symptoms persist",
  },
  {
    id: "3",
    name: "ORS",
    condition: "Dehydration",
    dosage: "1 sachet in 200ml water",
    warning: "Drink slowly over 15 minutes",
  },
]

export function CallAgent() {
  const router = useRouter()
  const { t } = useLanguage()
  const [isCallActive, setIsCallActive] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)

  const handleStartCall = () => {
    setIsCallActive(true)
    // Simulate call timer
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    // Auto end call after demo
    setTimeout(() => {
      clearInterval(timer)
      setIsCallActive(false)
      setCallDuration(0)
    }, 10000)
  }

  const handleEndCall = () => {
    setIsCallActive(false)
    setCallDuration(0)
  }

  const handleRequestCallback = () => {
    console.log("Callback requested")
    // In a real app, this would schedule a callback
  }

  const handleEmergencyContact = () => {
    console.log("Emergency contact initiated")
    // In a real app, this would connect to emergency services
  }

  const handleSubmitFeedback = () => {
    console.log("Feedback submitted:", feedbackText)
    setFeedbackText("")
    setShowFeedback(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Active Call Interface
  if (isCallActive) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Medical3DScene />
        <div className="max-w-md mx-auto relative z-10">
          {/* Header */}
          <div className="bg-card/90 backdrop-blur-sm border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold">Health Agent Call</h1>
            </div>
          </div>

          <div className="px-6 py-8 space-y-8">
            {/* Call Status */}
            <div className="text-center space-y-4">
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-12 h-12 text-accent-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Connected to Health Agent</h2>
                <p className="text-muted-foreground">AI Assistant</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-lg font-mono">
                <Clock className="w-4 h-4" />
                {formatTime(callDuration)}
              </div>
            </div>

            {/* Call Controls */}
            <div className="flex justify-center gap-4">
              <Button
                variant={isMuted ? "default" : "outline"}
                size="lg"
                className="rounded-full w-16 h-16"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>
              <Button variant="destructive" size="lg" className="rounded-full w-16 h-16" onClick={handleEndCall}>
                <PhoneCall className="w-6 h-6" />
              </Button>
            </div>

            {/* Call Info */}
            <Card className="p-4">
              <h3 className="font-medium text-foreground mb-2">During this call:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Describe your symptoms clearly</li>
                <li>• Ask about medication guidance</li>
                <li>• Request appointment scheduling</li>
                <li>• Get emergency assistance if needed</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Medical3DScene />
      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="bg-card/90 backdrop-blur-sm border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">{t.healthAgent}</h1>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Top Section - AI Chat and Call Options */}
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-foreground drop-shadow-sm">{t.talkToHealthAgent}</h2>
            <p className="text-muted-foreground">{t.getInstantGuidance}</p>

            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                className="w-32 h-32 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/30 transform hover:scale-105 transition-all duration-300"
                onClick={() => router.push("/chatbot")}
              >
                <div className="flex flex-col items-center gap-2">
                  <Bot className="w-8 h-8 drop-shadow-lg" />
                  <span className="text-sm font-medium drop-shadow-sm">AI Chat</span>
                </div>
              </Button>

              <Button
                size="lg"
                className="w-32 h-32 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 transform hover:scale-105 transition-all duration-300"
                onClick={handleStartCall}
              >
                <div className="flex flex-col items-center gap-2">
                  <Phone className="w-8 h-8 drop-shadow-lg" />
                  <span className="text-sm font-medium drop-shadow-sm">{t.callNow}</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Middle Section - Recent Queries */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">{t.recentConversations}</h3>
            {recentQueries.map((query) => (
              <Card
                key={query.id}
                className="p-3 cursor-pointer hover:bg-muted/50 transition-all duration-200 shadow-md hover:shadow-lg bg-card/90 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{query.question}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {query.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{query.date}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Suggested Medications */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">{t.commonMedications}</h3>
            <p className="text-xs text-muted-foreground">{t.medicationWarning}</p>
            {suggestedMedications.map((med) => (
              <Card key={med.id} className="p-3 shadow-md bg-card/90 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-chart-1 rounded-full flex items-center justify-center flex-shrink-0">
                    <Pill className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm text-foreground">{med.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {med.condition}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{med.dosage}</p>
                    <p className="text-xs text-destructive">{med.warning}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom Section - Additional Options */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">{t.moreOptions}</h3>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto p-4 bg-background/80 backdrop-blur-sm hover:bg-muted/50 transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={handleRequestCallback}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <PhoneCall className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{t.requestCallback}</div>
                    <div className="text-xs text-muted-foreground">{t.callbackDesc}</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 bg-background/80 backdrop-blur-sm border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={handleEmergencyContact}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-destructive-foreground" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{t.emergencyContact}</div>
                    <div className="text-xs opacity-70">{t.emergencyDesc}</div>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="justify-start h-auto p-4 bg-background/80 backdrop-blur-sm hover:bg-muted/50 transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => setShowFeedback(!showFeedback)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-chart-4 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{t.giveFeedback}</div>
                    <div className="text-xs text-muted-foreground">{t.feedbackDesc}</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Feedback Form */}
          {showFeedback && (
            <Card className="p-4 shadow-lg bg-card/90 backdrop-blur-sm">
              <h4 className="font-medium text-foreground mb-3">{t.shareFeedback}</h4>
              <div className="space-y-3">
                <Textarea
                  placeholder={t.feedbackPlaceholder}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="min-h-20"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSubmitFeedback} disabled={!feedbackText.trim()}>
                    {t.submitFeedback}
                  </Button>
                  <Button variant="outline" onClick={() => setShowFeedback(false)}>
                    {t.cancel}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
