import { Button } from "../../Products/ui/button"
import { Card, CardContent } from "../../Products/ui/card"
import { PhoneCall } from "lucide-react"

const ServicesCTA = () => {
    return (
        <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-900">
            <div className="container px-4 md:px-6 mx-auto">
                <Card className="bg-primary text-primary-foreground border-none shadow-lg">
                    <CardContent className="p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                                Ready to find your perfect car?
                            </h2>
                            <p className="text-primary-foreground/90 max-w-[600px] text-lg">
                                Our car buying experts are ready to help you find, finance, and drive home in your dream vehicle today.
                            </p>
                        </div>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="min-w-[200px] bg-background hover:bg-background/90 text-foreground h-14"
                        >
                            <PhoneCall className="mr-2 h-5 w-5" />
                            Contact an Expert
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default ServicesCTA