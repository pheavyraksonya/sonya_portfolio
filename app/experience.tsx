"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FadeDown from "@/components/animations/FadeDown";

export interface CertificateInfo {
  title: string;
  issuedBy: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  fileUrl?: string;
  imageUrl?: string;
}

export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  date: string;
  location?: string;
  employmentType?: string;
  description: string;
  responsibilities?: string[];
  highlights?: string[];
  skills: string[];
  certificate?: CertificateInfo;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: "KIRIROM INSTITUTE OF TECHNOLOGY | KIT",
    role: "Frontend Developer Intern",
    date: "July 2025 - Present",
    location: "Kirirom, Cambodia",
    employmentType: "Internship",
    description:
      "Working as a Frontend Developer Intern at Kirirom Institute of Technology (KIT), building responsive web interfaces with modern frontend technologies. Integrated REST APIs and managed application state using Redux Toolkit. Also contributed to UI/UX design, backend development, AI integration, and blockchain features to support full stack project development.",
    responsibilities: [
      "Engineered responsive, accessible user interfaces using React, Next.js, TypeScript, and Tailwind CSS.",
      "Architected application state management workflows using Redux Toolkit and connected robust REST APIs.",
      "Collaborated with cross-functional engineering teams on full-stack application modules, including AI services and blockchain features.",
      "Participated in agile sprints, UI/UX wireframing, code reviews, and component reusability optimizations.",
    ],
    highlights: [
      "Contributed to core development on Authentix (blockchain verification platform) and Live Interpreter (real-time translation web app).",
      "Streamlined reusable UI component libraries for optimal performance across desktop and mobile screens.",
    ],
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "REST APIs",
      "Tailwind CSS",
      "Backend Development",
      "AI Integration",
      "Blockchain",
    ],
    // If you have a certificate file or image, uncomment and fill out below:
    /*
    certificate: {
      title: "Certificate of Frontend Internship",
      issuedBy: "Kirirom Institute of Technology (KIT)",
      issueDate: "2026",
      credentialUrl: "https://kit.edu.kh",
      imageUrl: "/images/certificate_kit.jpg",
      fileUrl: "/images/certificate_kit.pdf",
    },
    */
  },
  {
    id: 2,
    company: "VELLORE INSTITUTE OF TECHNOLOGY | VIT CHENNAI",
    role: "Artificial Intelligence & Machine Learning Trainee",
    date: "February 23 - February 27, 2026",
    location: "Chennai, India",
    employmentType: "Short-Term Training",
    description:
      "Participated in an Artificial Intelligence & Machine Learning short course at Vellore Institute of Technology (VIT), Chennai, India, invited by the university through an international academic learning opportunity. The program was offered by the School of Computer Science and Engineering and focused on expanding knowledge of AI and machine learning concepts through specialized academic training.",
    responsibilities: [
      "Participated in specialized training in Artificial Intelligence and Machine Learning at VIT Chennai.",
      "Explored fundamental AI and machine learning concepts, techniques, and practical applications.",
      "Engaged in an international academic learning experience alongside students and educators.",
      "Strengthened technical knowledge and broadened understanding of emerging AI technologies.",
    ],
    highlights: [
      "Received a Certificate of Completion from Vellore Institute of Technology (VIT), Chennai, India.",
      "Successfully completed the Artificial Intelligence & Machine Learning course from February 23 to February 27, 2026.",
      "Participated in an international academic program as a student from Kirirom Institute of Technology, Cambodia.",
    ],
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Technical Training",
      "AI Applications",
      "International Collaboration",
      "Problem Solving",
    ],
    certificate: {
      title:
        "Certificate of Completion - Artificial Intelligence & Machine Learning",
      issuedBy: "Vellore Institute of Technology | VIT, Chennai",
      issueDate: "February 27, 2026",
      credentialUrl: "#",
      imageUrl: "/images/Vibrance_Certificate_Sean copy 2.png",
      fileUrl: "/images/Vibrance_Certificate_Sean.pdf",
    },
  },
];

