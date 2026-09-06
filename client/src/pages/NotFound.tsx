// Machined Editorial fallback: an intentional dead-end with a clear route back to the portfolio.
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <section className="not-found">
      <div>
        <p className="eyebrow">404 / uncalibrated route</p>
        <h1>That signal is not on the map.</h1>
        <p>The page you’re looking for moved, or it was never part of this system.</p>
        <Link href="/" className="button button-dark" data-magnetic data-cursor-label="Return home">Return home <ArrowUpRight size={16} /></Link>
      </div>
    </section>
  );
}
