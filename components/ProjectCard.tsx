import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/lib/projects";
import { RedactedPreview } from "./RedactedPreview";
import { cn } from "./ui";

export function ProjectVisual({ project, priority, sizes }: { project: Project; priority?: boolean; sizes?: string }) {
  if (project.image) {
    return (
      <div className="overflow-hidden rounded-2xl border border-line-strong/70 bg-navy-950 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)]">
        <Image
          src={project.image}
          alt={`${project.name} website, home page`}
          width={1440}
          height={900}
          sizes={sizes ?? "(min-width: 1024px) 40vw, 92vw"}
          priority={priority}
          className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.025]"
        />
      </div>
    );
  }
  if (project.preview) return <RedactedPreview kind={project.preview} />;
  return null;
}

export function ProjectCard({ project, className, delay = 0 }: { project: Project; className?: string; delay?: number }) {
  return (
    <article
      data-reveal
      style={{ ["--d" as string]: `${delay}ms` }}
      className={cn("group relative flex flex-col gap-5", className)}
    >
      <ProjectVisual project={project} />
      <div className="flex items-start justify-between gap-4 px-1">
        <div>
          <p className="text-sm text-muted">
            {project.kind}
            <span className="mx-2 text-faint">/</span>
            {project.client}
          </p>
          <h3 className="mt-1.5 text-xl leading-snug">
            <Link href={`/portfolio/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {project.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-ink-2">{project.tagline}</p>
        </div>
        <ArrowUpRight
          size={22}
          aria-hidden
          className="mt-1 shrink-0 text-faint transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan"
        />
      </div>
    </article>
  );
}
