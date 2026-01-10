"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion"
import { useRef } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const springConfig = {
    stiffness: 90,
    damping: 20,
    mass: 0.6,
}

const FormDisplay = () => {
    const sectionRef = useRef(null)

    const isMobile = useMediaQuery("(max-width: 640px)")
    const isTablet = useMediaQuery("(max-width: 1024px)")

    //  Responsive motion distances
    const fanOutX = isMobile ? 90 : isTablet ? 140 : 260
    const rotateDeg = isMobile ? 6 : isTablet ? 10 : 14

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 85%", "end 15%"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])

    // LEFT
    const leftX = useSpring(
        useTransform(scrollYProgress, [0, 0.6], [-fanOutX / 2, -fanOutX]),
        springConfig
    )
    const leftRotate = useSpring(
        useTransform(scrollYProgress, [0, 0.6], [-rotateDeg / 2, -rotateDeg]),
        springConfig
    )
    const leftScale = useSpring(
        useTransform(scrollYProgress, [0, 0.6], [0.97, 1]),
        springConfig
    )

    // RIGHT
    const rightX = useSpring(
        useTransform(scrollYProgress, [0, 0.6], [fanOutX / 2, fanOutX]),
        springConfig
    )
    const rightRotate = useSpring(
        useTransform(scrollYProgress, [0, 0.6], [rotateDeg / 2, rotateDeg]),
        springConfig
    )
    const rightScale = useSpring(
        useTransform(scrollYProgress, [0, 0.6], [0.97, 1]),
        springConfig
    )

    return (
        <section
            ref={sectionRef}
            className="relative px-4 pt-24 md:pt-32 pb-32 md:pb-40 overflow-visible"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Build modern forms within seconds
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        See how DropForm turns a simple prompt into a fully designed form.
                    </p>
                </div>

                {/* Cards */}
                <div className="relative h-[360px] sm:h-[420px] md:h-[520px] flex items-center justify-center">
                    {/* LEFT */}
                    <motion.div
                        style={{ x: leftX, rotateZ: leftRotate, scale: leftScale, opacity }}
                        className="
                            absolute
                            w-[180px] h-[260px]
                            sm:w-[240px] sm:h-[360px]
                            md:w-[300px] md:h-[440px]
                            rounded-2xl bg-white shadow-2xl
                        "
                    >
                        <Image
                            src="/form1.png"
                            alt="Form 1"
                            fill
                            unoptimized
                            className="object-contain p-4 rounded-xl"
                        />
                    </motion.div>

                    {/* CENTER */}
                    <motion.div
                        style={{ opacity }}
                        className="
                            relative z-10
                            w-[210px] h-[300px]
                            sm:w-[280px] sm:h-[400px]
                            md:w-[340px] md:h-[480px]
                            rounded-2xl bg-white
                            shadow-[0_40px_90px_rgba(0,0,0,0.35)]
                        "
                    >
                        <Image
                            src="/form2.png"
                            alt="Form 2"
                            fill
                            priority
                            unoptimized
                            className="object-contain p-4 rounded-xl"
                        />
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        style={{ x: rightX, rotateZ: rightRotate, scale: rightScale, opacity }}
                        className="
                            absolute
                            w-[180px] h-[260px]
                            sm:w-[240px] sm:h-[360px]
                            md:w-[300px] md:h-[440px]
                            rounded-2xl bg-white shadow-2xl
                        "
                    >
                        <Image
                            src="/form3.png"
                            alt="Form 3"
                            fill
                            unoptimized
                            className="object-contain p-4 rounded-xl"
                        />
                    </motion.div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12 md:mt-16">
                    <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition">
                        Get started free
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FormDisplay
