"use client";

import SearchBar from "@/components/SearchBar";
import AudioPlayer from "@/components/AudioPlayer";
import ShareButton from "@/components/ShareButton";
import useAudioClips from "@/lib/hooks";
import Spinner from "@/components/ui/spinner";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  
  return (
    <div className="container h-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Soundchat App</h1>
      <SearchBar />
      <AudioResults query={searchParams.query || ""} />
    </div>
  );
}

function AudioResults({ query }: { query: string }) {
  const { clips, loading, error } = useAudioClips(query);

  if (loading)
    return (
      <div className=" w-full h-full flex items-center mt-10 gap-4 flex-col ">
        <Spinner />
        Loading
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {clips.map((clip) => (
        <div key={clip.id} className="mb-4">
          <AudioPlayer clip={clip} />
          <div className="mt-2">
            <ShareButton clip={clip} />
          </div>
        </div>
      ))}
    </div>
  );
}
