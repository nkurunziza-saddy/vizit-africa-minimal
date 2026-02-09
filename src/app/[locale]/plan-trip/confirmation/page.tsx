"use client";

import { Navbar } from "@/components/shared";
import { Footer } from "@/components/landing";
import { Button } from "@/components/ui/button";
import { RiCheckboxCircleFill, RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useTranslations } from "next-intl";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id") || "REQ-UNKNOWN";
  const t = useTranslations("PlanTrip.confirmation");

  return (
    <div className="bg-white border border-border rounded-xl overflow-hidden text-center max-w-2xl mx-auto">
      <div className="p-8 border-b border-border bg-accent-success/5">
        <div className="mx-auto w-20 h-20 rounded-full bg-accent-success/20 flex items-center justify-center mb-6">
          <RiCheckboxCircleFill className="size-12 text-accent-success" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="p-8 space-y-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">
            {t("referenceNumber")}
          </p>
          <p className="font-mono text-xl font-bold tracking-wider">
            {requestId}
          </p>
        </div>

        <div className="text-left space-y-4">
          <h3 className="font-semibold text-lg">{t("whatNext")}</h3>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="shrink-0 size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                1
              </span>
              <div>
                <p className="font-medium text-foreground">
                  {t("steps.1.title")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("steps.1.description")}
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="shrink-0 size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                2
              </span>
              <div>
                <p className="font-medium text-foreground">
                  {t("steps.2.title")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("steps.2.description")}
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link href="/profile" className="flex-1">
            <Button className="w-full" size="lg">
              {t("dashboardButton")} <RiArrowRightLine />
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              {t("homeButton")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="pt-24 pb-20 px-5">
        <Suspense fallback={<div>Loading...</div>}>
          <ConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
