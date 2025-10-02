import dynamic from "next/dynamic";
const PersonalSite = dynamic(() => import("../components/PersonalSite"), { ssr: false });
export default function Page() { return <PersonalSite />; }
