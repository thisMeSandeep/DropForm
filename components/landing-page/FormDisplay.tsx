import { ArrowRight } from "lucide-react"
import Image from "next/image"

const FormDisplay = () => {
    return (
        <section className="relative px-4 sm:px-6 md:px-8 pt-20 md:pt-32 pb-20">
            <div className="max-w-6xl mx-auto">
                {/* Header section */}
                <div className="text-center mb-12">
                    <h2 className="mb-4">
                        <span className="section-header-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Build modern forms within seconds
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-100/50 max-w-2xl mx-auto">
                        See how DropForm turns a simple prompt into a fully designed, ready-to-use form.
                    </p>
                </div>

                {/* Image container  */}
                <div className="relative w-full aspect-video">
                    <Image
                        alt="DropForm preview - modern AI-powered form builder interface"
                        src="/hero.png"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        className="object-contain"
                        priority
                    />
                </div>

                {/* CTA section */}
                <div className="text-center mt-12">
                    <button className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-full  text-sm sm:text-base font-medium text-white/90  group cursor-pointer">
                        <span className="hero-badge-text">Get started free</span>
                        <ArrowRight className="size-4 mr-2 group-hover:translate-x-1  transition-all duration-300 " />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FormDisplay