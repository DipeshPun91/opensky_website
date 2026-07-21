// app/admin/dashboard/members/page.tsx
import { FiPlus, FiUsers, FiUserCheck, FiClock } from "react-icons/fi";
import { getAllMembers } from "@/lib/members";
import MembersTable from "@/components/admin/member/MembersTable";
import Banner from "@/components/admin/Banner";
import StatsBar from "@/components/admin/StatsBar";
import Content from "@/components/admin/Content";
import { getLastUpdated } from "@/lib/utils";

export default async function MembersPage() {
  const members = await getAllMembers();

  const activeMembers = members.length;
  const inactiveMembers = 0;

  const stats = [
    {
      label: "Total Members",
      value: members.length,
      icon: <FiUsers className="h-4 w-4" />,
      accentColor: "sky" as const,
    },
    {
      label: "Active",
      value: activeMembers,
      icon: <FiUserCheck className="h-4 w-4" />,
      accentColor: "emerald" as const,
    },
    {
      label: "Inactive",
      value: inactiveMembers,
      icon: <FiClock className="h-4 w-4" />,
      accentColor: "amber" as const,
    },
    {
      label: "Last Updated",
      value: getLastUpdated(members),
      icon: <FiClock className="h-4 w-4" />,
      accentColor: "purple" as const,
    },
  ];

  return (
    <Content>
      <Banner
        title="Team Members"
        description="Manage who appears on your About page, and in what order."
        action={{
          label: "Add Member",
          href: "/admin/dashboard/members/new",
          icon: <FiPlus className="h-4 w-4" />,
        }}
      />

      <StatsBar stats={stats} className="mb-8" />

      <MembersTable initialMembers={members} />
    </Content>
  );
}
