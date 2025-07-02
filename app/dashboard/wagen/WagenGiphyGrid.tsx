"use client";

import React, { useEffect, useState } from "react";
import { Gif } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import type { IGif } from "@giphy/js-types";

interface WagenGiphyGridProps {
  model: string;
}

const WagenGiphyGrid: React.FC<WagenGiphyGridProps> = ({ model }) => {
  const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
  const [gif, setGif] = useState<IGif | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey) return;
    setLoading(true);
    setError(null);
    const gf = new GiphyFetch(apiKey);
    gf.search(model, { limit: 1 })
      .then((res) => {
        setGif(res.data[0] || null);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load GIF");
        setLoading(false);
      });
  }, [apiKey, model]);

  if (!apiKey) {
    return <div style={{ color: "red" }}>Giphy API key missing</div>;
  }
  if (loading) {
    return <div>Loading GIF...</div>;
  }
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
  if (!gif) {
    return <div>No GIF found for &quot;{model}&quot;</div>;
  }

  return <Gif gif={gif} width={200} hideAttribution />;
};

export default WagenGiphyGrid;
