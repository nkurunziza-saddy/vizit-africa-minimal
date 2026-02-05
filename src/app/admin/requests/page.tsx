import Link from "next/link";
import { sampleRequests } from "@/lib/dummy-data";
import {
  RiFileListLine,
  RiDashboardLine,
  RiFilterLine,
  RiSearchLine,
} from "@remixicon/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RequestsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-10 py-8">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Travel Requests
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage incoming travel requests
          </p>
        </div>
      </div>

      {/* nav tabs */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/admin"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:bg-muted text-sm font-medium transition-colors"
        >
          <RiDashboardLine className="size-4" />
          Overview
        </Link>
        <Link
          href="/admin/requests"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
        >
          <RiFileListLine className="size-4" />
          Requests
        </Link>
      </div>

      {/* filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search by name or email..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <RiFilterLine className="size-4" />
          Filter
        </Button>
      </div>

      {/* requests table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Customer
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Travel Dates
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Services
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                  Created
                </th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sampleRequests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {request.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {request.email}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-foreground">
                      {request.arrivalDate}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      to {request.departureDate}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {request.needsFlights && (
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">
                          Flights
                        </span>
                      )}
                      {request.needsHotel && (
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">
                          Hotels
                        </span>
                      )}
                      {request.needsCar && (
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">
                          Car
                        </span>
                      )}
                      {request.needsGuide && (
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">
                          Guide
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
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
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-muted-foreground">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/packages/${request.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {request.status === "pending" ? "Create Package" : "View"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
