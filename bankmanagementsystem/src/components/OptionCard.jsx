import { Link } from "react-router-dom";

export default function OptionCard({ to, title, description }) {
  return (
    <Link to={to} className="card block hover:border-emerald transition-colors">
      <h3 className="text-emerald-light font-semibold text-lg mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </Link>
  );
}