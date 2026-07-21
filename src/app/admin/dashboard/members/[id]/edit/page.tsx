import { notFound } from "next/navigation";
import { getMemberById } from "@/lib/members";
import MemberForm from "@/components/admin/member/MemberForm";

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
    <div className="max-w-2xl">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-500">
        Admin Panel
      </p>
      <h1 className="mb-1 text-2xl font-black uppercase text-white sm:text-3xl">
        Edit Member
      </h1>
      <p className="mb-8 text-sm text-gray-400">{member.name}</p>

      <MemberForm member={member} />
    </div>
  );
}
