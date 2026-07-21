// app/admin/dashboard/files/add/page.tsx
import MediaManager from "@/components/admin/file/MediaManager";
import Banner from "@/components/admin/Banner";
import Content from "@/components/admin/Content";

export default function AddFilePage() {
  return (
    <Content>
      <Banner
        title="Upload File"
        description="Add a new image to your media library"
      />
      <MediaManager />
    </Content>
  );
}
