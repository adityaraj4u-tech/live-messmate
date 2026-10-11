/**
 * Owner login uses a minimal chrome-free presentation.
 * Note: Root AppShell still wraps; login page is designed to work inside it.
 */
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
