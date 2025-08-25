"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Mic,
  Thermometer,
  CigaretteIcon as Cough,
  Brain,
  SkullIcon as Skin,
  StickerIcon as Stomach,
  Heart,
  Eye,
  Ear,
  Bone,
  TreesIcon as Lungs,
  MapPin,
  Clock,
  Star,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { Medical3DScene } from "./medical-3d-scene"

interface Symptom {
  id: string
  name: string
  icon: any
  category: string
}

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  distance: string
  availability: string
}

interface MedicalGuidance {
  severity: "low" | "moderate" | "high" | "emergency"
  primarySpecialty: string
  condition: string
  description: string
  immediateActions: string[]
  whenToSeekCare: string
  redFlags: string[]
  homeRemedies?: string[]
}

const commonSymptoms: Symptom[] = [
  { id: "fever", name: "Fever", icon: Thermometer, category: "General Medicine" },
  { id: "cough", name: "Cough", icon: Cough, category: "Pulmonology" },
  { id: "headache", name: "Headache", icon: Brain, category: "Neurology" },
  { id: "skin-rash", name: "Skin Rash", icon: Skin, category: "Dermatology" },
  { id: "stomach-pain", name: "Stomach Pain", icon: Stomach, category: "Gastroenterology" },
  { id: "chest-pain", name: "Chest Pain", icon: Heart, category: "Cardiology" },
  { id: "eye-irritation", name: "Eye Irritation", icon: Eye, category: "Ophthalmology" },
  { id: "ear-pain", name: "Ear Pain", icon: Ear, category: "ENT" },
  { id: "joint-pain", name: "Joint Pain", icon: Bone, category: "Orthopedics" },
  { id: "breathing-difficulty", name: "Breathing Issues", icon: Lungs, category: "Pulmonology" },
]

