import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Hero from "./hero"
import About from "./about"
import Experience from "./experience"
import TechStack from "./tech-stack"
import Project from "./project"
import Contact from "./contact"

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Experience />
      <TechStack />
      <Project />
      <Contact />
      <Footer />
    </>
  )
}
