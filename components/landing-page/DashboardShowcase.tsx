import Image from "next/image"
import { ShineBorder } from "../ui/shine-border"

const DashboardShowcase = () => {
    return (
        <section className="relative px-4 sm:px-6 md:px-8 pt-20 md:pt-32 pb-20">

            <div className="max-w-6xl mx-auto">
                {/* Header section */}
                <div className="text-center mb-12">
                    <h2 className="mb-4">
                        <span className="section-header-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Manage your collected data seamlessly
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-100/50 max-w-2xl mx-auto">
                        Query your data with our smart AI chat bot in natural language
                    </p>
                </div>

                {/* Dashboard Image container */}
                <div className="relative w-full p-6 sm:p-8 md:p-12">
                    <div className="relative w-full min-h-[400px] sm:min-h-[500px] md:min-h-[600px] rounded-lg overflow-hidden">
                        <ShineBorder 
                            className="rounded-lg"
                            shineColor={["rgba(229, 156, 255, 0.8)", "rgba(186, 156, 255, 0.8)", "rgba(156, 178, 255, 0.8)"]}
                            borderWidth={2}
                            duration={14}
                        />
                        <div className="absolute inset-[2px] rounded-lg flex items-center justify-center overflow-hidden">
                            <Image
                                alt="DropForm dashboard - AI-powered data management with natural language querying interface"
                                src="/dashboard.png"
                                width={1200}
                                height={800}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                className="object-contain rounded-lg max-w-full max-h-full"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashboardShowcase