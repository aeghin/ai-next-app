'use client';

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
    {
        name: "Edward",
        avatar: "E",
        title: "Software Engineer",
        description: "App was superb when creating content for my youtube channel!"
    },
    {
        name: "Edward",
        avatar: "E",
        title: "Software Engineer",
        description: "App was superb when creating content for my youtube channel!"
    },
    {
        name: "Edward",
        avatar: "E",
        title: "Software Engineer",
        description: "App was superb when creating content for my youtube channel!"
    },
    {
        name: "Edward",
        avatar: "E",
        title: "Software Engineer",
        description: "App was superb when creating content for my youtube channel!"
    },
]

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grids-cols-1 sm:gridcols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
};