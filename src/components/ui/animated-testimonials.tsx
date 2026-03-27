"use client"

import { Quote, Star } from "lucide-react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "../../lib/utils"

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

export interface AnimatedTestimonialsProps {
  title?: string
  subtitle?: string
  badgeText?: string
  testimonials?: Testimonial[]
  autoRotateInterval?: number
  trustedCompanies?: string[]
  trustedCompaniesTitle?: string
  className?: string
}

export function AnimatedTestimonials({
  title = "Loved by the community",
  subtitle = "Don't just take our word for it. See what users have to say about SheSafe.",
  badgeText = "Real Stories",
  testimonials = [],
  autoRotateInterval = 6000,
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Refs for scroll animations
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as any,
      },
    },
  }

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Auto rotate testimonials
  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [autoRotateInterval, testimonials.length])

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} id="testimonials" className={cn("py-24 overflow-hidden", className)}>
      <div className="container-safe">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-16 w-full md:grid-cols-2 lg:gap-24"
        >
          {/* Left side: Heading and navigation */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-6">
              {badgeText && (
                <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[var(--color-rose)] bg-[var(--color-rose-muted)] shadow-sm">
                  <Star className="mr-1.5 h-3.5 w-3.5 fill-[var(--color-rose)]" />
                  <span>{badgeText}</span>
                </div>
              )}

              <h2 className="text-4xl md:text-5xl font-display font-semibold text-[var(--color-midnight)]">{title}</h2>

              <p className="max-w-[500px] text-[var(--color-slate)] font-sans text-base md:text-lg leading-relaxed">{subtitle}</p>

              <div className="flex items-center gap-3 pt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === index ? "w-10 bg-[var(--color-rose)]" : "w-2.5 bg-[var(--color-border)] hover:bg-[var(--color-slate-light)]"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side: Testimonial cards */}
          <motion.div variants={itemVariants} className="relative h-full min-h-[350px] md:min-h-[400px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  scale: activeIndex === index ? 1 : 0.9,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" as any }}
                style={{ zIndex: activeIndex === index ? 10 : 0, pointerEvents: activeIndex === index ? 'auto' : 'none' }}
              >
                <div className="bg-white border border-[var(--color-border)] shadow-[var(--shadow-card)] rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-6 flex gap-1">
                      {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>

                    <div className="relative mb-6">
                      <Quote className="absolute -top-3 -left-3 h-10 w-10 text-[var(--color-rose-muted)] opacity-50 rotate-180" />
                      <p className="relative z-10 text-lg md:text-[17px] font-sans font-medium leading-relaxed text-[var(--color-slate)]">"{testimonial.content}"</p>
                    </div>
                  </div>

                  <div>
                    <div className="h-px w-full bg-[var(--color-border)] my-6" />

                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full border border-[var(--color-border)] overflow-hidden bg-[var(--color-off-white)] flex items-center justify-center relative shrink-0">
                        {testimonial.avatar ? (
                          <img src={testimonial.avatar} alt={testimonial.name} className="object-cover w-full h-full" />
                        ) : (
                          <span className="font-semibold text-[var(--color-slate)]">{testimonial.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold font-sans text-[var(--color-midnight)]">{testimonial.name}</h3>
                        <p className="text-[13px] mt-0.5 font-sans text-[var(--color-slate-light)]">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl bg-[var(--color-rose)] opacity-5 -z-10"></div>
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-xl bg-[var(--color-rose)] opacity-5 -z-10"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
