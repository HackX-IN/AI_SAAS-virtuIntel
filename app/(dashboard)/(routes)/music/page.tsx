"use client";

import React, { useState } from "react";
import axios from "axios";
import * as z from "zod";
import Heading from "@/components/uses/Heading";
import { Loader, MessageSquare, Music } from "lucide-react";
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
import { useProModal } from "@/hooks/use-promodal";
import toast from "react-hot-toast";

interface ChatCompletionContentPart {
  text: string;
}

const MusicGeneration = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [music, setMusic] = useState<string>();
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
      setMusic(undefined);
      const response = await axios.post("/api/music", values);

      setMusic(response.data.audio);
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
        title="Music Generation"
        description="Create music using prompt"
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                      placeholder="Piano Solo ... "
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
        {!music && !isLoading && <EmptyComp label="No music generated" />}
        {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
          </audio>
        )}
      </div>
    </div>
  );
};

export default MusicGeneration;
