"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Star,
  MapPin,
  Phone,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Bone,
  Baby,
  Activity,
  Navigation,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { GoogleMaps } from "./google-maps"

interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  experience: number
  hospital: string
  address: string
  phone: string
  avatar: string
  availableSlots: string[]
  consultationFee: number
  languages: string[]
}

interface TimeSlot {
  time: string
  available: boolean
}

interface Hospital {
  id: string
  name: string
  address: string
  phone: string
  coordinates: { lat: number; lng: number }
  rating: number
  openHours: string
}

export function AppointmentBooking() {
  const router = useRouter()
  const { language, t } = useLanguage()
  const [step, setStep] = useState<"specialty" | "doctor" | "map" | "slot" | "details" | "confirmation">("specialty")
  const [selectedSpecialty, setSelectedSpecialty] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [showMap, setShowMap] = useState(false)
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    symptoms: "",
  })

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

  const specialties = [
    { id: "general", name: "General Medicine", icon: Stethoscope, color: "bg-blue-500" },
    { id: "cardiology", name: "Cardiology", icon: Heart, color: "bg-red-500" },
    { id: "neurology", name: "Neurology", icon: Brain, color: "bg-purple-500" },
    { id: "ophthalmology", name: "Ophthalmology", icon: Eye, color: "bg-green-500" },
    { id: "orthopedics", name: "Orthopedics", icon: Bone, color: "bg-orange-500" },
    { id: "pediatrics", name: "Pediatrics", icon: Baby, color: "bg-pink-500" },
    { id: "emergency", name: "Emergency Medicine", icon: Activity, color: "bg-red-600" },
  ]

  const mockDoctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Rajesh Kumar",
      specialty: "General Medicine",
      rating: 4.8,
      experience: 15,
      hospital: "Apollo Hospital",
      address: "123 Main Street, Chennai - 600001",
      phone: "+91 98765 43210",
      avatar: "/caring-doctor.png",
      availableSlots: ["09:00", "10:30", "14:00", "15:30", "17:00"],
      consultationFee: 500,
      languages: ["English", "Tamil", "Hindi"],
    },
    {
      id: "2",
      name: "Dr. Priya Sharma",
      specialty: "Cardiology",
      rating: 4.9,
      experience: 12,
      hospital: "Fortis Hospital",
      address: "456 Heart Lane, Chennai - 600002",
      phone: "+91 98765 43211",
      avatar: "/female-doctor.png",
      availableSlots: ["10:00", "11:30", "15:00", "16:30"],
      consultationFee: 800,
      languages: ["English", "Tamil"],
    },
    {
      id: "3",
      name: "Dr. Arjun Patel",
      specialty: "Neurology",
      rating: 4.7,
      experience: 18,
      hospital: "AIIMS Chennai",
      address: "789 Brain Avenue, Chennai - 600003",
      phone: "+91 98765 43212",
      avatar: "/neurologist.png",
      availableSlots: ["09:30", "11:00", "14:30", "16:00"],
      consultationFee: 1000,
      languages: ["English", "Hindi"],
    },
  ]

  const hospitals: Hospital[] = [
    {
      id: "1",
      name: "Apollo Hospital",
      address: "123 Main Street, Chennai - 600001",
      phone: "+91 44 2829 0200",
      coordinates: { lat: 13.0827, lng: 80.2707 },
      rating: 4.5,
      openHours: "24/7",
    },
    {
      id: "2",
      name: "Fortis Hospital",
      address: "456 Heart Lane, Chennai - 600002",
      phone: "+91 44 6676 1000",
      coordinates: { lat: 13.0878, lng: 80.2785 },
      rating: 4.3,
      openHours: "24/7",
    },
    {
      id: "3",
      name: "AIIMS Chennai",
      address: "789 Brain Avenue, Chennai - 600003",
      phone: "+91 44 2659 3040",
      coordinates: { lat: 13.0732, lng: 80.2609 },
      rating: 4.7,
      openHours: "24/7",
    },
  ]

  const filteredDoctors = mockDoctors.filter(
    (doctor) => selectedSpecialty === "" || doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase()),
  )

  const handleBookAppointment = () => {
    // Here you would typically send the booking data to your backend
    console.log("Booking appointment:", {
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      patient: patientDetails,
    })
    setStep("confirmation")
  }

  const renderStepContent = () => {
    switch (step) {
      case "specialty":
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center mb-6">Select Medical Specialty</h2>
            <div className="grid grid-cols-1 gap-3">
              {specialties.map((specialty) => {
                const Icon = specialty.icon
                return (
                  <Card
                    key={specialty.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105"
                    onClick={() => {
                      setSelectedSpecialty(specialty.name)
                      setStep("doctor")
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${specialty.color} rounded-full flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{specialty.name}</h3>
                        <p className="text-sm text-muted-foreground">Available specialists</p>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        )

      case "doctor":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" onClick={() => setStep("specialty")}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold">Select Doctor</h2>
              <div className="ml-auto">
                <Button variant="outline" size="sm" onClick={() => setShowMap(!showMap)}>
                  <MapPin className="w-4 h-4 mr-1" />
                  {showMap ? "List" : "Map"}
                </Button>
              </div>
            </div>

            {showMap ? (
              <GoogleMaps
                hospitals={hospitals}
                selectedHospital={hospitals.find((h) => h.name === selectedDoctor?.hospital)}
                showDirections={true}
                className="mb-4"
              />
            ) : (
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className="p-4 cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => {
                      setSelectedDoctor(doctor)
                      setStep("slot")
                    }}
                  >
                    <div className="flex gap-4">
                      <img
                        src={doctor.avatar || "/placeholder.svg"}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{doctor.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{doctor.experience} years exp</span>
                            </div>
                          </div>
                          <Badge variant="secondary">₹{doctor.consultationFee}</Badge>
                        </div>
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{doctor.hospital}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedDoctor(doctor)
                                setShowMap(true)
                              }}
                              className="ml-auto h-6 px-2 text-xs"
                            >
                              <Navigation className="w-3 h-3 mr-1" />
                              View on Map
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            <span>{doctor.phone}</span>
                          </div>
                          <div className="flex gap-1 mt-2">
                            {doctor.languages.map((lang) => (
                              <Badge key={lang} variant="outline" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )

      case "slot":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" onClick={() => setStep("doctor")}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold">Select Date & Time</h2>
            </div>

            {selectedDoctor && (
              <Card className="p-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedDoctor.avatar || "/placeholder.svg"}
                    alt={selectedDoctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{selectedDoctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="mt-1"
                />
              </div>

              {selectedDate && (
                <div>
                  <Label>Available Time Slots</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {selectedDoctor?.availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={selectedTime === slot ? "default" : "outline"}
                        disabled={!selectedDoctor.availableSlots.includes(slot)}
                        onClick={() => setSelectedTime(slot)}
                        className="h-12"
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDate && selectedTime && (
                <Button onClick={() => setStep("details")} className="w-full">
                  Continue to Patient Details
                </Button>
              )}
            </div>
          </div>
        )

      case "details":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Button variant="ghost" size="sm" onClick={() => setStep("slot")}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold">Patient Details</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={patientDetails.name}
                  onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                  placeholder="Enter patient's full name"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={patientDetails.age}
                    onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
                    placeholder="Age"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={patientDetails.gender}
                    onValueChange={(value) => setPatientDetails({ ...patientDetails, gender: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={patientDetails.phone}
                  onChange={(e) => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="symptoms">Symptoms / Reason for Visit</Label>
                <Textarea
                  id="symptoms"
                  value={patientDetails.symptoms}
                  onChange={(e) => setPatientDetails({ ...patientDetails, symptoms: e.target.value })}
                  placeholder="Describe your symptoms or reason for consultation..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <Button
                onClick={handleBookAppointment}
                className="w-full"
                disabled={
                  !patientDetails.name || !patientDetails.age || !patientDetails.gender || !patientDetails.phone
                }
              >
                Book Appointment
              </Button>
            </div>
          </div>
        )

      case "confirmation":
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Appointment Booked!</h2>
              <p className="text-muted-foreground">Your appointment has been successfully scheduled</p>
            </div>

            {selectedDoctor && (
              <Card className="p-4 text-left">
                <h3 className="font-semibold mb-3">Appointment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Doctor:</span>
                    <span className="font-medium">{selectedDoctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Specialty:</span>
                    <span>{selectedDoctor.specialty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hospital:</span>
                    <span>{selectedDoctor.hospital}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee:</span>
                    <span className="font-medium">₹{selectedDoctor.consultationFee}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Hospital Location</h4>
                  <div className="text-sm text-muted-foreground mb-3">{selectedDoctor.address}</div>
                  <GoogleMaps
                    hospitals={hospitals.filter((h) => h.name === selectedDoctor.hospital)}
                    selectedHospital={hospitals.find((h) => h.name === selectedDoctor.hospital)}
                    showDirections={true}
                  />
                </div>
              </Card>
            )}

            <div className="space-y-3">
              <Button onClick={() => router.push("/")} className="w-full">
                Back to Home
              </Button>
              <Button variant="outline" onClick={() => setStep("specialty")} className="w-full">
                Book Another Appointment
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen bg-background ${getLanguageClass()}`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            {step === "specialty" ? (
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            ) : null}
            <h1 className="text-lg font-semibold">{t.bookAppointment}</h1>
          </div>
        </div>

        <div className="px-6 py-6">{renderStepContent()}</div>
      </div>
    </div>
  )
}
