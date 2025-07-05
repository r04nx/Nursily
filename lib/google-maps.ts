"use client"

interface GoogleMapsConfig {
  apiKey: string
  libraries: string[]
}

interface MapOptions {
  center: { lat: number; lng: number }
  zoom: number
  mapTypeId?: string
}

interface MarkerOptions {
  position: { lat: number; lng: number }
  title?: string
  icon?: string
  clickable?: boolean
}

class GoogleMapsService {
  private isLoaded = false
  private loadPromise: Promise<void> | null = null

  async loadGoogleMaps(config: GoogleMapsConfig): Promise<void> {
    if (this.isLoaded) return
    if (this.loadPromise) return this.loadPromise

    this.loadPromise = new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("Google Maps can only be loaded in the browser"))
        return
      }

      // Check if already loaded
      if (window.google && window.google.maps) {
        this.isLoaded = true
        resolve()
        return
      }

      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}&libraries=${config.libraries.join(",")}`
      script.async = true
      script.defer = true

      script.onload = () => {
        this.isLoaded = true
        resolve()
      }

      script.onerror = () => {
        reject(new Error("Failed to load Google Maps"))
      }

      document.head.appendChild(script)
    })

    return this.loadPromise
  }

  createMap(element: HTMLElement, options: MapOptions): any {
    if (!this.isLoaded || !window.google) {
      throw new Error("Google Maps not loaded")
    }

    return new window.google.maps.Map(element, options)
  }

  createMarker(options: MarkerOptions): any {
    if (!this.isLoaded || !window.google) {
      throw new Error("Google Maps not loaded")
    }

    return new window.google.maps.Marker(options)
  }

  async getCurrentLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        },
      )
    })
  }

  calculateDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
    if (!this.isLoaded || !window.google) {
      throw new Error("Google Maps not loaded")
    }

    const service = new window.google.maps.DistanceMatrixService()
    // This is a simplified distance calculation
    // In a real app, you'd use the DistanceMatrix API
    const R = 6371 // Earth's radius in km
    const dLat = this.toRad(point2.lat - point1.lat)
    const dLon = this.toRad(point2.lng - point1.lng)
    const lat1 = this.toRad(point1.lat)
    const lat2 = this.toRad(point2.lat)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private toRad(value: number): number {
    return (value * Math.PI) / 180
  }
}

export const googleMapsService = new GoogleMapsService()

// Type declarations for Google Maps
declare global {
  interface Window {
    google: any
  }
}
