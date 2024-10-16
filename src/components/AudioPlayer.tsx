"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Download, Terminal } from "lucide-react";
import { AudioClip } from "@/lib/types";
import ShareButton from "./ShareButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AudioPlayerProps {
  clip: AudioClip;
}

export default function AudioPlayer({ clip }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const downloadAudio = async () => {
    //download the audio flle locally from the server and doownload the audio file if it exists
    const response = await fetch(clip.url);
    const blob = await response.blob();
    const file = new File([blob], clip.name, { type: blob.type });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = clip.name;
    a.click();
    URL.revokeObjectURL(a.href);
    alert("Audio file downloaded successfully!");
    return (
      <Alert>
        <AlertTitle>Download</AlertTitle>
        <AlertDescription>Audio file downloaded successfully!</AlertDescription>
      </Alert>
    );
  };

  return (
    <Card className=" w-full h-[180px] bg-background ">
      <CardContent className="p-4 flex-col gap-2 flex">
        <div className=" flex justify-between ">
          <h3 className="text-sm font-semibold mb-2">{clip.name}</h3>
        </div>
        <audio
          ref={audioRef}
          src={clip.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        <Slider

          value={[currentTime]}
          max={audioRef.current?.duration || 100}
          step={0.1}
          onValueChange={handleSliderChange}
          className="w-full cursor-pointer"
        />
        <div className="flex items-center justify-between w=full space-x-2 mt-2">
          <div className="flex items-center w=full space-x-2">
          <Button onClick={togglePlayPause} variant="outline" size="icon">
            {isPlaying ? (
              <Pause className="h-4 min-w-8" />
            ) : (
              <Play className="h-4 min-w-8" />
            )}
          </Button>
          <Button onClick={resetAudio} variant="outline" size="icon">
            <RotateCcw className="h-4 min-w-8" />
          </Button>
          <Button onClick={downloadAudio} variant="outline" size="icon">
            <Download className="h-4 min-w-8" />
          </Button>
          </div>
          <ShareButton clip={clip} />
        </div>
        <p className="text-sm text-gray-500">{clip.description}</p>
      </CardContent>
    </Card>
  );
}
