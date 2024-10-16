"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AudioClip } from "@/lib/types";

interface ShareButtonProps {
  clip: AudioClip;
}

export default function ShareButton({ clip }: ShareButtonProps) {
  const handleShare = async (platform: string) => {
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, clipId: clip.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to share");
      }

      const data = await response.json();
      alert(data.message); // In a real app, use a proper notification system
    } catch (error) {
      console.error("Error sharing:", error);
      alert("Failed to share. Please try again.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className=" p-1 h-auto bg-transparent hover:bg-transparent "
          variant="secondary"
        >
          Share
          <Share2 className="ml-1 h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("snapchat")}>
          Snapchat
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("twitter")}>
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("instagram")}>
          Instagram
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
