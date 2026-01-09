import Image from "next/image"
import { ContainerScroll } from "../ui/container-scroll-animation"

const DashboardShowcase = () => {
    return (
        <section id="showcase" className="relative bg-transparent h-full">
            <ContainerScroll
                titleComponent={
                    <div className="text-center">
                        <h2 className="mb-4">
                            <span className="section-header-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                Manage your collected data seamlessly
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-100/50 max-w-2xl mx-auto mb-8">
                            Query your data with our smart AI chat bot in natural language
                        </p>
                    </div>
                }
            >
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#030014]">
                    <Image
                        alt="DropForm dashboard - AI-powered data management with natural language querying interface"
                        src="/dashboard.png"
                        width={1200}
                        height={800}
                        className="object-contain w-full h-full border border-white/5"
                        priority
                    />
                </div>
            </ContainerScroll>
        </section>
    )
}

export default DashboardShowcase