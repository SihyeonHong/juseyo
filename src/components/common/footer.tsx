export default function Footer() {
  return (
    <footer className="border-border w-full border-t py-4">
      <div className="mx-auto flex w-full justify-end px-4 sm:px-6 md:px-8">
        <p className="text-muted-foreground/80 text-xs">
          &copy; {new Date().getFullYear()} 주세요. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
