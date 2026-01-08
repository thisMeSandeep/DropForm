import { Sparkle } from "lucide-react"
import AnimatedTextArea from "./AnimatedTextArea"

const Hero = () => {
    return (
        <section className="pt-32 pb-32 md:pb-40 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center min-h-screen">
            {/* Text content */}
            <div className="max-w-5xl mx-auto text-center w-full">

                {/* Hero badge */}
                <div className="flex justify-center mb-2">
                    <span className="hero-badge space-x-2">
                        <Sparkle className="size-4 rotate-45 text-white" />
                        <p className="hero-badge-text">Build forms using AI</p>
                    </span>
                </div>

                {/* Main heading  */}
                <h1 className="mb-4">
                    {/* Desktop */}
                    <div className="hidden md:block">
                        <span className="section-header-title text-7xl font-semibold leading-tight">
                            Drop forms within seconds.
                        </span>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden">
                        <span className="section-header-title text-4xl sm:text-5xl font-bold leading-tight block">
                            Drop forms
                        </span>
                        <span className="section-header-title text-4xl sm:text-5xl font-bold leading-tight block">
                            Within seconds.
                        </span>
                    </div>
                </h1>

                {/* Sub heading */}
                <h3 className="text-lg text-gray-100/40 ">Build forms by just writing a prompt in human language.</h3>

            </div>

            {/* Animted text area  */}
            <div className="w-full mt-8">
                <AnimatedTextArea />
            </div>

        </section>
    )
}

export default Hero