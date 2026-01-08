import { Check } from "lucide-react"
import { Button } from "../ui/button"
import { Particles } from "../ui/particles"

const pricingPlans = [
    {
        name: "Free",
        price: "$0",
        period: "Forever",
        responses: "150 responses",
        features: [
            "AI form generation",
            "Basic customization",
            "Form analytics",
            "Email support",
        ],
        cta: "Get started",
        popular: false,
    },
    {
        name: "Pro",
        price: "$149",
        period: "per month",
        responses: "1,000 responses",
        features: [
            "Everything in Free",
            "Advanced customization",
            "Advanced analytics",
            "Priority support",
            "Custom integrations",
        ],
        cta: "Start free trial",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "$249",
        period: "per month",
        responses: "3,000 responses",
        features: [
            "Everything in Pro",
            "Unlimited forms",
            "White-label options",
            "Dedicated support",
            "Custom AI training",
            "API access",
        ],
        cta: "Contact sales",
        popular: false,
    },
]

const PricingSection = () => {
    return (
        <section className="relative px-4 sm:px-6 md:px-8 pt-20 md:pt-32 pb-20">

            {/* Particles */}
            <div className="absolute inset-0 overflow-hidden">
                <Particles className="w-full h-full" />
            </div>

            <div className="relative max-w-6xl mx-auto z-10">
                {/* Header section */}
                <div className="text-center mb-12">
                    <h2 className="mb-4">
                        <span className="section-header-title text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                            Simple pricing for everyone.
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-100/50 max-w-2xl mx-auto">
                        Choose an affordable plan according with the number of responses you want
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-xl p-6 sm:p-8 flex flex-col ${plan.popular
                                    ? "bg-[#0a0a1a] border-2 border-white/20 scale-105"
                                    : "bg-[#0a0a1a] border border-white/10"
                                } transform-gpu transition-all duration-300 hover:scale-[1.02] hover:border-white/30`}
                            style={{
                                boxShadow: plan.popular
                                    ? "0_0_0_1px_rgba(255,255,255,.1),0_4px_6px_rgba(0,0,0,.3),0_20px_25px_rgba(0,0,0,.2)"
                                    : "0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.3),0_12px_24px_rgba(0,0,0,.2)",
                            }}
                        >
                            {/* Popular badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="hero-badge-text bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            {/* Plan name */}
                            <h3 className="text-xl font-semibold text-white/90 mb-2">
                                {plan.name}
                            </h3>

                            {/* Price */}
                            <div className="mb-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold text-white/90">
                                        {plan.price}
                                    </span>
                                    {plan.price !== "$0" && (
                                        <span className="text-sm text-gray-400">{plan.period}</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-300/70 mt-1">{plan.responses}</p>
                            </div>

                            {/* Features list */}
                            <ul className="flex-1 space-y-3 mb-6">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-white/90 shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-300/70">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Button
                                className={`w-full ${plan.popular
                                        ? "bg-linear-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
                                        : "bg-[#030014] border border-white/20 text-white/90 hover:bg-white/5 hover:border-white/30"
                                    }`}
                                variant={plan.popular ? "default" : "outline"}
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PricingSection