
'use client';

export default function StoreLayout({children}: {children: React.ReactNode}) {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-12">{children}</main>
    </div>
  );
}
