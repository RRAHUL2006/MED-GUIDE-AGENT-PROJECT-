"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Bot, User, Mic, MicOff, MoreVertical } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  category?: string
}

interface QuickReply {
  id: string
  text: string
  category: string
}

const quickReplies: QuickReply[] = [
  { id: "1", text: "I have a headache", category: "pain" },
  { id: "2", text: "Feeling nauseous", category: "digestive" },
  { id: "3", text: "Chest pain", category: "emergency" },
  { id: "4", text: "Fever symptoms", category: "infection" },
  { id: "5", text: "Skin rash", category: "dermatology" },
  { id: "6", text: "Difficulty breathing", category: "respiratory" },
]

const medicalResponses: Record<string, string[]> = {
  headache: [
    "I understand you're experiencing a headache. Can you describe the type of pain - is it throbbing, sharp, or dull?",
    "For mild headaches, try resting in a dark, quiet room and staying hydrated. If pain persists or worsens, please consult a healthcare provider.",
    "Headaches can have various causes including stress, dehydration, or tension. Have you noticed any triggers?",
  ],
  fever: [
    "Fever can be a sign your body is fighting an infection. What's your current temperature?",
    "For fever management, stay hydrated, rest, and consider paracetamol if needed. Monitor your temperature regularly.",
    "If fever exceeds 103°F (39.4°C) or persists for more than 3 days, seek immediate medical attention.",
  ],
  nausea: [
    "Nausea can be uncomfortable. Are you experiencing any other symptoms like vomiting or stomach pain?",
    "Try sipping clear fluids, eating bland foods like crackers, and avoiding strong odors. Ginger can also help.",
    "If nausea persists with severe symptoms, it's important to consult a healthcare provider.",
  ],
  chest: [
    "⚠️ Chest pain requires immediate attention. If you're experiencing severe chest pain, difficulty breathing, or pain radiating to your arm or jaw, please call emergency services immediately.",
    "For mild chest discomfort, try to remain calm and avoid physical exertion. Monitor your symptoms closely.",
    "Chest pain can have various causes. Please seek medical evaluation to determine the underlying cause.",
  ],
  breathing: [
    "⚠️ Difficulty breathing is a serious symptom. If you're having severe trouble breathing, please seek emergency medical care immediately.",
    "Try to stay calm and sit upright. Avoid any known triggers if you have asthma or allergies.",
    "Breathing difficulties should always be evaluated by a healthcare professional.",
  ],
  skin: [
    "Skin rashes can have many causes. Can you describe the appearance - is it red, itchy, raised, or flat?",
    "Avoid scratching the area and keep it clean and dry. Cool compresses may provide relief.",
    "If the rash spreads rapidly, is accompanied by fever, or doesn't improve, please consult a dermatologist.",
  ],
  general: [
    "I'm here to help with your health concerns. Can you tell me more about your symptoms?",
    "Based on your symptoms, I can provide general guidance, but please remember that this doesn't replace professional medical advice.",
    "How long have you been experiencing these symptoms? Any other details that might be relevant?",
  ],
}

export function AIChatbot() {
  const router = useRouter()
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AI Health Assistant. I can help you understand your symptoms and provide general health guidance. How are you feeling today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("headache") || message.includes("head pain")) {
      return medicalResponses.headache[Math.floor(Math.random() * medicalResponses.headache.length)]
    } else if (message.includes("fever") || message.includes("temperature")) {
      return medicalResponses.fever[Math.floor(Math.random() * medicalResponses.fever.length)]
    } else if (message.includes("nausea") || message.includes("sick") || message.includes("stomach")) {
      return medicalResponses.nausea[Math.floor(Math.random() * medicalResponses.nausea.length)]
    } else if (message.includes("chest") || message.includes("heart")) {
      return medicalResponses.chest[Math.floor(Math.random() * medicalResponses.chest.length)]
    } else if (message.includes("breath") || message.includes("breathing")) {
      return medicalResponses.breathing[Math.floor(Math.random() * medicalResponses.breathing.length)]
    } else if (message.includes("rash") || message.includes("skin") || message.includes("itch")) {
      return medicalResponses.skin[Math.floor(Math.random() * medicalResponses.skin.length)]
    } else {
      return medicalResponses.general[Math.floor(Math.random() * medicalResponses.general.length)]
    }
  }

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim()
    if (!text) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: getAIResponse(text),
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    )
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    // In a real app, this would integrate with speech recognition
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false)
        setInputMessage("I have been feeling dizzy lately")
      }, 3000)
    }
  }

  const handleQuickReply = (reply: QuickReply) => {
    handleSendMessage(reply.text)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-md mx-auto w-full flex flex-col h-screen">
        {/* Header */}
        <div className="bg-card border-b border-border px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold">AI Health Assistant</h1>
                  <p className="text-xs text-muted-foreground">Online • Multilingual</p>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === "user" ? "bg-primary" : "bg-accent"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Bot className="w-4 h-4 text-accent-foreground" />
                  )}
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2 max-w-[80%]">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </div>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 flex-shrink-0">
            <p className="text-xs text-muted-foreground mb-2">Quick replies:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.slice(0, 4).map((reply) => (
                <Button
                  key={reply.id}
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 bg-transparent"
                  onClick={() => handleQuickReply(reply)}
                >
                  {reply.text}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border px-4 py-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your health question..."
                className="pr-12"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
              />
              <Button
                variant="ghost"
                size="sm"
                className={`absolute right-1 top-1/2 transform -translate-y-1/2 p-2 ${
                  isListening ? "text-destructive" : "text-muted-foreground"
                }`}
                onClick={handleVoiceInput}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            </div>
            <Button onClick={() => handleSendMessage()} disabled={!inputMessage.trim() || isTyping} className="px-4">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This AI provides general guidance only. Always consult healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}