const medicalGuidanceDatabase: Record<string, MedicalGuidance> = {
  fever: {
    severity: "moderate",
    primarySpecialty: "General Medicine",
    condition: "Fever (Pyrexia)",
    description:
      "Fever is your body's natural response to infection or illness. A temperature above 100.4°F (38°C) is considered fever.",
    immediateActions: [
      "Rest and stay hydrated with plenty of fluids",
      "Take acetaminophen or ibuprofen as directed",
      "Use cool compresses on forehead and wrists",
      "Wear light, breathable clothing",
    ],
    whenToSeekCare:
      "Seek medical care if fever persists for more than 3 days, reaches 103°F (39.4°C), or is accompanied by severe symptoms.",
    redFlags: [
      "Temperature above 103°F (39.4°C)",
      "Difficulty breathing or chest pain",
      "Severe headache with neck stiffness",
      "Persistent vomiting or dehydration",
      "Confusion or altered mental state",
    ],
    homeRemedies: [
      "Drink warm herbal teas (ginger, chamomile)",
      "Take lukewarm baths to reduce body temperature",
      "Eat light, easily digestible foods",
    ],
  },
  "chest-pain": {
    severity: "emergency",
    primarySpecialty: "Cardiology",
    condition: "Chest Pain",
    description:
      "Chest pain can range from minor muscle strain to serious heart conditions. Any chest pain should be evaluated promptly.",
    immediateActions: [
      "Stop all physical activity immediately",
      "Sit down and rest in a comfortable position",
      "If you have prescribed nitroglycerin, take as directed",
      "Call emergency services if pain is severe or persistent",
    ],
    whenToSeekCare:
      "Seek immediate emergency care for any chest pain, especially if accompanied by other cardiac symptoms.",
    redFlags: [
      "Crushing or squeezing chest pain",
      "Pain radiating to arm, jaw, or back",
      "Shortness of breath or difficulty breathing",
      "Nausea, vomiting, or cold sweats",
      "Dizziness or fainting",
    ],
  },
  "breathing-difficulty": {
    severity: "high",
    primarySpecialty: "Pulmonology",
    condition: "Dyspnea (Breathing Difficulty)",
    description:
      "Difficulty breathing can indicate various conditions from asthma to more serious respiratory or cardiac issues.",
    immediateActions: [
      "Sit upright in a comfortable position",
      "Loosen tight clothing around neck and chest",
      "Use prescribed inhaler if you have asthma",
      "Try slow, deep breathing exercises",
    ],
    whenToSeekCare: "Seek immediate care for sudden or severe breathing difficulty, or if symptoms worsen rapidly.",
    redFlags: [
      "Severe shortness of breath at rest",
      "Blue lips or fingernails (cyanosis)",
      "Chest pain with breathing difficulty",
      "High fever with breathing problems",
      "Inability to speak in full sentences",
    ],
  },
  headache: {
    severity: "moderate",
    primarySpecialty: "Neurology",
    condition: "Headache",
    description:
      "Headaches can be tension-type, migraine, or secondary to other conditions. Most are benign but some require medical attention.",
    immediateActions: [
      "Rest in a quiet, dark room",
      "Apply cold or warm compress to head/neck",
      "Stay hydrated and avoid dehydration",
      "Take over-the-counter pain relievers as directed",
    ],
    whenToSeekCare:
      "Seek care for sudden severe headaches, headaches with fever, or significant change in headache pattern.",
    redFlags: [
      'Sudden, severe "thunderclap" headache',
      "Headache with fever and neck stiffness",
      "Headache with vision changes or weakness",
      "Headache after head injury",
      "Progressively worsening headaches",
    ],
    homeRemedies: [
      "Practice relaxation techniques and stress management",
      "Maintain regular sleep schedule",
      "Stay hydrated throughout the day",
    ],
  },
  "stomach-pain": {
    severity: "moderate",
    primarySpecialty: "Gastroenterology",
    condition: "Abdominal Pain",
    description:
      "Stomach pain can result from various causes including indigestion, gastritis, or more serious conditions requiring medical evaluation.",
    immediateActions: [
      "Avoid solid foods temporarily",
      "Sip clear fluids like water or herbal tea",
      "Apply gentle heat to the abdomen",
      "Rest in a comfortable position",
    ],
    whenToSeekCare:
      "Seek care for severe, persistent, or worsening abdominal pain, especially with other concerning symptoms.",
    redFlags: [
      "Severe, constant abdominal pain",
      "Pain with vomiting blood or black stools",
      "Abdominal pain with high fever",
      "Pain with signs of dehydration",
      "Rigid, board-like abdomen",
    ],
    homeRemedies: [
      "Try ginger tea for nausea",
      "Eat bland foods when ready (BRAT diet)",
      "Avoid spicy, fatty, or acidic foods",
    ],
  },
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    rating: 4.8,
    distance: "0.5 km",
    availability: "Available today",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Pulmonology",
    rating: 4.9,
    distance: "1.2 km",
    availability: "Tomorrow 10 AM",
  },
  {
    id: "3",
    name: "Dr. Priya Sharma",
    specialty: "Dermatology",
    rating: 4.7,
    distance: "0.8 km",
    availability: "Available now",
  },
]