export default function Experience() {
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const [isCertZoomed, setIsCertZoomed] = useState(false);


  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsCertZoomed(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedExp]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isCertZoomed) {
          setIsCertZoomed(false);
        } else {
          setSelectedExp(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCertZoomed]);

  return (
    <section
      id="experience"
      className="w-full max-w-7xl mx-auto py-24 md:py-32 cursor-default bg-background relative border-t border-text-secondary/10"
    >
      <FadeDown>
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24 w-full text-left">
          <h2 className="text-sm font-bold tracking-[0.2em] text-text-secondary uppercase mb-4">
            Career Path
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-text-primary tracking-tighter">
              Work Experience
            </h3>
          </div>
        </div>
      </FadeDown>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">

        <div className="relative group/list flex flex-col gap-6">
          {experiences.map((exp, index) => {
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => setSelectedExp(exp)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedExp(exp);
                  }
                }}
                className="group/item relative grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 p-6 md:p-8 rounded-2xl cursor-pointer transition-all duration-300 hover:!opacity-100 hover:!blur-none group-hover/list:opacity-50 group-hover/list:blur-[1px] bg-background hover:bg-thirdary/40 border border-text-secondary/15 hover:border-text-primary/40 shadow-sm hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-text-primary/30"
                aria-label={`View details for ${exp.role} at ${exp.company}`}
              >
                {/* Left Column: Date & Meta */}
                <div className="md:col-span-1 flex flex-col justify-between pt-1">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-1">
                      {exp.date}
                    </span>
                    {exp.employmentType && (
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-text-primary/80 bg-thirdary px-2.5 py-1 rounded-md border border-text-secondary/15">
                        {exp.employmentType}
                      </span>
                    )}
                  </div>

                  {/* Certificate indicator on card */}
                  <div className="mt-4 md:mt-0">
                    {exp.certificate ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                        Certificate
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-text-secondary/70">
                        Details &bull; Ongoing
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Column: Role, Company, Desc, Skills */}
                <div className="md:col-span-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="text-2xl font-bold text-text-primary tracking-tight group-hover/item:text-text-primary transition-colors">
                        {exp.role}
                      </h4>
                      <span className="text-xs font-bold uppercase tracking-widest text-text-secondary group-hover/item:text-text-primary transition-colors flex items-center gap-1.5 flex-shrink-0 pt-1">
                        View Details
                        <svg
                          className="w-4 h-4 transform group-hover/item:translate-x-1 transition-transform"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-text-secondary tracking-wider uppercase mb-4 flex items-center gap-2">
                      {exp.company}
                      {exp.location && (
                        <span className="text-xs font-normal text-text-secondary/60">
                          &bull; {exp.location}
                        </span>
                      )}
                    </h5>

                    <p className="text-base text-text-secondary font-medium leading-relaxed mb-6 line-clamp-3">
                      {exp.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-text-secondary/10">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold bg-thirdary text-text-primary px-3 py-1.5 rounded-lg border border-text-secondary/10 uppercase tracking-wider group-hover/item:border-text-secondary/20 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Experience Detail & Certificate Modal */}
      <AnimatePresence>
        {selectedExp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedExp(null)}
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-background border border-text-secondary/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 border-b border-text-secondary/10 flex items-start justify-between gap-4 bg-background/95 backdrop-blur-md sticky top-0 z-20">
                <div className="flex-1 pr-2">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold tracking-widest text-text-secondary uppercase">
                      {selectedExp.date}
                    </span>
                    {selectedExp.employmentType && (
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-thirdary text-text-primary px-2.5 py-0.5 rounded-full border border-text-secondary/15">
                        {selectedExp.employmentType}
                      </span>
                    )}
                    {selectedExp.location && (
                      <span className="text-[11px] font-medium text-text-secondary">
                        &bull; {selectedExp.location}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">
                    {selectedExp.role}
                  </h3>
                  <h4 className="text-sm md:text-base font-bold text-text-secondary tracking-wider uppercase mt-1">
                    {selectedExp.company}
                  </h4>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedExp(null)}
                  className="p-2.5 rounded-full bg-thirdary hover:bg-text-secondary/20 text-text-secondary hover:text-text-primary transition-colors focus:outline-none cursor-pointer flex-shrink-0"
                  aria-label="Close details"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow space-y-8">
                {/* Section: Overview */}
                <div>
                  <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">
                    Overview
                  </span>
                  <p className="text-base text-text-primary/90 font-medium leading-relaxed bg-thirdary/40 p-5 rounded-2xl border border-text-secondary/10">
                    {selectedExp.description}
                  </p>
                </div>

                {/* Section: Key Responsibilities */}
                {selectedExp.responsibilities &&
                  selectedExp.responsibilities.length > 0 && (
                    <div>
                      <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">
                        Key Responsibilities & Scope
                      </span>
                      <ul className="space-y-3">
                        {selectedExp.responsibilities.map((resp, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 bg-thirdary/30 p-3.5 rounded-xl border border-text-secondary/5 text-sm font-medium text-text-primary/90 leading-relaxed"
                          >
                            <span className="text-text-primary font-black mt-0.5">
                              &rarr;
                            </span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Section: Key Highlights / Achievements */}
                {selectedExp.highlights &&
                  selectedExp.highlights.length > 0 && (
                    <div>
                      <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">
                        Contributions & Highlights
                      </span>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedExp.highlights.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 bg-thirdary/50 p-4 rounded-xl border border-text-secondary/10"
                          >
                            <svg
                              className="w-5 h-5 text-text-primary flex-shrink-0 mt-0.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm font-medium text-text-primary">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Section: Skills & Technologies */}
                <div>
                  <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3">
                    Technologies & Skills Used
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedExp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold bg-thirdary text-text-primary px-3 py-1.5 rounded-lg border border-text-secondary/15 uppercase tracking-wider"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Section: Certificate (If Have) */}
                <div className="pt-2">
                  <span className="text-xs font-bold tracking-widest text-text-secondary uppercase block mb-3 flex items-center justify-between">
                    <span>Certificate & Credential</span>
                    {selectedExp.certificate ? (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Verified
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest bg-thirdary px-2 py-0.5 rounded border border-text-secondary/10">
                        Ongoing Role
                      </span>
                    )}
                  </span>

                  {selectedExp.certificate ? (
                    <div className="bg-thirdary/60 border border-text-secondary/15 rounded-2xl p-5 md:p-6 flex flex-col gap-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-text-primary text-background flex items-center justify-center flex-shrink-0 shadow-md">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h5 className="text-lg font-bold text-text-primary tracking-tight">
                              {selectedExp.certificate.title}
                            </h5>
                            <p className="text-xs font-semibold text-text-secondary mt-0.5 uppercase tracking-wider">
                              Issued by: {selectedExp.certificate.issuedBy}
                            </p>
                            {selectedExp.certificate.issueDate && (
                              <p className="text-xs text-text-secondary/80 mt-0.5">
                                Date: {selectedExp.certificate.issueDate}
                              </p>
                            )}
                            {selectedExp.certificate.credentialId && (
                              <p className="text-[11px] font-mono text-text-secondary/70 mt-1">
                                ID: {selectedExp.certificate.credentialId}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap sm:flex-col gap-2">
                          {selectedExp.certificate.credentialUrl && (
                            <a
                              href={selectedExp.certificate.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-center font-bold text-xs uppercase tracking-wider bg-text-primary text-background px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                            >
                              <span>Verify Credential</span>
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          )}
                          {selectedExp.certificate.fileUrl && (
                            <a
                              href={selectedExp.certificate.fileUrl}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-center font-bold text-xs uppercase tracking-wider border border-text-secondary/20 hover:border-text-primary text-text-primary px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                            >
                              <span>Download</span>
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Certificate Preview Image (if available) */}
                      {selectedExp.certificate.imageUrl && (
                        <div
                          className="relative mt-2 rounded-xl overflow-hidden border border-text-secondary/20 aspect-[16/10] bg-background/50 cursor-zoom-in group"
                          onClick={() => setIsCertZoomed(true)}
                        >
                          <Image
                            src={selectedExp.certificate.imageUrl}
                            alt={selectedExp.certificate.title}
                            fill
                            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                            Click to expand
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-thirdary/30 border border-dashed border-text-secondary/20 rounded-2xl p-6 text-center flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-thirdary flex items-center justify-center text-text-secondary mb-3">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h5 className="text-sm font-bold text-text-primary mb-1">
                        Ongoing Role &bull; Certificate in Progress
                      </h5>
                      <p className="text-xs text-text-secondary max-w-md leading-relaxed">
                        This is an active role at {selectedExp.company}.
                        Official certificates and completion credentials will be
                        issued upon conclusion of the term.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 md:p-6 border-t border-text-secondary/10 flex items-center justify-between bg-background">
                <span className="text-xs font-medium text-text-secondary hidden sm:inline-block">
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 rounded bg-thirdary font-mono text-[10px] border border-text-secondary/20">
                    Esc
                  </kbd>{" "}
                  to close
                </span>
                <button
                  onClick={() => setSelectedExp(null)}
                  className="w-full sm:w-auto font-bold text-xs uppercase tracking-widest bg-text-primary text-background px-6 py-3 rounded-xl hover:opacity-90 transition-opacity ml-auto cursor-pointer"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox / Zoomed Certificate Image Modal */}
      <AnimatePresence>
        {isCertZoomed && selectedExp?.certificate?.imageUrl && (
          <div
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
            onClick={() => setIsCertZoomed(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center"
            >
              <Image
                src={selectedExp.certificate.imageUrl}
                alt={selectedExp.certificate.title}
                fill
                className="object-contain"
              />
              <button
                onClick={() => setIsCertZoomed(false)}
                className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full backdrop-blur-md transition-colors"
                aria-label="Close zoom"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
