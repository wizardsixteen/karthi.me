// import {} from "@karthi" // @karthi will be the workspace name.
"use client";

import {
  AppShell,
  AboutSection,
  ServicesSection,
  BrandsSection,
  ExperienceSection,
  WorkSection,
  AwardsSection,
  EducationSection,
  SkillsSection,
  ContactSection,
} from "@karthi/ui";
import { useSmoothScroll, useScrollFlow } from "@karthi/hooks";

export default function HomePage() {
  useSmoothScroll();
  useScrollFlow();

  return (
    <AppShell>
      <AboutSection />
      <ServicesSection />
      <BrandsSection />
      <ExperienceSection />
      <WorkSection />
      <AwardsSection />
      <EducationSection />
      <SkillsSection />
      <ContactSection />
    </AppShell>
  );
}
