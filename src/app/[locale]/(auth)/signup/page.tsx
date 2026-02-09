"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Link, useRouter } from "@/i18n/navigation";
import {
  RiArrowRightLine,
  RiLockPasswordLine,
  RiMailLine,
  RiUserLine,
} from "@remixicon/react";
import { useTranslations } from "next-intl";

export default function SignupPage() {
  const router = useRouter();
  const t = useTranslations("Auth.signup");
  const tCommon = useTranslations("Common");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/profile");
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <Link href="/" className="inline-block mb-4">
          <span className="font-display text-2xl font-bold text-primary">
            {tCommon("brandName")}
          </span>
        </Link>
        <h1 className="font-display text-4xl font-black uppercase text-foreground mb-2">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-lg font-light">
          {t("subtitle")}
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">{t("fullName")}</Label>
          <InputGroup>
            <InputGroupInput id="name" type="text" placeholder="John Doe" />
            <InputGroupAddon>
              <RiUserLine />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <InputGroup>
            <InputGroupInput
              id="email"
              type="email"
              placeholder="name@example.com"
            />
            <InputGroupAddon>
              <RiMailLine />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">{t("passwordLabel")}</Label>
          <InputGroup>
            <InputGroupInput
              id="password"
              type="password"
              placeholder={tCommon("createAccount").split(" ")[0] + "..."}
            />
            <InputGroupAddon>
              <RiLockPasswordLine />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
          <InputGroup>
            <InputGroupInput
              id="confirm-password"
              type="password"
              placeholder={t("confirmPassword")}
            />
            <InputGroupAddon>
              <RiLockPasswordLine />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-14 rounded-sm gap-2 text-base font-bold uppercase tracking-wide"
          >
            {tCommon("createAccount")}
            <RiArrowRightLine className="size-5" />
          </Button>
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-8 font-light">
        {t("haveAccount")}{" "}
        <Link
          href="/login"
          className="text-foreground font-medium underline underline-offset-4 hover:text-primary transition-colors"
        >
          {t("signIn")}
        </Link>
      </p>
    </div>
  );
}
