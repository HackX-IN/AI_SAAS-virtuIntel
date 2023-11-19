"use client";

import React, { useState } from "react";
import axios from "axios";
import * as z from "zod";
import Heading from "@/components/uses/Heading";
import { Code, Loader, MessageSquare } from "lucide-react";
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
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import { useProModal } from "@/hooks/use-promodal";

interface ChatCompletionContentPart {
  text: string;
}

const CodeGeneration = () => {
  const router = useRouter();
  const proModal = useProModal();
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
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
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
        title="Code Generation"
        description="Most advanced AI model to generate Code"
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                      placeholder=" Simple toggle button using React "
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
              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }) => (
                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-black/10 p-1 rounded-lg" {...props} />
                  ),
                }}
                className="text-sm overflow-hidden leading-7"
              >
                {message.content || ""}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeGeneration;
