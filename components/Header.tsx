"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
interface NavItem {
  num: string
  name: string
  link: string
}

const navItems: NavItem[] = [
  { num: "01", name: "HOME", link: "home" },
  { num: "02", name: "ABOUT", link: "about" },
  { num: "03", name: "TECH STACK", link: "techstack" },
  { num: "04", name: "EXPERIENCE", link: "experience" },
  { num: "05", name: "SELECTED WORK", link: "projects" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  const handleScroll = (id: string) => {
    setIsOpen(false)
    // Small timeout ensures the smooth exit animation starts before scrolling
    setTimeout(() => {
      const section = document.getElementById(id)
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    }, 150)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null
    const prefersDark = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : false

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)
    setIsDark(shouldBeDark)

    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle("dark", shouldBeDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      document.documentElement.classList.toggle("dark", newTheme)
    }
  }

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      {/* Top Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isOpen
            ? "bg-transparent border-transparent"
            : "bg-background/0 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 md:py-6 flex items-center justify-between">
          {/* Logo on the left */}
          <button
            onClick={() => handleScroll("home")}
            className="group flex items-center gap-1 cursor-pointer focus:outline-none"
            aria-label="Homepage"
          >
            <span className="text-xl md:text-2xl font-black text-text-primary tracking-tighter hover:opacity-80 transition-opacity">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain invert dark:invert-0 transition-[filter] duration-300"
                priority
              />
            </span>       
          </button>

          {/* Right Controls: Theme Toggle & Animated Hamburger/Close Button */}
          <div className="flex items-center gap-5 md:gap-6">
            {mounted && (
              <button
                className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors focus:outline-none p-1"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
                  </svg>
                )}
              </button>
            )}

            {/* Smooth Morphing Menu Button: 2 parallel lines <=> X */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex flex-col justify-center items-center w-10 h-10 cursor-pointer focus:outline-none p-1 group"
              aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            >
              <motion.span
                animate={
                  isOpen
                    ? { rotate: 45, y: 0 }
                    : { rotate: 0, y: -4 }
                }
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-7 h-[2.5px] bg-text-primary rounded-full origin-center"
              />
              <motion.span
                animate={
                  isOpen
                    ? { rotate: -45, y: 0 }
                    : { rotate: 0, y: 4 }
                }
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-7 h-[2.5px] bg-text-primary rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu with smooth physics */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.99 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl text-text-primary flex flex-col justify-between pt-28 pb-8 px-6 md:px-12 overflow-y-auto"
          >
            {/* Center: Numbered Menu Items */}
            <div className="my-auto py-8 flex flex-col items-center justify-center w-full">
              <div className="flex flex-col items-center gap-4 md:gap-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.num}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{
                      delay: index * 0.05 + 0.1,
                      duration: 1.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleScroll(item.link)}
                    className="group flex items-baseline gap-3 md:gap-4 cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-105"
                  >
                    <span className="text-text-secondary/60 group-hover:text-text-primary font-mono text-xs md:text-sm font-bold tracking-wider select-none transition-colors duration-200">
                      {item.num}
                    </span>
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text-primary group-hover:text-text-secondary transition-colors duration-200">
                      {item.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Pill Button "GET IN TOUCH" */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  delay: navItems.length * 0.05 + 0.15,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-10 md:mt-14"
              >
        
              </motion.div>
            </div>

            {/* Bottom Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="max-w-7xl mx-auto w-full flex justify-between items-center text-xs font-medium text-text-secondary/60 pt-4"
            >
           
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
