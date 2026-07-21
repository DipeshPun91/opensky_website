import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { getAllMembers } from "@/lib/members";
import MembersTable from "@/components/admin/member/MembersTable";

export default async function MembersPage() {
  const members = await getAllMembers();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-500">
            Admin Panel
          </p>
          <h1 className="mb-1 text-2xl font-black uppercase text-white sm:text-3xl">
            Team Members
          </h1>
          <p className="text-sm text-gray-400">
            Manage who appears on your About page, and in what order.
          </p>
        </div>

        <Link
          href="/admin/dashboard/members/new"
          className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-sky-600"
        >
          <FiPlus className="h-4 w-4" />
          Add Member
        </Link>
      </div>

      <MembersTable initialMembers={members} />
    </div>
  );
}
