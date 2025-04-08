import { useRef } from 'react';
import { teamMembers, companyHistory } from '../../constants/constant';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {Footer, NavBar} from "../../Home";
import SectionHeader from "./components/SectionHeader.tsx";
import TimelineItem from "./components/TimelineItem.tsx";
import TeamMember from "./components/TeamMember.tsx";

const About = () => {
    const heroRef = useRef<HTMLElement | null>(null);
    const statsRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        if (heroRef.current) {
            gsap.from(heroRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
            });
        }

        if (statsRef.current) {
            gsap.from(statsRef.current.children, {
                opacity: 0,
                y: 30,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: 'top 80%',
                }
            });
        }
    }, []);

    return (
        <>
            <NavBar />
            <main className="pt-24 dark:bg-slate-900 min-h-screen">
                {/* Hero Section */}
                <section ref={heroRef} className="relative py-24 bg-blue-600 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-blue-800 opacity-20 z-0"></div>
                    <div
                        className="absolute inset-0 z-0"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1600661653561-629509216228?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.2
                        }}
                    ></div>
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About CarHub</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                            We're passionate about cars and committed to providing exceptional automotive services.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-20 bg-white dark:bg-slate-800">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/2">
                                <img
                                    src="https://images.unsplash.com/photo-1567963303214-19336f978129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                                    alt="CarHub Office"
                                    className="w-full h-auto rounded-xl shadow-lg"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                    Founded in 2015, CarHub began with a simple mission: to make car rental and automotive services more accessible, transparent, and enjoyable for everyone.
                                </p>
                                <p className="text-lg text-gray-600 dark:text-gray-300">
                                    What started as a small local business has grown into a nationwide service provider, but our commitment to exceptional customer service and quality remains unchanged.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-blue-600 text-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { count: "15k+", label: "Happy Customers" },
                                { count: "50+", label: "Locations" },
                                { count: "500+", label: "Vehicles" },
                                { count: "8+", label: "Years of Service" },
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-5xl font-bold mb-2">{stat.count}</div>
                                    <div className="text-xl">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our History Timeline */}
                <section className="py-20 bg-gray-50 dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeader
                            title="Our Journey"
                            subtitle="From our humble beginnings to where we are today, here's how CarHub has evolved over the years."
                        />
                        <div className="mt-16 max-w-4xl mx-auto">
                            {companyHistory.map((item, index) => (
                                <TimelineItem
                                    key={index}
                                    year={item.year}
                                    milestone={item.milestone}
                                    description={item.description}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-20 bg-white dark:bg-slate-800">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionHeader
                            title="Meet Our Team"
                            subtitle="The dedicated individuals behind CarHub who work tirelessly to provide you with the best service."
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                            {teamMembers.map((member) => (
                                <TeamMember key={member.id} {...member} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default About;
