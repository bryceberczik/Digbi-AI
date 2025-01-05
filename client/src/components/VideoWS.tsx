import { useState, useEffect } from "react";

const videoWebSocket = (url: string) => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      const { video_url } = JSON.parse(event.data);
      setVideoUrl(video_url);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return videoUrl;
};

export default videoWebSocket;
