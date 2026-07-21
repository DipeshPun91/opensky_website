// app/admin/dashboard/gallery/page.tsx
import { FiImage, FiClock, FiEye, FiEyeOff } from "react-icons/fi";
import { getAllGalleryItems } from "@/lib/gallery";
import GalleryManager from "@/components/admin/gallery/GalleryManager";
import Banner from "@/components/admin/Banner";
import StatsBar from "@/components/admin/StatsBar";
import Content from "@/components/admin/Content";
import { getLastUpdated } from "@/lib/utils";

export default async function GalleryPage() {
  const items = await getAllGalleryItems();

  const visible = items.length;
  const hidden = 0;

  const stats = [
    {
      label: "Total Items",
      value: items.length,
      icon: <FiImage className="h-3.5 w-3.5" />,
    },
    {
      label: "Visible",
      value: visible,
      icon: <FiEye className="h-3.5 w-3.5" />,
    },
    {
      label: "Hidden",
      value: hidden,
      icon: <FiEyeOff className="h-3.5 w-3.5" />,
    },
    {
      label: "Last Updated",
      value: getLastUpdated(items),
      icon: <FiClock className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <Content>
      <Banner
        title="Gallery"
        description="Curate the images shown on your public Gallery page, and control the order they appear in."
      />
      <StatsBar stats={stats} />
      <GalleryManager initialItems={items} />
    </Content>
  );
}
