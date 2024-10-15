"use client"

import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw } from "lucide-react"
import { AudioClip } from '@/lib/types';

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

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{clip.name}</h3>
        <audio
          ref={audioRef}
          src={clip.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        <div className="flex items-center space-x-2 mb-2">
          <Button onClick={togglePlayPause} variant="outline" size="icon">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={resetAudio} variant="outline" size="icon">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Slider
            value={[currentTime]}
            max={audioRef.current?.duration || 100}
            step={0.1}
            onValueChange={handleSliderChange}
            className="w-full"
          />
        </div>
        <p className="text-sm text-gray-500">{clip.description}</p>
      </CardContent>
    </Card>
  );
}