import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FKI Rabbani Universitas Andalas",
    short_name: "FKI Rabbani",
    description: "Website resmi Forum Kajian Islam Rabbani Universitas Andalas",
    start_url: "/",
    display: "standalone",
    background_color: "#021d17",
    theme_color: "#065f46",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}