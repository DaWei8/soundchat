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
    <div className="container h-full mx-auto px-4 py-8 flex-col flex items-center ">
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
    <div className="w-full flex flex-col items-center ">
      <h4 className="text-sm font-medium mb-4">Showing Results {clips.length} ...</h4>
      <div className=" flex w-full justify-around p-8 pb-8 rounded-xl gap-8 bg-gray-50 flex-wrap ">
        {clips.map((clip) => (
          <div className=" self-start lg:w-[30%] min-w-[300px] max-w-[40%] " key={clip.id}>
            <AudioPlayer clip={clip} />
          </div>
        ))}
      </div>
    </div>
  );
}
