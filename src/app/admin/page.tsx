import Link from "next/link";
import { sampleRequests } from "@/lib/dummy-data";
import { Navbar } from "@/components/shared";
import {
  RiFileListLine,
  RiDashboardLine,
  RiSettings3Line,
  RiAddLine,
  RiTimeLine,
  RiCheckLine,
  RiMailLine,
} from "@remixicon/react";

const stats = [
  {
    label: "Pending Requests",
    value: 12,
    icon: RiTimeLine,
    color: "text-accent-warm",
  },
  { label: "Quoted", value: 8, icon: RiMailLine, color: "text-primary" },
  {
    label: "Confirmed",
    value: 24,
    icon: RiCheckLine,
    color: "text-accent-success",
  },
];

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-muted/30 pt-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-8">
          {/* header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage travel requests and packages
              </p>
            </div>
          </div>

          {/* stats */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card border border-border rounded-lg p-5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`size-12 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon className="size-6" />
                  </div>
                  <div>
                    <p className="font-mono text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* nav tabs */}
          <div className="flex items-center gap-2 mb-6">
            <Link
              href="/admin"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
            >
              <RiDashboardLine className="size-4" />
              Overview
            </Link>
            <Link
              href="/admin/requests"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted text-sm font-medium transition-colors"
            >
              <RiFileListLine className="size-4" />
              Requests
            </Link>
          </div>

          {/* recent requests */}
          <div className="bg-card border border-border rounded-lg">
            <div className="p-5 border-b border-border">
              <h2 className="font-semibold text-foreground">Recent Requests</h2>
            </div>
            <div className="divide-y divide-border">
              {sampleRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-5 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-primary-subtle flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {request.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {request.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {request.travelers} travelers • {request.arrivalDate} to{" "}
                        {request.departureDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        request.status === "pending"
                          ? "bg-accent-warm/20 text-accent-warm"
                          : request.status === "quoted"
                            ? "bg-primary/20 text-primary"
                            : "bg-accent-success/20 text-accent-success"
                      }`}
                    >
                      {request.status}
                    </span>
                    <Link
                      href={`/admin/packages/${request.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {request.status === "pending"
                        ? "Create Package"
                        : "View Package"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
