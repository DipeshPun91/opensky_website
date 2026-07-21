// app/admin/dashboard/members/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { getMemberById } from "@/lib/members";
import MemberForm from "@/components/admin/member/MemberForm";
import Banner from "@/components/admin/Banner";
import Content from "@/components/admin/Content";

interface EditMemberPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMemberPage({ params }: EditMemberPageProps) {
  const { id } = await params;

  let member;
  try {
    member = await getMemberById(id);
  } catch {
    notFound();
  }

  if (!member) notFound();

  return (
    <Content>
      <Banner title="Edit Member" description={`Editing ${member.name}`} />

      <MemberForm member={member} />
    </Content>
  );
}
