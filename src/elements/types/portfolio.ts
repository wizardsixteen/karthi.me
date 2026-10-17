// import {} from "@karthi" // @karthi will be the workspace name.
export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  svg: {
    viewBox: string;
    elements: Array<{
      type: "rect" | "circle" | "path";
      props: Record<string, string | number>;
    }>;
  };
}

export interface TimelineItem {
  role: string;
  date: string;
  description: string;
}

export interface WorkItem {
  title: string;
  meta: string;
  description: string;
  href?: string;
}

export interface AwardItem {
  title: string;
  date: string;
  description: string;
}

export interface EducationItem {
  title: string;
  institutionOrDate: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
