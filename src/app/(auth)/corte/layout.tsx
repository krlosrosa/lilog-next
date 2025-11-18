import CorteProvider from "@/_modules/corte-produto/context/corte.provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CorteProvider>
      {children}
    </CorteProvider>
  )
} 