"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Navigation, Phone, Clock, Star } from "lucide-react"
import type { google } from "google-maps"

interface Hospital {
  id: string
  name: string
  address: string
  phone: string
  coordinates: {
    lat: number
    lng: number
  }
  rating: number
  openHours: string
}

interface GoogleMapsProps {
  hospitals: Hospital[]
  selectedHospital?: Hospital
  onHospitalSelect?: (hospital: Hospital) => void
  showDirections?: boolean
  className?: string
}

export function GoogleMaps({
  hospitals,
  selectedHospital,
  onHospitalSelect,
  showDirections = false,
  className = "",
}: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Mock Google Maps implementation (since we can't use real Google Maps API in this environment)
  useEffect(() => {
    if (mapRef.current) {
      // This would normally initialize Google Maps
      console.log("[v0] Google Maps would be initialized here with hospitals:", hospitals)
    }
  }, [hospitals])

  const handleGetDirections = (hospital: Hospital) => {
    if (userLocation) {
      // This would normally open Google Maps with directions
      const directionsUrl = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${hospital.coordinates.lat},${hospital.coordinates.lng}`
      console.log("[v0] Would open directions:", directionsUrl)
      // In a real app: window.open(directionsUrl, '_blank')
      alert(`Directions to ${hospital.name} would open in Google Maps`)
    } else {
      alert("Please enable location access to get directions")
    }
  }

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Unable to get your location. Please enable location access.")
        },
      )
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Mock Map Container */}
      <div
        ref={mapRef}
        className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden"
      >
        <div className="text-center space-y-2">
          <MapPin className="w-8 h-8 text-gray-400 mx-auto" />
          <p className="text-sm text-gray-500">Interactive Google Maps</p>
          <p className="text-xs text-gray-400">Showing {hospitals.length} hospital locations</p>
        </div>

        {/* Mock map pins */}
        <div className="absolute inset-0 pointer-events-none">
          {hospitals.map((hospital, index) => (
            <div
              key={hospital.id}
              className="absolute w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center"
              style={{
                left: `${20 + index * 25}%`,
                top: `${30 + index * 15}%`,
              }}
            >
              <MapPin className="w-3 h-3 text-white" />
            </div>
          ))}
        </div>
      </div>

      {/* Location Controls */}
      <div className="flex gap-2">
        <Button onClick={handleGetLocation} variant="outline" size="sm" className="flex-1 bg-transparent">
          <Navigation className="w-4 h-4 mr-2" />
          Get My Location
        </Button>
        {userLocation && (
          <div className="text-xs text-green-600 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            Location found
          </div>
        )}
      </div>

      {/* Hospital List */}
      <div className="space-y-3">
        {hospitals.map((hospital) => (
          <Card
            key={hospital.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedHospital?.id === hospital.id ? "ring-2 ring-accent" : ""
            }`}
            onClick={() => onHospitalSelect?.(hospital)}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{hospital.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{hospital.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{hospital.openHours}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleGetDirections(hospital)
                  }}
                  size="sm"
                  variant="outline"
                  disabled={!userLocation}
                >
                  <Navigation className="w-3 h-3 mr-1" />
                  Directions
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>{hospital.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-3 h-3" />
                  <span>{hospital.phone}</span>
                </div>
              </div>

              {showDirections && userLocation && (
                <div className="pt-2 border-t">
                  <Button onClick={() => handleGetDirections(hospital)} className="w-full" size="sm">
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions to {hospital.name}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
