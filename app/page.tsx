"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { NewsSection } from "@/components/news-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [language, setLanguage] = useState<"en" | "ru" | "kz">("kz")
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false)

  // Load saved preferences on mount with safety checks for SSR
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedLanguage = localStorage.getItem("preferred-language")
        const savedAccessibility = localStorage.getItem("accessibility-mode") === "true"

        if (savedLanguage === "en" || savedLanguage === "ru" || savedLanguage === "kz") {
          setLanguage(savedLanguage)
        }

        if (savedAccessibility) {
          setIsAccessibilityMode(true)
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  // Save preferences when they change with safety checks
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred-language", language)
      }
    } catch (error) {
      console.error("Error saving language preference:", error)
    }
  }, [language])

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("accessibility-mode", isAccessibilityMode.toString())
      }
    } catch (error) {
      console.error("Error saving accessibility preference:", error)
    }
  }, [isAccessibilityMode])

  return (
    <div className={`min-h-screen bg-gray-50 ${isAccessibilityMode ? "accessibility-mode" : ""}`}>
      {/* Skip to main content link for screen readers */}
      <a href="#main-content" className="skip-link">
        {language === "en"
          ? "Skip to main content"
          : language === "ru"
            ? "Перейти к основному содержанию"
            : "Негізгі мазмұнға өту"}
      </a>

      <Header
        language={language}
        setLanguage={setLanguage}
        isAccessibilityMode={isAccessibilityMode}
        setIsAccessibilityMode={setIsAccessibilityMode}
      />
      <main id="main-content">
        <Hero language={language} isAccessibilityMode={isAccessibilityMode} />
        <NewsSection language={language} isAccessibilityMode={isAccessibilityMode} />
      </main>
      <Footer language={language} isAccessibilityMode={isAccessibilityMode} />
    </div>
  )
}
