// app/admin/dashboard/members/new/page.tsx
import MemberForm from "@/components/admin/member/MemberForm";
import Banner from "@/components/admin/Banner";
import Content from "@/components/admin/Content";

export default function NewMemberPage() {
  return (
    <Content>
      <Banner
        title="Add Member"
        description="Add a new team member to your About page."
      />

      <MemberForm />
    </Content>
  );
}
