import MemberForm from "@/components/admin/member/MemberForm";

export default function NewMemberPage() {
  return (
    <div className="max-w-2xl">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-500">
        Admin Panel
      </p>
      <h1 className="mb-1 text-2xl font-black uppercase text-white sm:text-3xl">
        Add Member
      </h1>
      <p className="mb-8 text-sm text-gray-400">
        Add a new team member to your About page.
      </p>

      <MemberForm />
    </div>
  );
}
