"use client";

import { cn } from "@/lib/utils";
import DotPattern from "./magicui/dot-pattern";
import { PieChartComponent } from "./PieChart";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export function DashboardPage() {
  return (
    <>
      <div className="">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <PieChartComponent />
    </>
  );
}
