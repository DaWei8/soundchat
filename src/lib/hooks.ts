"use client"

import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { AudioClip } from './types'

export function useAudioClips(query: string) {
  const [clips, setClips] = useState<AudioClip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchClips() {
      setLoading(true)
      const { data, error } = await supabase
        .from('audio_clips')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) {
        setError(error.message)
      } else {
        setClips(data || [])
      }
      setLoading(false)
    }

    fetchClips()
  }, [query])

  return { clips, loading, error }
}