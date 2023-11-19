"use client";

import React, { useState } from "react";
import axios from "axios";
import * as z from "zod";
import Heading from "@/components/uses/Heading";
import { Loader, Music, VideoIcon } from "lucide-react";
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
import toast from "react-hot-toast";
import { useProModal } from "@/hooks/use-promodal";

const VideoGeneration = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const proModal = useProModal();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // form.handleSubmit(console.log)

    try {
      setVideo(undefined);
      const response = await axios.post("/api/video", values);

      setVideo(response.data[0]);
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
        title="Video Generation"
        description="Create video using prompt"
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                      placeholder="Clown fish prawing around coral reef "
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
        {!video && !isLoading && <EmptyComp label="No video generated" />}
        {video && (
          <video
            controls
            className="w-full aspect-video  mt-8 rounded-lg border bg-black"
          >
            <source src={video} />
          </video>
        )}
      </div>
    </div>
  );
};

export default VideoGeneration;
