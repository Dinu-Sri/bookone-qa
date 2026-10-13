import type { ReactNode } from 'react';
export function BookOneShell({ children }: { children: ReactNode }) { return <main>{children}</main>; }
export function Card({ children, ...props }: any) { return <section {...props}>{children}</section>; }
export function Badge({ children }: { children: ReactNode }) { return <span>{children}</span>; }
export default function Link({ children, href, ...props }: any) { return <a href={href} {...props}>{children}</a>; }
const Icon = () => <i />;
export const BookOpenCheck = Icon, Landmark = Icon, LineChart = Icon, ReceiptText = Icon, Scale = Icon;
