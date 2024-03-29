'use client';

import { Heading } from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import axios from 'axios';

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/User-avatar";
import { BotAvatar } from "@/components/Bot-avatar";

import { useProModal } from "@/hooks/UseProModal";
import toast from "react-hot-toast";


const ConversationPage = () => {

    const router = useRouter();
    const proModal = useProModal();

    type Message = { role: "user" | "assistant", content: string };

    const [messages, setMessages] = useState<Message[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ''
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {
            const userMessage: Message = { role: 'user', content: values.prompt };

            const newMessages = [...messages, userMessage];

            const response = await axios.post("/api/conversation", {
                messages: newMessages,
            });

            setMessages((currentMsg) => [...currentMsg, userMessage, response.data]);

            form.reset();
        } catch (error: any) {

            if (error?.response?.status === 403) {
                proModal.onOpen();
            } else {
                toast.error("something went wrong");
            };

        } finally {
            router.refresh();
        };
    };

    return (
        <div>
            <Heading
                title="Conversation"
                description="Our most advanced model"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="How do I change a motherboard on my pc?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No Conversation started." />
                    )}
                    <div className="flex flex-col gap-y-4">
                        {messages.map(message => (
                            <div key={message.content}
                                className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === 'user' ? "bg-white border border-black/10" : "bg-muted")}>
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                <p className="text-sm">
                                    {message.content}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ConversationPage;