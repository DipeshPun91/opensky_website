// app/admin/dashboard/files/page.tsx
import {
  FiPlus,
  FiFolder,
  FiClock,
  FiHardDrive,
  FiImage,
} from "react-icons/fi";
import { getAllMedia } from "@/lib/media";
import MediaGrid from "@/components/admin/file/MediaGrid";
import Banner from "@/components/admin/Banner";
import StatsBar from "@/components/admin/StatsBar";
import Content from "@/components/admin/Content";
import { getTotalSize, getLastUpload, countFolders } from "@/lib/utils";

export default async function ManageFilesPage() {
  const media = await getAllMedia();

  const stats = [
    {
      label: "Files",
      value: media.length,
      icon: <FiImage className="h-3.5 w-3.5" />,
    },
    {
      label: "Size",
      value: getTotalSize(media),
      icon: <FiHardDrive className="h-3.5 w-3.5" />,
    },
    {
      label: "Folders",
      value: countFolders(media),
      icon: <FiFolder className="h-3.5 w-3.5" />,
    },
    {
      label: "Last Upload",
      value: getLastUpload(media),
      icon: <FiClock className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <Content>
      <Banner
        title="Media Library"
        description={`${media.length} files in your library`}
        action={{
          label: "Upload",
          href: "/admin/dashboard/files/add",
          icon: <FiPlus className="h-4 w-4" />,
        }}
      />

      <StatsBar stats={stats} />

      <MediaGrid initialMedia={media} />
    </Content>
  );
}
