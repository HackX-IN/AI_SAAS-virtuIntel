"use client";

import React, { useState } from "react";
import axios from "axios";
import * as z from "zod";
import Heading from "@/components/uses/Heading";
import { Loader, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "../../../../components/ui/form";
import EmptyComp from "@/components/uses/EmptyComp";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/uses/userAvatar";
import BotAvatar from "@/components/uses/botAvatar";
import { ChatCompletionRequestMessage } from "openai";
import { useProModal } from "@/hooks/use-promodal";
import toast from "react-hot-toast";

interface ChatCompletionContentPart {
  text: string;
}

const ConversationPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // form.handleSubmit(console.log)

    try {
      // throw new Error("test");
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Conversation"
        description="Most advanced AI model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 
       focus-within:shadow-sm grid grid-cols-12 gap-2
       "
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:
                    ring-0 focus-visible: ring-transparent"
                      disabled={isLoading}
                      placeholder="How to calculate the circle ... "
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="col-span-12 lg:col-span-2">
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <div className="h-full flex flex-col gap-y-4 items-center justify-center">
              <Loader className="w-10 h-10 relative animate-spin " />
            </div>
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <EmptyComp label="No Conversation Started" />
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <p>{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
