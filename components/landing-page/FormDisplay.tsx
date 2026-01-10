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

const springConfig = {
    stiffness: 90,
    damping: 20,
    mass: 0.6,
}

const FormDisplay = () => {
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 85%", "end 15%"],
    })

    // Fade in early
    const opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])

    // LEFT card — already fanned out
    const leftXRaw = useTransform(scrollYProgress, [0, 0.6], [-140, -260])
    const leftRotateRaw = useTransform(scrollYProgress, [0, 0.6], [-8, -14])
    const leftScaleRaw = useTransform(scrollYProgress, [0, 0.6], [0.96, 1])

    // RIGHT card — already fanned out
    const rightXRaw = useTransform(scrollYProgress, [0, 0.6], [140, 260])
    const rightRotateRaw = useTransform(scrollYProgress, [0, 0.6], [8, 14])
    const rightScaleRaw = useTransform(scrollYProgress, [0, 0.6], [0.96, 1])

    // Smooth them
    const leftX = useSpring(leftXRaw, springConfig)
    const leftRotate = useSpring(leftRotateRaw, springConfig)
    const leftScale = useSpring(leftScaleRaw, springConfig)

    const rightX = useSpring(rightXRaw, springConfig)
    const rightRotate = useSpring(rightRotateRaw, springConfig)
    const rightScale = useSpring(rightScaleRaw, springConfig)

    return (
        <section
            ref={sectionRef}
            className="relative px-4 pt-32 pb-40 overflow-visible"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Build modern forms within seconds
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        See how DropForm turns a simple prompt into a fully designed form.
                    </p>
                </div>

                {/* Cards */}
                <div className="relative h-[520px] flex items-center justify-center overflow-visible">
                    {/* LEFT */}
                    <motion.div
                        style={{
                            x: leftX,
                            rotateZ: leftRotate,
                            scale: leftScale,
                            opacity,
                        }}
                        className="absolute w-[300px] h-[440px] rounded-2xl bg-white shadow-2xl z-0"
                    >
                        <div className="relative w-full h-full p-4">
                            <Image
                                src="/form1.png"
                                alt="Form 1"
                                fill
                                unoptimized
                                className="object-contain rounded-xl"
                            />
                        </div>
                    </motion.div>

                    {/* CENTER */}
                    <motion.div
                        style={{ opacity }}
                        className="relative w-[340px] h-[480px] rounded-2xl bg-white shadow-[0_40px_90px_rgba(0,0,0,0.35)] z-10"
                    >
                        <div className="relative w-full h-full p-4">
                            <Image
                                src="/form2.png"
                                alt="Form 2"
                                fill
                                priority
                                unoptimized
                                className="object-contain rounded-xl"
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        style={{
                            x: rightX,
                            rotateZ: rightRotate,
                            scale: rightScale,
                            opacity,
                        }}
                        className="absolute w-[300px] h-[440px] rounded-2xl bg-white shadow-2xl z-0"
                    >
                        <div className="relative w-full h-full p-4">
                            <Image
                                src="/form3.png"
                                alt="Form 3"
                                fill
                                unoptimized
                                className="object-contain rounded-xl"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
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
