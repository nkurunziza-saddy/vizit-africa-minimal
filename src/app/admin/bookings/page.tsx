import Link from "next/link";
import { sampleBookings } from "@/lib/dummy-data";
import {
  RiCheckboxCircleLine,
  RiArrowRightLine,
  RiCalendarLine,
  RiUserLine,
} from "@remixicon/react";

export default function BookingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-10 py-8">
      {/* header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Confirmed Bookings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and fulfill confirmed travel bookings
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
          >
            <div className="p-5 border-b border-border bg-linear-to-r from-primary/5 to-transparent">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">
                  #{booking.id.toUpperCase()}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 px-2 py-1 rounded">
                  Paid
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mt-2">
                Gorilla Trekking Adventure
              </h3>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <RiUserLine className="size-4 text-muted-foreground" />
                <span className="text-foreground">
                  Sarah Johnson • 2 travelers
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RiCalendarLine className="size-4 text-muted-foreground" />
                <span className="text-foreground">Mar 15 - Mar 22, 2025</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {booking.selectedFlight && (
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">
                    Flight
                  </span>
                )}
                {booking.selectedHotel && (
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">
                    Hotel
                  </span>
                )}
                {booking.selectedCar && (
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">
                    Car
                  </span>
                )}
                {booking.selectedGuide && (
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">
                    Guide
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-border bg-muted/30">
              <Link
                href={`/admin/bookings/${booking.id}/fulfill`}
                className="flex items-center justify-between text-sm font-medium text-primary hover:underline"
              >
                <span className="flex items-center gap-2">
                  <RiCheckboxCircleLine className="size-4" />
                  Manage Fulfillment
                </span>
                <RiArrowRightLine className="size-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {sampleBookings.length === 0 && (
        <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed border-border">
          <RiCheckboxCircleLine className="size-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-foreground mb-2">
            No confirmed bookings yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Bookings will appear here once customers complete payment.
          </p>
        </div>
      )}
    </div>
  );
}
