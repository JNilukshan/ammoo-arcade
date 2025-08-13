import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-bold font-headline text-lg tracking-wider">AMMOO.ARCADE</h3>
          </div>
          <div className="text-sm">
            <h4 className="font-bold mb-4">HELP</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Customer Support</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Delivery Details</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div className="text-sm">
            <h4 className="font-bold mb-4">ACCOUNT</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Orders</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Payments</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 amoo.arcade. All right reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