export function SymptomChecker() {
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [customSymptom, setCustomSymptom] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [medicalGuidance, setMedicalGuidance] = useState<MedicalGuidance | null>(null)

  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId],
    )
  }

  const handleGetGuidance = () => {
    if (selectedSymptoms.length === 0 && !customSymptom) return

    // Analyze symptoms and provide detailed guidance
    let guidance: MedicalGuidance

    // Check for emergency symptoms first
    if (selectedSymptoms.includes("chest-pain") || selectedSymptoms.includes("breathing-difficulty")) {
      guidance = medicalGuidanceDatabase["chest-pain"] || medicalGuidanceDatabase["breathing-difficulty"]
    }
    // Check for high-priority symptoms
    else if (selectedSymptoms.includes("fever") && selectedSymptoms.includes("headache")) {
      guidance = {
        severity: "high",
        primarySpecialty: "General Medicine",
        condition: "Fever with Headache",
        description:
          "The combination of fever and headache may indicate various conditions from viral infections to more serious illnesses.",
        immediateActions: [
          "Monitor temperature regularly",
          "Stay hydrated with plenty of fluids",
          "Rest in a quiet, dark room",
          "Take acetaminophen for fever and pain relief",
        ],
        whenToSeekCare:
          "Seek immediate care if fever exceeds 102°F with severe headache, or if neck stiffness develops.",
        redFlags: [
          "High fever (>102°F) with severe headache",
          "Neck stiffness or sensitivity to light",
          "Persistent vomiting",
          "Confusion or altered consciousness",
          "Skin rash with fever and headache",
        ],
        homeRemedies: ["Apply cool compresses to forehead", "Drink warm herbal teas", "Ensure adequate rest and sleep"],
      }
    }
    // Single symptom analysis
    else if (selectedSymptoms.length > 0) {
      const primarySymptom = selectedSymptoms[0]
      guidance = medicalGuidanceDatabase[primarySymptom] || {
        severity: "moderate",
        primarySpecialty: "General Medicine",
        condition: "General Symptoms",
        description:
          "Your symptoms require medical evaluation to determine the underlying cause and appropriate treatment.",
        immediateActions: [
          "Monitor your symptoms closely",
          "Rest and stay hydrated",
          "Avoid strenuous activities",
          "Keep a symptom diary",
        ],
        whenToSeekCare: "Schedule an appointment with your healthcare provider for proper evaluation.",
        redFlags: [
          "Worsening or persistent symptoms",
          "Development of new concerning symptoms",
          "Inability to perform daily activities",
        ],
      }
    }
    // Custom symptom handling
    else {
      guidance = {
        severity: "moderate",
        primarySpecialty: "General Medicine",
        condition: "Custom Symptoms",
        description:
          "Based on your description, a medical professional should evaluate your symptoms to provide appropriate care.",
        immediateActions: [
          "Document your symptoms in detail",
          "Note when symptoms started and any triggers",
          "Monitor for any changes or worsening",
          "Maintain adequate rest and hydration",
        ],
        whenToSeekCare: "Schedule an appointment with your healthcare provider for proper evaluation of your symptoms.",
        redFlags: [
          "Sudden worsening of symptoms",
          "Development of severe pain",
          "Signs of infection (fever, chills)",
          "Difficulty with basic functions",
        ],
      }
    }

    setMedicalGuidance(guidance)
    setShowResults(true)
  }

  const handleVoiceInput = () => {
    // Voice input functionality would be implemented here
    console.log("Voice input activated")
  }

  if (showResults && medicalGuidance) {
    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case "emergency":
          return "text-red-600 bg-red-50 border-red-200"
        case "high":
          return "text-orange-600 bg-orange-50 border-orange-200"
        case "moderate":
          return "text-yellow-600 bg-yellow-50 border-yellow-200"
        case "low":
          return "text-green-600 bg-green-50 border-green-200"
        default:
          return "text-gray-600 bg-gray-50 border-gray-200"
      }
    }

    const getSeverityIcon = (severity: string) => {
      switch (severity) {
        case "emergency":
          return <AlertTriangle className="w-5 h-5 text-red-600" />
        case "high":
          return <AlertTriangle className="w-5 h-5 text-orange-600" />
        case "moderate":
          return <Info className="w-5 h-5 text-yellow-600" />
        case "low":
          return <CheckCircle className="w-5 h-5 text-green-600" />
        default:
          return <Info className="w-5 h-5 text-gray-600" />
      }
    }

    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Medical3DScene />
        <div className="max-w-md mx-auto relative z-10">
          {/* Header */}
          <div className="bg-card/90 backdrop-blur-sm border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setShowResults(false)} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-lg font-semibold">{t.healthGuidance}</h1>
            </div>
          </div>

          <div className="px-6 py-6 space-y-6">
            {/* Severity Alert */}
            <Card
              className={`p-4 shadow-lg bg-card/90 backdrop-blur-sm border-2 ${getSeverityColor(medicalGuidance.severity)}`}
            >
              <div className="flex items-center gap-3 mb-2">
                {getSeverityIcon(medicalGuidance.severity)}
                <h2 className="font-semibold text-lg">{medicalGuidance.condition}</h2>
              </div>
              <Badge variant="secondary" className="mb-3">
                {medicalGuidance.severity.toUpperCase()} PRIORITY
              </Badge>
              <p className="text-sm leading-relaxed">{medicalGuidance.description}</p>
            </Card>

            {/* Immediate Actions */}
            <Card className="p-4 shadow-lg bg-card/90 backdrop-blur-sm">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Immediate Actions
              </h3>
              <ul className="space-y-2">
                {medicalGuidance.immediateActions.map((action, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </Card>

            {/* When to Seek Care */}
            <Card className="p-4 shadow-lg bg-card/90 backdrop-blur-sm">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                When to Seek Medical Care
              </h3>
              <p className="text-sm leading-relaxed">{medicalGuidance.whenToSeekCare}</p>
            </Card>

            {/* Red Flags */}
            <Card className="p-4 shadow-lg bg-card/90 backdrop-blur-sm border-red-200">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Emergency Warning Signs
              </h3>
              <p className="text-xs text-red-600 mb-3 font-medium">
                Call emergency services immediately if you experience:
              </p>
              <ul className="space-y-2">
                {medicalGuidance.redFlags.map((flag, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                    {flag}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Home Remedies */}
            {medicalGuidance.homeRemedies && (
              <Card className="p-4 shadow-lg bg-card/90 backdrop-blur-sm">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-purple-600" />
                  Home Care Tips
                </h3>
                <ul className="space-y-2">
                  {medicalGuidance.homeRemedies.map((remedy, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                      {remedy}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Selected Symptoms */}
            <Card className="p-4 shadow-lg bg-card/90 backdrop-blur-sm">
              <h3 className="font-medium text-foreground mb-3">{t.yourSymptoms}</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((symptomId) => {
                  const symptom = commonSymptoms.find((s) => s.id === symptomId)
                  return symptom ? (
                    <Badge key={symptomId} variant="outline">
                      {symptom.name}
                    </Badge>
                  ) : null
                })}
                {customSymptom && <Badge variant="outline">{customSymptom}</Badge>}
              </div>
            </Card>

            {/* Recommended Specialty */}
            <Card className="p-4 shadow-lg bg-card/90 backdrop-blur-sm">
              <h2 className="font-semibold text-foreground mb-2">{t.recommendedSpecialty}</h2>
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                {medicalGuidance.primarySpecialty}
              </Badge>
            </Card>

            {/* Nearby Specialists */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground drop-shadow-sm">{t.nearbySpecialists}</h3>
              {mockDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="p-4 shadow-lg bg-card/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">{doctor.name}</h4>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{doctor.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {doctor.distance}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {doctor.availability}
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    {t.bookNow}
                  </Button>
                </Card>
              ))}
            </div>
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
            <h1 className="text-lg font-semibold">{t.symptomChecker}</h1>
          </div>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Top Section */}
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-foreground drop-shadow-sm">{t.whatsTroubling}</h2>

            {/* Text Input with Voice */}
            <div className="relative">
              <Input
                placeholder={t.describeSymptoms}
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                className="pr-12 h-12 bg-muted/80 backdrop-blur-sm border-border shadow-sm"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
              >
                <Mic className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          {/* Middle Section - Common Symptoms Grid */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground drop-shadow-sm">{t.commonSymptoms}</h3>
            <div className="grid grid-cols-2 gap-3">
              {commonSymptoms.map((symptom) => {
                const Icon = symptom.icon
                const isSelected = selectedSymptoms.includes(symptom.id)

                return (
                  <Card
                    key={symptom.id}
                    className={`p-4 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl bg-card/90 backdrop-blur-sm ${
                      isSelected
                        ? "bg-accent/90 text-accent-foreground border-accent shadow-accent/30"
                        : "hover:bg-muted/80"
                    }`}
                    onClick={() => handleSymptomToggle(symptom.id)}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <Icon className="w-6 h-6 drop-shadow-sm" />
                      <span className="text-sm font-medium drop-shadow-sm">{symptom.name}</span>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Selected Symptoms Display */}
          {selectedSymptoms.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">{t.selectedSymptoms}</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSymptoms.map((symptomId) => {
                  const symptom = commonSymptoms.find((s) => s.id === symptomId)
                  return symptom ? (
                    <Badge key={symptomId} variant="secondary" className="shadow-sm">
                      {symptom.name}
                    </Badge>
                  ) : null
                })}
              </div>
            </div>
          )}

          {/* Bottom Section - Get Guidance Button */}
          <div className="pt-4">
            <Button
              onClick={handleGetGuidance}
              disabled={selectedSymptoms.length === 0 && !customSymptom}
              className="w-full h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {t.getGuidance}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
