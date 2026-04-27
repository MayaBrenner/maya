import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="section container">
      <span
        aria-hidden
        className="mb-6 block select-none font-medium leading-none opacity-[0.06]"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(8rem, 20vw, 16rem)",
          color: "var(--color-ink)",
        }}
      >
        404
      </span>
      <span className="label block mb-4">Page not found</span>
      <h1 className="mb-4" style={{ fontFamily: "var(--font-display)" }}>
        This page doesn&apos;t exist.
      </h1>
      <p className="mb-8 max-w-md text-lg text-[--color-muted]">
        It may have moved, or you followed a broken link. Try heading back to the homepage.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button href="/">Go home</Button>
        <Button href="/work" variant="secondary">View my work</Button>
      </div>
    </div>
  );
}
